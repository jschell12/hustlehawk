exports.getMockJobs =  function(searchTerms, location){
	var utils = require("../utility");
    var moment = require('moment');
    console.log(searchTerms + " " + location);
    var jobsJSON =  {
                "criteria": {
                    "keyword": "Javascript",
                    "keyword_exact": false,
                    "keyword_exclude": false,
                    "title_keyword": false,
                    "title_exact": false,
                    "title_exclude": false,
                    "desc_keyword": false,
                    "desc_exact": false,
                    "desc_exclude": false,
                    "location": "Bridgeport, CT",
                    "distance": 25,
                    "company": false,
                    "tags": "",
                    "list": false,
                    "sort": "r",
                    "per_page": 20,
                    "time_frame": false,
                    "page": 1
                },
                "result_info": {
                    "total_pages": 1,
                    "page": 1,
                    "total_sponsored": 0,
                    "sponsored_on_page": 0,
                    "total_jobs": 19,
                    "jobs_on_page": 19,
                    "total_combined": 19
                },
                "title": "Javascript Jobs in Bridgeport, CT",
                "jobs": [
                    {
                        "job_title": "A1055 Q/A Analyst",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=157454982d31e409aa39d4dd58644c1a&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "Datapath Search Corporation",
                        "job_tag": "",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "December 5, 2012",
                        "job_description": "Working understanding of HTML and <strong>JavaScript</strong> \" Basic network troubleshooting skills \" Familiarity with software design patterns Copyright &copy; 2010 Powered by Webber Marketing . All Rights Reserved Worldwide. Comments and suggestions are welcome",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Front End Engineer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=bf1378c62160727ffb2a56c1d5779676&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "priceline.com",
                        "job_tag": "Engineering & Architecture",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "December 11, 2012",
                        "job_description": "which changes work. The data speaks for itself. We believe in hiring people who love what they do. Do you value craftsmanship? Rock HTML, CSS, and <strong>Javascript</strong>? We want to talk to you. Have some server-side chops like JSP/Java, PHP, Ruby, node.js, and so&#8230;",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Web Application Developer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=658a5399232a3d491fb9a55f53b9acf9&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "GigMasters",
                        "job_tag": "Web Development",
                        "job_location": "Redding, CT",
                        "job_zip": "06896",
                        "job_date_added": "January 20, 2013",
                        "job_description": "can code ASP.NET like nobody&rsquo;s business &ndash; but is also no stranger to CSS, <strong>JavaScript</strong> or SQL. And this is not a telecommuting gig, we need you here on-site. Where we are  Our small, talented and enthusiastic team is headquartered in Redding, CT &ndash; an escape",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "UI Web Designer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=c274d20eaaa44cab1d07cae6c00c94fd&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "priceline.com",
                        "job_tag": "",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "January 28, 2013",
                        "job_description": "We&rsquo;re looking for passionate people to lead the creation of wireframes and mockups to inform, direct, and evolve the look and feel of our web site. While knowledge of web technologies like HTML, CSS, and <strong>JavaScript</strong> is extremely useful, don&rsquo;t worry if you",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Flash Developer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=ed703b864e9584ab2de091b3a90ead1b&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "SolutionSet",
                        "job_tag": "Web Development",
                        "job_location": "Westport, CT",
                        "job_zip": false,
                        "job_date_added": "January 14, 2013",
                        "job_description": "Reporting to a Vice President, the Flaseh Developer is responsible for working along with development team to deliver cutting edge interactive campaigns designed to target client&amp;rsquo;s key customer base. &amp;nbsp;The Flash Developer should be able to work",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Web Developer - PHP",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=6f25e73e620c5a64fa5c4898a9d198b5&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "priceline.com",
                        "job_tag": "Web Development",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "November 28, 2012",
                        "job_description": "At priceline.com, the marketing team is looking for a rock solid PHP Web Developer to develop a vast array of applications. We believe in hiring smart people who love what they do. Do you value craftsmanship? Rock PHP, HTML, CSS, and <strong>Javascript</strong>? We&#8230;  <strong>Ja</strong>",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Senior Software Engineer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=e6d363e99e5a8bb63de6c268b56b1bb1&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "priceline.com",
                        "job_tag": "Software Development",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "August 23, 2012",
                        "job_description": "be expeienced with XML technoloiges (parsers, XML schema, XSLT etc) and proficient in front end technologies such as <strong>Javascript</strong>, ajax, HTML and stylesheets. Must be able to write SQL and be comfortable working with relational databases (Oracle and MySQL).",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Associate Software Engineer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=fbde9c613518cbbba44c8c80dff12ce1&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "priceline.com",
                        "job_tag": "Software Development",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "January 11, 2013",
                        "job_description": "Oracle or MySQL) Web application development. (HTML, <strong>JavaScript</strong>, XML, CSS, PHP) UNIX shell scripting. Troubleshooting and Debugging experience Strong work ethic and analytical skills. Required Experience  A bachelor degree in Computer Information",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "COO Management Information Systems Lead",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=189f6c9bdd749224b0d007fa3c651672&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "Bridgewater",
                        "job_tag": "Technology",
                        "job_location": "Westport, CT",
                        "job_zip": false,
                        "job_date_added": "January 16, 2013",
                        "job_description": "application and MS Project Server knowledge&middot; Database skills, specifically SQL language and use of stored procedures for data modeling purposes&middot; Advanced SharePoint and MS InfoPath experience&middot; Web technologies including HTML, XML, XSL &amp; <strong>JavaScript</strong> &middot; Hands",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Application Quality Assurance Analyst",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=4c431c3097364ae6713c565443f3d6ca&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "FactSet Research Systems Inc.",
                        "job_tag": "Tech Quality Assurance",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "December 18, 2012",
                        "job_description": "communication and documentation skills. Very strong organizational skills and attentiveness to detail. Highly Desired: &middot; <strong>JavaScript</strong> or HTML Use of automation tools such as Test Complete, QTP (Quick Test Pro), or other tools. Strong project management",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Search Engine Marketing Specialist",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=93d07f780e35b8220066ebd991c80170&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "Perkin Elmer",
                        "job_tag": "Marketing",
                        "job_location": "Shelton, CT",
                        "job_zip": "06484",
                        "job_date_added": "January 16, 2013",
                        "job_description": "behaviors, and opportunities as it relates to organic and paid search results on the major search engines. &middot; Strong grasp of HTML, CSS, <strong>Javascript</strong> and other web platforms and how the deployment of quality code can impact search performance. &middot; Experience",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Software Engineer III",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=7498f748d1318d6d34309809a405c713&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "National CineMedia Corporation",
                        "job_tag": "Software Development",
                        "job_location": "Shelton, CT",
                        "job_zip": "06484",
                        "job_date_added": "November 20, 2012",
                        "job_description": "based Web Services. &bull; Systems design and development: Enterprise &amp; Department Class Systems. &bull; Programming Languages: C#, ASP.NET, SQL, T-SQL, <strong>JavaScript</strong>, CSS. &bull; Debugging and Tuning: 4G Languages &amp; SQL. &bull; Testing: Approach (Unit, System, End to End,",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Junior Software Engineer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=1714bc4461ffc5642fab9021a5606946&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "priceline.com",
                        "job_tag": "Software Development",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "September 11, 2012",
                        "job_description": "we looking for? Simply put, the best Java talent in the market!  Some Java skills. Knowledge and work experience with HTML, <strong>JavaScript</strong>, CSS and Ajax. Familiarity with Eclipse, Apache, Tomcat, JBoss and ability to configure an application server. Very",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Software Engineer I",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=8c1918ea5394372d7ce1ef17e38ed4c7&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "National CineMedia Corporation",
                        "job_tag": "Software Development",
                        "job_location": "Shelton, CT",
                        "job_zip": "06484",
                        "job_date_added": "February 12, 2012",
                        "job_description": "developing SOAP and/or REST based Web Services. &bull; Development and Maintenance: Enterprise &amp; Department Class Systems. &bull; Programming Languages: C#, ASP.NET, SQL, T-SQL, <strong>JavaScript</strong>, and CSS. &bull; Debugging &amp; Tuning: 4G Languages &amp; SQL. &bull; Testing: Approach",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Web Application Developer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=43b9c59a99ded303cc4dee4876ca5aaa&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "FactSet Research Systems Inc.",
                        "job_tag": "Web Development",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "January 20, 2013",
                        "job_description": "documentation and test plans as needed  Job Requirements : The ideal candidate will be a Mid+ level Software Developer with experience developing end-to-end web applications (focus on UI) using: - Client side development technologies: <strong>JavaScript</strong>, jQuery,",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Senior .Net Web Developer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=3a926e7e0f40eee96992327793711d82&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "SolutionSet",
                        "job_tag": "Web Development",
                        "job_location": "Westport, CT",
                        "job_zip": false,
                        "job_date_added": "January 14, 2013",
                        "job_description": "HTML (HTML5 a plus), XHTML, CSS, <strong>JavaScript</strong>, JQuery and ASP.NET/C#. Knowledge of NHibernate is a plus. Knowledge of Microsoft IIS and Windows Servers, managing large scale deployments, including configuration management Ability to create, modify and",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Software Engineer (C#, .Net)",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=324c9d8c9994e2231de2b4c05c6fa10b&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "McKesson Corp",
                        "job_tag": "Software Development",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "January 4, 2013",
                        "job_description": "Strongobjectorienteddevelopmentskills. Strong communication skills in technical specifications, system documentation and on-going systems support. Strong experience in MS Windows 7/2008. Pluses: Experience with web programming using asp.net MVC, <strong>javascrip</strong>",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Principal Security Engineer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=623e85027dcc74e66e4ac00dba1e5177&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "priceline.com",
                        "job_tag": "System Admininistrator",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "December 13, 2012",
                        "job_description": "following scripting lanuages strongly preferred: Perl, PHP, Python, <strong>Javascript</strong>. Must have solid working experience and knowledge of Windows and Unix/Linus operating systems. Be results oriented, highly energetic and self motivated. Have excellent written",
                        "job_country": "United States"
                    },
                    {
                        "job_title": "Software Engineer",
                        "job_title_link": "http://www.linkup.com/job-search-engine/listings.html?jobHash=08964d5edfac96c6931ace50f43118cf&embedded-search=4299F0BBB53C01F7B644FA1CA040C860",
                        "job_company": "FactSet Research Systems Inc.",
                        "job_tag": "Software Development",
                        "job_location": "Norwalk, CT",
                        "job_zip": "06850",
                        "job_date_added": "October 13, 2012",
                        "job_description": "both design and implement superior software Desirable experience in any of the following focus areas: Strong C/C++ generic programming skills, including STL, boost Web 2.0 development knowledge, particularly <strong>Javascript</strong> Experience with scripting",
                        "job_country": "United States"
                    }
                ],
                "sponsored_listings": [],
                "warnings": [
                    "No sponsored_listings to display"
                ]
            };
            
        var luJobs = jobsJSON;
            
        var jobPosts = [];
        if(luJobs && luJobs.jobs){
            var jobs = luJobs.jobs;
            for(var i = 0, len =  jobs.length; i < len; i++){
                var jobPost = {
                    date: moment(new Date(jobs[i].job_date_added)).format("MMM D, YYYY"),
                    url:jobs[i].job_title_link,
                    title:jobs[i].job_title,
                    shortDescription: utils.trunc(jobs[i].job_description, 100, true),
                    description:jobs[i].job_description,
                    location:jobs[i].job_location,
                    searchProvider1:'linkup',
                    searchProvider2:'N/A',
                    poster: jobs[i].job_company ? jobs[i].job_company : "N/A",
                    posterUrl:"N/A",
                    type: "N/A"                
                };
                jobPosts.push(jobPost);
            }
        }
        return { jobs: jobPosts};
};	