module.exports = function(serverContext){		
    var validator = require('validator');
  	var passportUtils = serverContext.auth.passportUtils;
  	var expressApp = serverContext.expressApp;
  	var mandrill = require('mandrill-api/mandrill');
  	var mailer   = require("mailer");

    expressApp.get('/', function(req, res){        
		res.render('site/index', { 
			title: serverContext.appName, 
			appLogo: serverContext.appLogo, 
			appName:serverContext.appName 
		});
	});

    expressApp.get('/about', function(req, res){   
		res.render('site/about', { 
			title: serverContext.appName, 
			appLogo: serverContext.appLogo, 
			appName:serverContext.appName 
		});
	});	

    expressApp.get('/contact', function(req, res){   
		res.render('site/contact', { 
			user: req.user,
			title: serverContext.appName, 
			appLogo: serverContext.appLogo, 
			appName:serverContext.appName 
		});
	});	

    // Form post
    expressApp.post('/contact', function(req, res){
    	var body = req.body;
		var errors = _validateContactData(body);
		var locals = {};
		var name = "";
		var email = "";
		var message = "";
		var notice = "";
		var error = "";

		if(req.user){
			name = req.user.name;
			if(req.user.email){
				email = req.user.email;
			}
		}

		if(errors.length === 0){
			if(!name && !email){
				name = req.body.name;
				email = req.body.email;
			}

			var message = req.body.message;
			_sendEmail(name, email, message, function(e, results){
				var notice = "";
				if(e){
				   	notice = e.name + ' - ' + e.message;
		      	} else {
		        	notice = 'Your message has been sent.';
		      	}

				_renderPostContactBack(res, req.user, email, name, message, notice, errors);
	      	});
		}else{
		    notice = 'Please correct tthe following errors:';
		    errors = errors;
	        email = email;
	        name = name;
	        message = message;
			_renderPostContactBack(res, req.user, email, name, message, notice, errors);
		}
	});	

    expressApp.get('/credits', function(req, res){   
		res.render('site/credits', { 
			title: serverContext.appName, 
			appLogo: serverContext.appLogo, 
			appName:serverContext.appName 
		});
	});	





    // Privates
    function _renderPostContactBack(res, user, email, name, message, notice, errors){
		res.render('site/contact', { 
			user: user, 
			email: email,
			name: name,
			message: message,
			notice: notice,
			errors: errors,
			title: serverContext.appName, 
			appLogo: serverContext.appLogo, 
			appName:serverContext.appName 
		});
    }

    function _sendEmail(name, fromEmail, message, cb){		
		var username = "jschell12@gmail.com"
		  , password = "lzdIJ960VHc566hgu4TBWw";

		mailer.send(
		  { host:           "smtp.mandrillapp.com"
		  , port:           587
		  , to:             username
		  , from:           fromEmail
		  , subject:        name + "has something to say..."
		  , body:           message + "\n" + fromEmail
		  , authentication: "login"
		  , username:       username
		  , password:       password
		  }, function(err, result){
		  	console.log(err, result);
		    cb(err, result);
		  }
		);
    }


    function _saveContactMessage(email, name, message, cb){
		var newContact = new mongodb.Contact({
			email : email,
			name : name,
			message: message
		}).save(function(err, newContact){
			if(cb){
				cb(err, newContact);
			}else{
				if(err) throw err;
			}
		});
    }

	function _validateContactData(body) {
	  var errors = [];

	  if(!validator.isLength(body.name, 1, 100)){
	  	errors.push('Please enter your name');
	  }
	  if(!validator.isEmail(body.email)){
	  	errors.push('Please enter a valid email address');
	  }
	  if(!body.message){
	  	errors.push('Please enter a message');
	  }
	  return errors;
	}

	function _csrf(req, res, next) {
	  res.locals.token = req.session._csrf;
	  next();
	}
};

