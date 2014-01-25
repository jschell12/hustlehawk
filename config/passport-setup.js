module.exports = function(mongodb, oauthConfig){
  var passport = require('passport'),
      LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
      request = require("request");

    //   Both serializer and deserializer edited for Remember Me functionality
    passport.serializeUser(function(user, done) {
      var createAccessToken = function () {
      var token = mongodb.User.generateRandomToken();

      mongodb.User.findOne( { accessToken: token }, function (err, existingUser) {

        if (err) { return done( err ); }
        if (existingUser) {
          createAccessToken(); // Run the function again - the token has to be unique!
        } else {
          user.set('accessToken', token);
          user.save( function (err, user) {
            if (err) return done(err);
            return done(null, user.get('accessToken'));
          });
        }
      });
    };

    if ( user._id) {
      createAccessToken();
    }else{
      done(null, user);
    }
  });



  passport.deserializeUser(function(token, done) {
    mongodb.User.findOne( {accessToken: token } , function (err, user) {  
      mongodb.OauthIdentity.findOne( {userId: user._id } , function (err, linkedinUser) { 
        done(err, {
          id: user._id,
          profileId: user.profileId,
          name: user.name,
          email: user.email,
          picture: linkedinUser.picture,
          industry: linkedinUser.industry,
          interests: linkedinUser.interests,
          summary: linkedinUser.summary,
          skills: linkedinUser.skills
        });
      });
    });
  });


  // Use the LinkedInStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Facebook
  //   profile), and invoke a callback with a user object.

  /*
    "id":Number,
    "provider": String,
    "profile": {},
  */
  passport.use(new LinkedInStrategy({
      clientID: oauthConfig.LINKEDIN_API_KEY,
      clientSecret: oauthConfig.LINKEDIN_SECRET_KEY,
      scope: ['r_fullprofile'],
      callbackURL: oauthConfig.LINKEDIN_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      mongodb.OauthIdentity.findOne({ "profileId" : profile.id, "provider": profile.provider}, function(err, oldOauthIdentity){
        if(oldOauthIdentity){
          var user = mongodb.User.findOne({ _id: oldOauthIdentity.userId }, function(err, user){
            if (err) { return done(err); }
            done(null, user);
          });
        }else{
          // First create the User
          var newUser = new mongodb.User({
            email : profile.emails[0].value,
            name : profile.displayName
          }).save(function(err, newUser){
            if(err) throw err;

            // Now create an OauthIdentity Record 
            var skills = _flattenSkills(profile._json.skills.values);
            var newOauthIdentity = new mongodb.OauthIdentity({
              userId: newUser._id,
              profileId: profile.id,
              provider: profile.provider,
              name: profile.displayName,
              email: profile.emails[0].value,
              picture: profile._json.pictureUrl,
              summary: profile._json.summary,
              interests: profile._json.interests,
              industry: profile._json.industry,
              skills: skills,
            }).save(function(err, newOauthIdentity){
              if(err){ 
                mongodb.User.remove({ _id: newUser._id})
                throw err;
              }
              done(null, newUser);
            });
          });
        }
      });
    }
  ));



  // Middleware methods

  var createResponse =  module.exports.createResponse = function(error,user){
    return {
      error: error,
      user: user
    }
  }


  // Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
  module.exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
  }


  // Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
  module.exports.ensureAuthenticatedJson = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.send(createResponse("You are not logged in", null))
  }



  // Check for admin middleware, this is unrelated to passport.js
  // You can delete this if you use different method to check for admins or don't need admins
  module.exports.ensureAdmin = function ensureAdmin(req, res, next) {
    return function(req, res, next) {
      if(req.user && req.user.admin === true){
          next();
      }
      else{
          res.send(403);
      }
    }
  }



  // Privates  
  function _flattenSkills(lSkills){
    lSkills = lSkills || [];
    var skills = [];
    for(var i = 0, len = lSkills.length; i < len; i++){
      skills.push({
        id: lSkills[i].id,
        name: lSkills[i].skill.name,
        toggled: false,
      });
    }

    return skills;
  }
}