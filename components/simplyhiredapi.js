
/**
    SimplyHired API

    LEGAL NOTES: 
        1. This api cannot be used in a mobile application unless approved by SimplyHired.
        2. Don't store.
            a. This may not be strict against caching.

**/


exports.search = function(keywords, location, cb){        
    var http = require("http");	
	var xml2js = require('xml2js');
    var moment = require('moment');
	var parser = new xml2js.Parser();
	var utils = require("./utility");
	
    location = location || "";
    keywords = keywords || "";
    if(keywords === "undefined" || keywords === undefined){ 
        keywords = "";
    }

    var options = {
        host: 'http://api.simplyhired.com/a/jobs-api/xml-v2/ws-25/mi-25/l-' + location + '/q-' + keywords + '/?pshid=&ssty=&cflg=&jbd=&clip='
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
                if(result.sherror){
                  cb([]);
                } else{
                    var shJobs = result.shrs.rs[0].r;
                    var jobPosts = [];
                    if(shJobs){
                        var jobs = shJobs;
                        for(var i = 0, len =  jobs.length; i < len; i++){
                            var today = moment();
                            var postDate = moment(new Date(jobs[i].dp));
                            var timestamp = moment(new Date(jobs[i].dp)).valueOf();
                            var from = postDate.from(today);

                            var jobPost = {
                                date: from,
                                timestamp: timestamp,
                                url:jobs[i].src[0].$.url || "",
                                title:jobs[i].jt[0] || "",
                                shortDescription: utils.trunc(jobs[i].e[0], 100, true) || "",
                                description:jobs[i].e[0] || "",
                                location:jobs[i].loc[0]._ || "",
                                searchProvider1:'simplyhired',
                                searchProvider1Url:'http://www.simplyhired.com/',
                                searchProvider2:jobs[i].src[0]._ || "",
                                poster:jobs[i].cn[0]._ || "",
                                posterUrl:jobs[i].cn[0].$.url || "",
                                type: "N/A"                
                            };
                            jobPosts.push(jobPost);
                        }
                    }
                    cb(jobPosts);
                }
			});
        });
    });
}
