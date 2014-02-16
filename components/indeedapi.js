/**
    Indeed API

    LEGAL NOTES:
**/



exports.search = function(keywords, location, cb){        
    var http = require("http");	
	var xml2js = require('xml2js');
    var moment = require('moment');
    var url = require("url");
	var parser = new xml2js.Parser();
	var utils = require("./utility");
    var publisherId = 'publisher id';
    
    var options = {
        host: 'http://api.indeed.com/ads/apisearch?'+
        'publisher=' + publisherId +
        '&q=' + keywords +
        '&l=' + location +
        '&sort=date&radius=25&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2'
    };
    
    http.get(options.host, function (http_res) {
        // initialize the container for our data
        var data = "";
    
        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });
    
        console.log(options.host)
        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {                
			parser.parseString(data, function (err, result) {		
                var results = result.response.results;
                var idJobs = [];
                if(results.length > 0){
                    idJobs = results[0].result;
                }
                var jobPosts = [];
                if(idJobs !== undefined && idJobs.length > 0){
                    var jobs = idJobs;
                    for(var i = 0, len =  jobs.length; i < len; i++){
                        var job = jobs[i];
                        var today = moment();
                        var postDate = moment(new Date(jobs[i].date));
                        var timestamp = moment(new Date(jobs[i].date)).valueOf();
                        var from = postDate.from(today);

                        var jobPost = {
                            date: job.formattedRelativeTime[0],
                            timestamp: timestamp,
                            url: job.url[0],
                            title: job.jobtitle[0],
                            shortDescription: utils.trunc(job.snippet[0], 100, true),
                            description: job.snippet[0],
                            location: job.formattedLocation[0],
                            searchProvider1:'indeed',
                            searchProvider1Url:'http://www.indeed.com/',
                            searchProvider2: job.source[0],
                            poster: job.company[0],
                            posterUrl: "",
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

