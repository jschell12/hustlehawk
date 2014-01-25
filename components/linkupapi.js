/**
    LinkUp API

    LEGAL NOTES: 
        1. Don't store.
            a. this isn't too explicit but I'm sure I can cache (I'll assume this for now).

**/


exports.search = function(keywords, location, cb){        
    var http = require("http");	
    var xml2js = require('xml2js');
    var moment = require('moment');
    var parser = new xml2js.Parser();
    var utils = require("./utility");
    
    var apiKey = "370055E1B925D46C9D52904CCD41F4B2";
    var searchKey = "4299F0BBB53C01F7B644FA1CA040C860";

    var options = {
        host: 'http://www.linkup.com/developers/v-1/search-handler.js?api_key='+apiKey+'&embedded_search_key='+searchKey+'&orig_ip=127.0.0.1&keyword=' + keywords + '&location=' + location + '&distance=50'
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
            var luJobs = JSON.parse(data);
            
            var jobPosts = [];
            if(luJobs && luJobs.jobs){
                var jobs = luJobs.jobs;
                for(var i = 0, len =  jobs.length; i < len; i++){
                    var today = moment();
                    var postDate = moment(new Date(jobs[i].job_date_added));
                    var timestamp = moment(new Date(jobs[i].job_date_added)).valueOf();
                    var from = postDate.from(today);

                    var jobPost = {
                        date: from,
                        timestamp: timestamp,
                        url:jobs[i].job_title_link,
                        title:jobs[i].job_title,
                        shortDescription: utils.trunc(jobs[i].job_description, 100, true),
                        description:jobs[i].job_description,
                        location:jobs[i].job_location,
                        searchProvider1:'linkup',
                        searchProvider1Url:'http://www.linkup.com/?aid=68A261',
                        searchProvider2:'N/A',
                        poster:jobs[i].job_company,
                        posterUrl:"N/A",
                        type: "N/A"                
                    };
                    jobPosts.push(jobPost);
                }
            }
            cb(jobPosts);
        });       
});
}

