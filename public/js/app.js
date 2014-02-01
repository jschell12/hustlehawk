var app = app || {};

(function(app, $, kendo, undefined){

	//var socket = io.connect('http://localhost:4321/');
	
	/* Setup
	*******************************************/
	app.Transport = new app.Utils.Transport();	
	//app.WebSocketTransport = new app.Utils.WebSocketTransport(socket);	
	app.PubSub = new kendo.Observable();	
	var tmplLoader = new app.Utils.TemplateLoader(app.Transport);	
	var common = app.Utils.Common;
	
	/* Load templates
	*******************************************/
	tmplLoader.load([
		"/tmpl/user-tmpl.html",
		"/tmpl/job-tmpl.html",
		"/tmpl/layout-tmpl.html"
		], function(){
			app.PubSub.trigger("loaded:templates");
		});

	/* setup views
	*******************************************/

	// Obtaining user location from 'http://j.maxmind.com/app/geoip.js'
	app.NavViewModel = new kendo.observable({
		
	});

	app.NavLayout = new kendo.Layout("nav-layout-tmpl", { 
		wrap: false,
		model: app.NavViewModel
	});

	app.AppLayout = new kendo.Layout("app-layout-tmpl", { 
		wrap: false
	});


	// Job Feeds
	app.IndeedDataSource = new kendo.data.DataSource({
		transport: {
			read: function(options){
				var params = options.data;
				app.Transport.get({url:"/api/jobs/indeed", params:params}, function(data){
					options.success(data);
				});
			}
		}
	});

	app.CareerBuilderDataSource = new kendo.data.DataSource({
		transport: {
			read: function(options){
				var params = options.data;
				app.Transport.get({url:"/api/jobs/careerbuilder", params:params}, function(data){
					options.success(data);
				});
			}
		}
	});

	app.CareerJetDataSource = new kendo.data.DataSource({
		transport: {
			read: function(options){
				var params = options.data;
				app.Transport.get({url:"/api/jobs/careerjet", params:params}, function(data){
					options.success(data);
				});
			}
		}
	});

	app.LinkUpDataSource = new kendo.data.DataSource({
		transport: {
			read: function(options){
				var params = options.data;
				app.Transport.get({url:"/api/jobs/linkup", params:params}, function(data){
					options.success(data);
				});
			}
		}
	});

	app.SimplyHiredDataSource = new kendo.data.DataSource({
		transport: {
			read: function(options){
				var params = options.data;
				app.Transport.get({url:"/api/jobs/simplyhired", params:params}, function(data){
					options.success(data);
				});
			}
		}
	});

	app.IndeedDataSource.bind("change", function(){
		_updateJobs(this.view());
	});

	app.CareerBuilderDataSource.bind("change", function(){
		_updateJobs(this.view());
	});

	app.CareerJetDataSource.bind("change", function(){
		_updateJobs(this.view());
	});

	app.LinkUpDataSource.bind("change", function(){
		_updateJobs(this.view());
	});

	app.SimplyHiredDataSource.bind("change", function(){
		_updateJobs(this.view());
	});


	app.JobFeedViewModel = new kendo.observable({
		jobs:[],
		keywords: "",
		location: "",
		userIsLoggedIn: function(){
			return app.UserViewModel.isLoggedIn();
		},
		reloadLinkedinBasedResults: function(){
			this.set("keywords", "");
			this.search();
		},
		search: function(e){
			var jfvm = app.JobFeedViewModel;
			jfvm.set("jobs", []);	
			var keywords = this.get("keywords");
			var location = this.get("location");

			if(location){
				app.IndeedDataSource.read({ keywords: keywords, location:location});
				app.SimplyHiredDataSource.read({ keywords: keywords, location:location});
				app.CareerJetDataSource.read({ keywords: keywords, location:location});
				app.CareerBuilderDataSource.read({ keywords: keywords, location:location});
				app.LinkUpDataSource.read({ keywords: keywords, location:location});
			}			
		}
	});


	app.JobFeedView = new kendo.View("job-list-tmpl", {
		model: app.JobFeedViewModel,
		init: function(){
			var listView = $(this.element).find("ul").data("kendoListView");
		}
	});


	// Router
	app.Router = new kendo.Router({
		init: function() {
			app.NavLayout.render("#app-nav");
			app.AppLayout.render("#app");
		},
		routeMissing: function(e) { 
			console.log("routeMissing", e.url);
		} 
	});

	// Routes
	app.Router.route("/", function(){			
		app.AppLayout.showIn("#view", app.JobFeedView);

		var location = _getCurrentLocation();
		app.JobFeedViewModel.set("location", location);
		app.JobFeedViewModel.search();
	});

	app.Router.route("/profile", function(){
		var uvm = app.UserViewModel;
		if(uvm.isLoggedIn()){
			app.AppLayout.showIn("#view", app.UserProfileView);
		}else{
			app.Router.navigate("/");
		}
	});

	app.Router.route("/contact", function(){
		app.AppLayout.showIn("#view", app.ContactView);
	});


	// Auth

	app.UserModel = new kendo.data.Model.define({
    	id: "id", // the identifier of the model
  		fields: {
	        "id": {
	            type: "string",
	        	editable: false
	        },
	        "displayName": {
	            type: "string",
	        	editable: true
	        },
	        "industry": {
	            type: "string",
	        	editable: true
	        },
	        "interests": {
	            type: "string",
	        	editable: true
	        },
	        "summary": {
	            type: "string",
	        	editable: true
	        }
	    }
	});

	app.UserSkillModel = new kendo.data.Model.define({
    	id: "id", // the identifier of the model
  		fields: {
	        "id": {
	            type: "number",
	        	editable: false
	        },
	        "name": {
	            type: "string",
	        	editable: true
	        },
	        "toggled": {
	            type: "boolean",
	        	editable: true
	        },
	    }
	});

	app.UserData = new kendo.data.DataSource({
  		schema: {
			model: app.UserModel
		},
		transport: {
			read: function(options){
				var params = options.data;
				app.Transport.get({url:"/api/me", params:params}, function(data){
					if(!data.error){
						options.success(data.user);
					}else{
						options.success({});
					}	
				});
			},
			update: function(options){
				var params = options.data;
				app.Transport.put({url:"/api/me", params:params}, function(data){
					if(!data.error){
						options.success(data.user);
					}else{
						options.success({});
					}	
				});
			}
		}
	});


	app.UserSkillsData = new kendo.data.DataSource({
		batch: true,
  		schema: {
			model: app.UserSkillModel
		},
		transport: {
			read: function(options){
				var params = options.data;
				app.Transport.get({url:"/api/me/skills", params:params}, function(data){
					if(!data.error){
						options.success(data.user);
					}else{
						options.success({});
					}	
				});
			},
			update: function(options){
				var params = options.data;
				app.Transport.put({url:"/api/me/skills", params:params}, function(data){
					if(!data.error){
						options.success(data.user);
					}else{
						options.success({});
					}	
				});
			}
		}
	});


	app.UserViewModel = new kendo.observable({
		user: null,
		authenticateWithLinkedIn: function(){
			// var linkedinOauthWindow = new app.Utils.OauthWindow("/auth/linkedin", 500);	
			// linkedinOauthWindow.open();

			window.location.href = "/auth/linkedin/";
		},
		isLoggedIn: function(){
			var user = this.get("user");
			if(user && user !== undefined){
				return true;
			}
			return false;
		},
		save: function(){
			app.UserSkillsData.sync();
		}
	});

	app.UserLoggedOutMenuView = new kendo.View("user-loggedout-dropdown-tmpl", {
		model:app.UserViewModel,
		init: function(){
		},
		show: function(){
		}
	});

	app.UserLoggedInMenuView = new kendo.View("user-loggedin-dropdown-tmpl", {
		model:app.UserViewModel,
		init: function(){
		},
		show: function(){
		}
	});

	app.UserProfileView = new kendo.View("user-profile-tmpl", {
		model:app.UserViewModel,
		init: function(){
			var self = this;
			var $viewElement = $(self.element);
			var $btnGrid = $viewElement.find(".skills-list").kendoListView({
				dataSource: app.UserSkillsData,
				selectable: true,
				autoBind: true,
				template: kendo.template($("#skills-list-template").html()),
				change: function(e){					
			        var data = this.dataSource.view();
			        var selected = $.map(this.select(), function(item) {
			            return data[$(item).index()];
			        })[0];
		        	selected.set("toggled", !selected.toggled);
				}
			});
		},
		show: function(){
		}
	});


	// Initialize
	app.PubSub.bind("loaded:templates", function(){
		app.UserData.fetch(function(){
			var userData = this.view()[0];
			if(!userData.id){
				app.NavLayout.showIn("#user", app.UserLoggedOutMenuView);				
			}else{
				app.UserViewModel.set("user", userData);
				app.NavLayout.showIn("#user", app.UserLoggedInMenuView);				
			}
			app.Router.start();
		});
		app.UserSkillsData.fetch(function(){
		});
	});

	function _getCurrentLocation(){		
		return geoip_city() + ", " + geoip_region();
	}

	function _updateJobs(jobsReceived){		
		var jfvm = app.JobFeedViewModel;
		var jobs = jfvm.get("jobs") || [];	
		var jobsJSON = jobs.toJSON();
		for(var i = 0, len = jobsReceived.length; i < len; i++){
			var job = jobsReceived[i];
			jobsJSON.push(job);
		}

		// TODO - develop insertion sort
		// Order descending
		jobsJSON.sort(function(a, b){			
		  if (a.timestamp > b.timestamp)
		     return -1;
		  if (a.timestamp < b.timestamp)
		    return 1;
		  return 0;
		});
		
		jfvm.set("jobs", jobsJSON);
	}

	app.test = {};
	app.test._updateJobs = _updateJobs;
})(app = app || {}, jQuery, kendo);
