/**
    Careetjet API

    LEGAL NOTES: NONE.

**/


exports.search = function(keywords, location, cb){        
    var http = require("http");	
	var xml2js = require('xml2js');
    var moment = require('moment');
    var url = require("url");
	var utils = require("./utility");
	
    var options = {
        host:'http://public.api.careerjet.net/search?locale_code=en_US&location=' + location + '&keywords=' + keywords
    };

    http.get(options.host, function (http_res) {
        // initialize the container for our data
        var data = "";
    
        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });
        
        console.log(options.host);   
    
        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {
            var cjJobs = JSON.parse(data);
            var jobPosts = [];
            if(cjJobs && cjJobs.jobs){
                var jobs = cjJobs.jobs;
                for(var i = 0, len =  jobs.length; i < len; i++){
                    var job = jobs[i];
                    var today = moment();
                    var postDate = moment(new Date(job.date));
                    var timestamp = moment(new Date(job.date)).valueOf();
                    var from = postDate.from(today);
                    var parsedUrl = url.parse(job.url, false);

                    var jobPost = {
                        date: from,
                        timestamp: timestamp,
                        url:job.url,
                        title:job.title,
                        shortDescription: utils.trunc(job.description, 100, true),
                        description:job.description,
                        location: job.locations,
                        searchProvider1:'careerjet',
                        searchProvider1Url:'http://jobviewtrack.com/en-us/?affid=dd76f6bdddba7c464603416a83181daf',
                        searchProvider2:job.site,
                        poster: job.company || parsedUrl.host,
                        posterUrl: parsedUrl.host,
                        type: "N/A"                
                    };
                    jobPosts.push(jobPost);
                }
            }
            cb(jobPosts);
        });
    });
}

