
module.exports = function(config){
  var mongoose = require('mongoose'),
      Schema = mongoose.Schema, 
      ObjectId = Schema.ObjectId,
      bcrypt = require("bcrypt-nodejs"),
      SALT_WORK_FACTOR = 10;

  var UserSchema = new Schema({
    "name": { type: String, required: false},
    "email": { type: String, required: false},
    "isAdmin":  { type: Boolean, default: false},
    "hashtags": [{tag: String, productId: Number}],
    "jobsSaved":[Number], //product ids
    "accessToken": { type: String }, // Used for Remember Me
    metadata:{
      active: { type: Boolean, default: true },
      insertDate: { type: Date, default: Date.now },
      updateDate: { type: Date, default: Date.now }
    }
  });


  // Remember Me implementation helper method
  UserSchema.statics.generateRandomToken = function () {
    var user = this,
        chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        token = new Date().getTime() + '_';
    for ( var x = 0; x < 16; x++ ) {
      var i = Math.floor( Math.random() * 62 );
      token += chars.charAt( i );
    }
    return token;
  };




  var OauthIdentitySchema = new Schema({  
    "userId": Schema.Types.ObjectId,
    "profileId": { type: String, required: true},
    "provider": { type: String, required: true},
    "email": { type: String, required: false},
    "name": { type: String, required: false},
    "picture": { type: String, required: false},
    "summary": { type: String, required: false},
    "interests": { type: String, required: false},
    "industry": { type: String, required: false},
    "skills": [],
    metadata:{
      active: { type: Boolean, default: true },
      insertDate: { type: Date, default: Date.now },
      updateDate: { type: Date, default: Date.now }
    }
  });


  var LocalIdentitySchema = new Schema({
    "userId": Schema.Types.ObjectId,
    "email": { type: String, required: true},       // Used as username. If this is already set in UserModel from an oauth provider, use
    "password": { type: String, required: true},    // that when saving a password in the profile after logging in with an oauth provider
    metadata:{
      active:  { type: Boolean, default: true },
      insertDate: { type: Date, default: Date.now },
      updateDate: { type: Date, default: Date.now }
    }
  });


  // Bcrypt middleware
  LocalIdentitySchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, function(){
        // Do nothing;
      }, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  });



  var ContactSchema = new Schema({
    "name": { type: String, required: false},
    "email": { type: String, required: true},
    "description": { type: String, required: true},
    metadata:{
      insertDate: { type: Date, default: Date.now }
    }
  });

  // Password verification
  LocalIdentitySchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if(err) return cb(err);
      cb(null, isMatch);
    });
  };





  var GeoLocationSchema = new Schema({
    zip: String,
    state: String,
    city: String,
    county: String,
    loc: {type: [Number], index: '2d'}
  });
  
  // Database connect
  var uristring = config.uri;
  var mongoOptions = config.options;

  var connection = mongoose.connect(uristring, mongoOptions, function (err, res) {
    if (err) { 
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log ('Successfully connected to: ' + uristring);
    }
  });

  // Export user model
  module.exports.User = connection.model('User', UserSchema);
  module.exports.LocalIdentity = connection.model('LocalIdentity', LocalIdentitySchema);
  module.exports.OauthIdentity = connection.model('OauthIdentity', OauthIdentitySchema);
  module.exports.GeoLocation = connection.model('GeoLocation', GeoLocationSchema);
  module.exports.Contact = connection.model('Contact', ContactSchema);
}