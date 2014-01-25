/**
    CareerBuilder API

    LEGAL NOTES:
        1. I can store for 'caching' purposes
**/


function _formatLocation(loc){
    if(loc.indexOf("-") !== -1){
        var locParts = loc.split("-");
        for(var i = 0, len = locParts.length; i < len; i++){
            locParts[i] = locParts[i].trim();
        }
        
        return locParts[1] + ", " + locParts[0];
    }
    return loc;
}

exports.search = function(keywords, location, cb){        
    var http = require("http");	
	var xml2js = require('xml2js');
    var moment = require('moment');
    var url = require("url");
	var parser = new xml2js.Parser();
	var utils = require("./utility");
	var developerKey = 'WDT828C66K0WSKY90JZC';
    
    var options = {
        host: 'http://api.careerbuilder.com/v1/jobsearch?DeveloperKey='+developerKey+'&Keywords=' + keywords + '&Location=' + location
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
			parser.parseString(data, function (err, result) {				
                var cbJobs = result.ResponseJobSearch.Results[0].JobSearchResult;
                var jobPosts = [];
                if(cbJobs){
                    var jobs = cbJobs;
                    for(var i = 0, len =  jobs.length; i < len; i++){
                        var job = jobs[i];
                        var today = moment();
                        var postDate = moment(new Date(jobs[i].PostedDate[0]));
                        var timestamp = moment(new Date(jobs[i].PostedDate[0])).valueOf();
                        var from = postDate.from(today);

                        var parsedUrl = url.parse(job.CompanyDetailsURL[0] || job.JobDetailsURL[0], false);

                        var jobPost = {
                            date: from,
                            timestamp: timestamp,
                            url: job.JobDetailsURL[0],
                            title: job.JobTitle[0],
                            shortDescription: utils.trunc(job.DescriptionTeaser[0], 100, true),
                            description: job.DescriptionTeaser[0],
                            location: job.Location[0],
                            searchProvider1:'careerbuilder',
                            searchProvider1Url:'http://www.careerbuilder.com/',
                            searchProvider2:'N/A',
                            poster: job.Company[0] || parsedUrl.host,
                            posterUrl: job.CompanyDetailsURL[0],
                            type: "N/A"                
                        };
                        jobPosts.push(jobPost);
                    }
                }    
                cb(jobPosts);
			});
        });
       
    });
}

