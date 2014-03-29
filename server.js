// Gather outside arguments if passed. Set default to 'localhost', otherwise.
// Environments
//   localhost
//   development
//   production   

// Module dependencies
var express = require('express'),
    expressApp = module.exports = express(),
    cons = require('consolidate'),
    swig = require('swig'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passport = require('passport'),
    argv = require('optimist').argv;
console.log(argv);
var appEnv =  argv.env  || "localhost";



// Include configs
console.log("APP ENVIRONMENT: ", appEnv);
var mongodbSetup = require('./config/mongo-setup')
    mongodbConfig = require('./config/mongo-config')[appEnv],
    secrets = require('./config/secrets')[appEnv],
    passportSetup = require('./config/passport-setup'),
    appConfig = require('./config/app-config')[appEnv],
    commonConfig = require('./config/common-config');

// Include routes
var siteRoute = require('./routes/site'),
    authRoute = require('./routes/auth'),
    userApiRoute = require('./routes/userApi'),
    jobApiRoute = require('./routes/jobApi'),
    geoApiRoute = require('./routes/geoApi');

// Initialize other        
var indeed = require("./components/indeedapi")(secrets.indeed);
var careerBuilder = require("./components/careerbuilderapi")(secrets.careerbuilder); 
var careerJet = require("./components/careerjetapi");    
var linkUp = require("./components/linkupapi")(secrets.linkup);
var simplyHired = require("./components/simplyhiredapi");    




// Configure Express
expressApp.configure(function(){
    "use strict";
    expressApp.use(express.compress());
    expressApp.engine('.html', cons.swig);
    swig.init({
        root: __dirname +  '/views',
        cache: false,
        allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
    });
    expressApp.set('view engine', '.html');
    expressApp.set('view options', { pretty: true })
    expressApp.use(express.favicon("public/img/redHawk_scaled.jpg"));
    expressApp.use(express.logger('dev'));
    expressApp.use(express.bodyParser());
    expressApp.use(express.methodOverride());
    expressApp.use(express.cookieParser());
    expressApp.use(express.session({ secret: appConfig.sessionSecret}));
    // Remember Me middleware
    expressApp.use( function (req, res, next) {
        if ( req.method == 'POST' /* && req.url == '/login' */ ) {
          if ( req.body.rememberme ) {
            req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
          } else {
            req.session.cookie.expires = false;
          }
        }
        next();
    });
    //expressApp.use(flash());
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());
    expressApp.use(expressApp.router);
    expressApp.use(express.csrf());

    var oneDay = 86400000;
    expressApp.use(express.static(__dirname + '/public', { maxAge: oneDay }));
});


/*********************************************************************/
// Configure environment
expressApp.use(express.errorHandler({ dumpExceptions: true, showStack: true }));


/*********************************************************************/
// Setup MongoDB
mongodbSetup(mongodbConfig);

/*********************************************************************/
// Setup Passport
passportSetup(mongodbSetup, secrets.linkedin);

  
/*********************************************************************/
// Run server
var server = expressApp.listen(process.env.port || appConfig.EnvConfig.port);
console.log("Express server listening on port %d in %s mode", process.env.port || appConfig.EnvConfig.port, appEnv);



/*********************************************************************/
// Define a server context object to contain all references needed in app
// TODO: may need to break this up in future if it becomes too large

var serverContext = {
    api:{
        indeed : indeed,  
        careerBuilder : careerBuilder, 
        careerJet : careerJet,    
        linkUp : linkUp,
        simplyHired : simplyHired
    },
    auth: {
        passportUtils: passportSetup,
        passport: passport,
    },
    data: {
        mongodb: mongodbSetup
    },
    expressApp: expressApp,
    lib: {
    },
    appName: commonConfig.AppName,    
    appLogo: commonConfig.AppLogo
};

// Setup routes
siteRoute(serverContext);
authRoute(serverContext);
userApiRoute(serverContext);
jobApiRoute(serverContext);
geoApiRoute(serverContext);