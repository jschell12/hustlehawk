exports.getMockJobs =  function(searchTerms, location){
	var utils = require("../utility");
    var moment = require('moment');
    console.log(searchTerms + " " + location);
    var jobsJSON =  {
                "jobs": [
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.theladders.com",
                        "date": "Fri, 01 Feb 2013 08:41:52 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/f203418ff5f502ddd629b9c65992d7d7.html",
                        "title": "Software Application Support Lead",
                        "description": " Azure Working knowledge of <b>JavaScript</b> Exposure to ASP/.Net/VB Windows security and Internet protocols: HTTPS, FTP, SMTP, VPN...",
                        "company": "",
                        "salary": "$100000 per year"
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.feetrader.com",
                        "date": "Thu, 31 Jan 2013 08:43:27 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/fdb9a75e8692efc8ee9ba75185f4c9c7.html",
                        "title": "Senior Recruiters",
                        "description": "*** NOTE: This site will only function correctly if <b>javascript</b> is enabled in your browser. *** Revolutionizing...",
                        "company": "FeeTrader.com",
                        "salary": ""
                    },
                    {
                        "locations": "Danbury, CT - Bridgeport, CT",
                        "site": "jobs.jobdiagnosis.com",
                        "date": "Fri, 01 Feb 2013 08:48:23 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/d1ba7bb9066cc9f7784eaa965408081f.html",
                        "title": "Net Developer for growing firm in Fairfield County CT",
                        "description": " card holders or US citizens, please. Job Qualifications .Net (VB.Net, ASP.Net) Website design and development <b>JavaScript</b>...",
                        "company": "",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.beyond.com",
                        "date": "Fri, 01 Feb 2013 08:33:44 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/9c43e935d8dbe229ba6944055a2f9828.html",
                        "title": "Digital Strategist for education company",
                        "description": ", jQuery and <b>Javascript</b>.- Must also be skilled with Excel, Access, Word and PowerPoint.- Strong attention to detail...",
                        "company": "CyberCoders",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "jobdiagnosis.com",
                        "date": "Fri, 01 Feb 2013 08:31:14 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/514afb9db8738dd5aed5e0abec852516.html",
                        "title": "Web Developer for a fast-growing company in CT",
                        "description": " Programming, PHP, MySQL, <b>JavaScript</b>, AJAX, HTML5, Linux, jQuery, Web Design If you are a Web Developer with experience... background - PHP (OOP experience desirable) - MySQL - <b>Javascript</b> (AJAX especially) - HTML5/CSS - JQuery (and plugins) - Web...",
                        "company": "CyberCoders",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.beyond.com",
                        "date": "Fri, 01 Feb 2013 08:28:45 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/93ec6e44670d237f8b682a1574bef9fb.html",
                        "title": "Developer - .NET, ASP.NET, Database Design",
                        "description": ", Website Design and development, MVC 3, <b>JavaScript</b>, XML, .Net Web ServicesIf you are a developer that loves to code... and development- <b>JavaScript</b>, VB. NET and XML experience- .NET web services (basic knowhow would be a plus)What you''ll be doing...",
                        "company": "CyberCoders",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.beyond.com",
                        "date": "Fri, 01 Feb 2013 08:00:41 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/12d2ce52b22e32175304d907ce6aee61.html",
                        "title": "Developer - ASP.NET, .NET, Coding",
                        "description": " Developer - ASP.NET, .NET, Coding Developer - Skills Required - ASP.NET, .NET, Coding, <b>JavaScript</b>, VB.NETIf... or ASP.NET- Love to code- Database designA plus but not necessary to have for this opportunity:- <b>JavaScript</b>, VB. NET and XML...",
                        "company": "CyberCoders",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.shawgrp.com",
                        "date": "Fri, 01 Feb 2013 05:42:24 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/13c2ade4795807c20fb33b0a2cabf135.html",
                        "title": "Technical Writer",
                        "description": "Your browser must be configured to support <b>JavaScript</b> before you can apply. Once you have properly configured... your browser please try again. The form below WILL NOT submit until <b>JavaScript</b> is enabled. If you are interested in applying...",
                        "company": "Shaw Group",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.jobcentral.com",
                        "date": "Wed, 30 Jan 2013 23:48:17 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/c1ef30d311b18aa5a7b6cda302fe39c2.html",
                        "title": "Developer - .NET, ASP.NET, Database Design",
                        "description": ", Website Design and development, MVC 3, <b>JavaScript</b>, XML, .Net Web Services If you are a developer that loves to code... and development - <b>JavaScript</b>, VB. NET and XML experience - .NET web services (basic knowhow would be a plus) What you''ll be doing...",
                        "company": "CyberCoders",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.jobcentral.com",
                        "date": "Wed, 30 Jan 2013 23:46:27 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/9deffcfc15433fed30f18e667b22a1ce.html",
                        "title": "Digital Strategist for education company",
                        "description": " competency in CSS, HTML, Adobe Creative Suite, jQuery and <b>Javascript</b>. - Must also be skilled with Excel, Access, Word...",
                        "company": "CyberCoders",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.jobcentral.com",
                        "date": "Wed, 30 Jan 2013 23:18:02 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/bb64e1dcecd01f58082cfd369eb151eb.html",
                        "title": "Developer - ASP.NET, .NET, Coding",
                        "description": " Developer - ASP.NET, .NET, Coding Developer - Skills Required - ASP.NET, .NET, Coding, <b>JavaScript</b>, VB.NET... or ASP.NET - Love to code - Database design A plus but not necessary to have for this opportunity: - <b>JavaScript</b>, VB. NET...",
                        "company": "CyberCoders",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.beyond.com",
                        "date": "Wed, 30 Jan 2013 08:10:21 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/14a48424a2ce948c289c248ebcec935b.html",
                        "title": "Web Developer for a fast-growing company in CT",
                        "description": " Programming, PHP, MySQL, <b>JavaScript</b>, AJAX, HTML5, Linux, jQuery, Web DesignIf you are a Web Developer with experience, please read... background- PHP (OOP experience desirable)- MySQL- <b>Javascript</b> (AJAX especially)- HTML5/CSS- JQuery (and plugins)- Web Design...",
                        "company": "CyberCoders",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.jobcentral.com",
                        "date": "Sun, 20 Jan 2013 23:39:26 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/e11829eef2136b69065ca5f853b1d760.html",
                        "title": "Web Developer for a fast-growing company in CT",
                        "description": " Programming, PHP, MySQL, <b>JavaScript</b>, AJAX, HTML5, Linux, jQuery, Web Design If you are a Web Developer with experience... background - PHP (OOP experience desirable) - MySQL - <b>Javascript</b> (AJAX especially) - HTML5/CSS - JQuery (and plugins) - Web...",
                        "company": "CyberCoders",
                        "salary": ""
                    },
                    {
                        "locations": "Bridgeport, CT",
                        "site": "www.ihirejobnetwork.com",
                        "date": "Fri, 12 Oct 2012 22:21:33 GMT",
                        "url": "http://jobviewtrack.com/en-us/job/eb776ea69319d9bc38f6ed7d0c845585.html",
                        "title": "Senior JAVA Developer (Api, Swing, Eclipse, Javaee/Se)",
                        "description": " · Experience with web application development and frameworks desired (Servlet, REST, GWT, <b>JavaScript</b>) · Familiarity with Windows...",
                        "company": "Commonwealth Search Group",
                        "salary": ""
                    }
                ],
                "hits": 14,
                "response_time": 0.0309591293334961,
                "type": "JOBS",
                "pages": 1
            };
            
        var cjJobs = jobsJSON;
        var jobPosts = [];
        if(cjJobs && cjJobs.jobs){
            var jobs = cjJobs.jobs;
            for(var i = 0, len =  jobs.length; i < len; i++){
                var jobPost = {
                    date: moment(new Date(jobs[i].date)).format("MMM D, YYYY"),
                    url:jobs[i].url,
                    title:jobs[i].title,
                    shortDescription: utils.trunc(jobs[i].description, 100, true),
                    description:jobs[i].description,
                    location: jobs[i].locations,
                    searchProvider1:'careerjet',
                    searchProvider2:jobs[i].site,
                    poster: jobs[i].company ? jobs[i].company : "N/A",
                    posterUrl:"N/A",
                    type: "N/A"                
                };
                jobPosts.push(jobPost);
            }
        }        
        return { jobs: jobPosts};
};	