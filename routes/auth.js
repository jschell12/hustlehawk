/**
 * 
 */

module.exports = function(serverContext){
  var expressApp = serverContext.expressApp;
  var mongodb = serverContext.data.mongodb;
  var passport = serverContext.auth.passport;
  var passportUtils = serverContext.auth.passportUtils;


  // GET /auth/linkedin
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in LinkedIn authentication will involve
  //   redirecting the user to linkedin.com.  After authorization, LinkedIn will
  //   redirect the user back to this application at /auth/linkedin/callback
  expressApp.get('/auth/linkedin',
    passport.authenticate('linkedin',  { scope: [
      'r_emailaddress',
      'r_fullprofile', 
      'r_contactinfo', 
      'r_network'
    ],
    state: 'SOME STATE'  }),
    function(req, res){
      // The request will be redirected to LinkedIn for authentication, so this
      // function will not be called.
  });


  // GET /auth/linkedin/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  expressApp.get('/auth/linkedin/callback', 
    passport.authenticate('linkedin', { 
     successRedirect: '/',
     failureRedirect: '/' 
    })
  );



  // Views
  expressApp.get('/profile', passportUtils.ensureAuthenticated, function(req, res){     
    res.render('auth/profile', { title: 'Profile'});
  });

  expressApp.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};