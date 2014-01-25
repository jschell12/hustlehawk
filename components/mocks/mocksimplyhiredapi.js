exports.getMockJobs =  function(searchTerms, location){
	var utils = require("../utility");
    var moment = require('moment');
    console.log(searchTerms + " " + location);
    var jobsJSON =  {
              "shrs": {
                "rq": {
                  "-url": "http://api.simplyhired.com/a/jobs-api/xml_v2/q-javascript/l-Bridgeport%2C+CT/mi-25/ws-25",
                  "t": "Javascript Jobs - Bridgeport, CT",
                  "dt": "2013-02-02T02:47:04Z",
                  "si": "0",
                  "rpd": "25",
                  "tr": "706",
                  "tv": "574",
                  "em": {
                    
                  },
                  "h": {
                    "kw": { "-pos": "1" }
                  }
                },
                "rs": {
                  "r": [
                    {
                      "jt": "Senior Web Applications Developer (HTML5, CSS3, and JavaScript)",
                      "cn": { "#text": "Gartner" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-c5c94d9e5815bc35338da6e40a7c7583ed6f416/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-0/hits-706",
                        "#text": "Gartner, Inc"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06902",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-02-01T09:24:57Z",
                      "dp": "2013-02-01T09:24:57Z",
                      "e": "They will know core web technologies (HTML5, CSS3, and JavaScript) cold and will be able to show examples of ... accessibility and SEO considerations* Extensive work with JavaScript and JS Frameworks (like JQuery, DoJo); and work..."
                    },
                    {
                      "jt": "Website Specialist-eCommerce, CSS3, JavaScript, HTML5, CS5 Suite",
                      "cn": { "#text": "Aquinas Consulting" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5806.8798c885f9fe960b4eff8327ff731213/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-1/hits-706",
                        "#text": "Aquinas Consulting"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Danbury",
                        "-st": "CT",
                        "-postal": "06810",
                        "-country": "US",
                        "#text": "Danbury, CT"
                      },
                      "ls": "2013-01-26T13:04:37Z",
                      "dp": "2013-01-26T13:04:37Z",
                      "e": "of popular website platforms. :Experience with CSS3, JavaScript, HTML5, CS5 Suite, and MS Office. :Experience in developing user requirements and writing technical documentation. :Proven ability to communicate complex data requirements to..."
                    },
                    {
                      "jt": "JavaScript Developer",
                      "cn": { "#text": "Scom" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5777.J3J1DD70SBMC2VJFZC4/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-2/hits-706",
                        "#text": "Sologig"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06905",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-01-29T09:47:45Z",
                      "dp": "2013-01-29T09:47:45Z",
                      "e": "expert knowledge of core web technologies (HTML5, CSS3, and JavaScript) and will be able to show examples of ... them in highly scalable ways. Responsibilities * Lead JavaScript developer on the front-end development team *..."
                    },
                    {
                      "jt": "Linux System Administration - Linux, PERL, JavaScript",
                      "cn": { "#text": "Cybercoders" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-20495.7976f72320f78293f6653ce0bbd35169/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-3/hits-706",
                        "#text": "Monster"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Norwalk",
                        "-st": "CT",
                        "-postal": "06855",
                        "-country": "US",
                        "#text": "Norwalk, CT"
                      },
                      "ls": "2013-01-31T19:43:17Z",
                      "dp": "2013-01-21T19:45:05Z",
                      "e": "Linus System Aministration Required Skills Linux, PERL, JavaScript, TCP/IP, Windows Recruiter Marc Glickman Date ... Linux System Administration Skills Required: Linux, PERL, JavaScript, TCP/IP, Windows Job Description: We are one of..."
                    },
                    {
                      "jt": "Web Developer - PHP, HTML, CSS, JavaScript",
                      "cn": { "#text": "Itech Consulting Partners" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5934.WebDev-38C/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-4/hits-706",
                        "#text": "Dice"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06901",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-01-24T23:24:28Z",
                      "dp": "2013-01-17T14:38:32Z",
                      "e": "7+ years of relevant experience Web Languages PHP HTML CSS JavaScript (jQuery) Perl (RegEx) SQL CMSFrameworks Code ... skills with good business judgment PHP, HTML, CSS, JavaScript, jQuery, Perl , SQL, Wordpress, mySQL, Oracle,..."
                    },
                    {
                      "jt": "Interactive Mobile Designe : HTML, CSS, JavaScript",
                      "cn": { "#text": "Logistic Solutions" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5843.165609/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-5/hits-706",
                        "#text": "iitjobs.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06905",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-01-16T09:41:15Z",
                      "dp": "2013-01-16T09:41:15Z",
                      "e": "of styles. 2 years of demonstrated experience of HTML, CSS, JavaScript and their underlying technical concepts. 2 years experience of web and mobile standards, best practices, design and usability principles, and constraints within web,..."
                    },
                    {
                      "jt": "Hedge Fund - Web Developer - JavaScript, Ajax, MySQL",
                      "cn": { "#text": "Analytic Recruiting" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5346.4000000001091359/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-6/hits-706",
                        "#text": "eFinancialCareers"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06905",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2012-12-13T22:22:40Z",
                      "dp": "2012-09-29T02:09:47Z",
                      "e": "environment Key Words: LAMP, Perl, Python, Linux, JavaScript, Ajax, MySQL, Compensation: $150-200k Please refer to Job 19478- EFC and send MS Word attached resume to tim@analyticrecruiting.com If you are a suitable candidate, you can..."
                    },
                    {
                      "jt": "Senior JavaScript Developer",
                      "cn": { "#text": "Citadel Information Services" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-14716.11-00319/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-7/hits-706",
                        "#text": "Jobdiva"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06905",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2012-08-27T06:37:04Z",
                      "dp": "2012-08-08T12:57:20Z",
                      "e": "Web technologies Specific technical skills Proficient in JavaScript, JQuery, HTML, DHTML, MSXML (XMLDOM, XSL, XPATH), CSS (Cascading Style Sheets) Proficient in Microsoft Visual Studio 2008/10 Knowledge of debugging tools and techniques..."
                    },
                    {
                      "jt": "Web Developer - Javascript CSS HTML",
                      "cn": { "#text": "Distributed Technology Solutions" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5806.2925d4ebd702561fbbfbccd61864cd11/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-8/hits-706",
                        "#text": "Distributed Technology Solutions"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Greenwich",
                        "-st": "CT",
                        "-postal": "06830",
                        "-country": "US",
                        "#text": "Greenwich, CT"
                      },
                      "ls": "2013-01-17T13:00:45Z",
                      "dp": "2013-01-17T13:00:45Z",
                      "e": "bundle) - Shell scripting - Expert level in HTML, CSS, Javascript, AJAX - Expert level in Perl knowledge in HTML::Mason is a great plus - Some Working knowledge in PHP or Python - Expert level in SQL databases (MySql) - Solid problem..."
                    },
                    {
                      "jt": "PhP programmer with Javascript, YUI, and MS SQL Server Expertise - SQL Server JavaScript PHP",
                      "cn": { "#text": "Elance.com" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-8060.37049681/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-9/hits-706",
                        "#text": "Elance.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Norwalk",
                        "-st": "CT",
                        "-postal": "06857",
                        "-country": "US",
                        "#text": "Norwalk, CT"
                      },
                      "ls": "2013-01-29T16:32:50Z",
                      "dp": "2013-01-21T16:27:36Z",
                      "e": "a very solid understanding of PHP, work comfortably with Javascript, YUI Yahoo user interface, and understand interactions with MS SQL Server 2008. Desired Skills: SQL Server JavaScript  ... Desired Skills: SQL Server JavaScript PHP..."
                    },
                    {
                      "jt": "RNA010-Web Developer -HTML, CSS, JavaScript, ASP, ASP .NET",
                      "cn": { "#text": "Amtex Systems.com" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-15507.1985553/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-10/hits-706",
                        "#text": "Corp-Corp.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Norwalk",
                        "-st": "CT",
                        "-postal": "06860",
                        "-country": "US",
                        "#text": "Norwalk, CT"
                      },
                      "ls": "2013-01-11T06:25:11Z",
                      "dp": "2013-01-11T06:25:11Z",
                      "e": "Description: Locals. Strong Web Developer - Great communication skills. - Good project management; always deliver on time or is able to discuss issues before a deadline - Self-managed. - Strong HTML, HTML 5, CSS, Java script - Knows image..."
                    },
                    {
                      "jt": "Senior Web Applications Developer (HTML5, CSS3, and JavaScript) (1748028121407)",
                      "cn": { "#text": "Gartner" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-23390.1748028121407/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-11/hits-706",
                        "#text": "Dice"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06902",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-02-01T13:40:10Z",
                      "dp": "2013-01-29T12:16:32Z",
                      "e": "They will know core web technologies (HTML5 CSS3 and JavaScript) cold and will be able to show examples of ... accessibility and SEO considerations Extensive work with JavaScript and JS Frameworks (like JQuery, DoJo); and work..."
                    },
                    {
                      "jt": "JavaScript Developer - EY-JavaSCriptDev",
                      "cn": { "#text": "Cybercoders" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-8395.EY-JavaSCriptDev-CT_1/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-12/hits-706",
                        "#text": "CyberCoders"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Hamden",
                        "-st": "CT",
                        "-postal": "06514",
                        "-country": "US",
                        "#text": "Hamden, CT"
                      },
                      "ls": "2013-01-30T20:49:33Z",
                      "dp": "2013-01-16T20:09:41Z",
                      "e": "JavaScript Developer needed for a research company in CT! JavaScript Developer We are a research company using cutting ... interesting work flows and data interactions If you are a JavaScript Developer with experience, please read on! What..."
                    },
                    {
                      "jt": "Web Developers : HTML, CSS, JavaScript, VBScript, MS SQL",
                      "cn": { "#text": "On-line Systems" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5843.183072/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-13/hits-706",
                        "#text": "iitjobs.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "New Haven",
                        "-st": "CT",
                        "-postal": "06514",
                        "-country": "US",
                        "#text": "New Haven, CT"
                      },
                      "ls": "2013-01-04T10:16:29Z",
                      "dp": "2013-01-04T10:16:29Z",
                      "e": "out there!! Need Senior Engineers with solid HTML, CSS, JavaScript, VBScript, MS SQL, Crystal Report, Visual Basic, .Net experience. Flex and Actionscript are nice to have, but not required. More IT jobs at..."
                    },
                    {
                      "jt": "Front End Developer Javascript AJAX",
                      "cn": { "#text": "Amadan" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5806.240394627f21686fc9a67b5145d6b819/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-14/hits-706",
                        "#text": "Amadan Inc."
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Norwalk",
                        "-st": "CT",
                        "-postal": "06857",
                        "-country": "US",
                        "#text": "Norwalk, CT"
                      },
                      "ls": "2012-09-08T11:30:31Z",
                      "dp": "2012-09-08T11:30:31Z",
                      "e": "- Comfortable with various web client technologies: javaScript, Ajax, HTML, DHTML, CSS, HTTP. - Comfortable with ... - Expert experience in programming languages: Java , JavaScript - Expertise in Java Server Pages (JSP),..."
                    },
                    {
                      "jt": "Senior Interactive Developer - html5, css3, javascript, json, jquery",
                      "cn": { "#text": "Gartner" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-14828.job563937/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-15/hits-706",
                        "#text": "BullhornReach.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06902",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-01-10T20:31:56Z",
                      "dp": "2012-11-02T07:17:45Z",
                      "e": "They will know core web technologies (HTML5, CSS3, and JavaScript) cold and will be able to show examples of ... accessibility and SEO considerations Extensive work with JavaScript and JS Frameworks (like JQuery, DoJo); and work..."
                    },
                    {
                      "jt": "Web Developer - PHP, HTML, CSS, JavaScript (WebDev-38C)",
                      "cn": { "#text": "Itech Consulting Partners" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-23390.WebDev-38C/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-16/hits-706",
                        "#text": "Dice"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06901",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-01-25T00:14:16Z",
                      "dp": "2013-01-17T15:08:30Z",
                      "e": "7+ years of relevant experience Web Languages PHP HTML CSS JavaScript (jQuery) Perl (RegEx) SQL CMSFrameworks Code ... skills with good business judgment PHP, HTML, CSS, JavaScript, jQuery, Perl , SQL, Wordpress, mySQL, Oracle,..."
                    },
                    {
                      "jt": "Java Developer : Javascript, HTML, C++ Web Services, SQL Server",
                      "cn": { "#text": "On-line Systems" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5843.183073/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-17/hits-706",
                        "#text": "iitjobs.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "New Haven",
                        "-st": "CT",
                        "-postal": "06514",
                        "-country": "US",
                        "#text": "New Haven, CT"
                      },
                      "ls": "2013-01-04T10:16:29Z",
                      "dp": "2013-01-04T10:16:29Z",
                      "e": "Looking for a seasoned Web Developer with the following skillset: - BS degree in Computer Science - 8 - 10 years professional experience in software development and software architecture - Experience developing applications using Java,..."
                    },
                    {
                      "jt": "Senior Software Developer : HTML, DHTML, MSXML,JavaScript",
                      "cn": { "#text": "S.Com" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5843.178367/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-18/hits-706",
                        "#text": "iitjobs.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06905",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-01-16T09:41:13Z",
                      "dp": "2012-11-15T10:07:23Z",
                      "e": "technologies. * Specific technical skills * Proficient in JavaScript, HTML, DHTML, MSXML (XMLDOM, XSL, XPATH), CSS (Cascading Style Sheets) * Proficient in Microsoft Visual Studio 2008/10 * Knowledge of debugging tools and techniques *..."
                    },
                    {
                      "jt": "Web Front End Developer-HTML / HTML 5, JavaScript, CSS, JSTL, JSP, JQuery, AJAX, JSON",
                      "cn": { "#text": "Aquinas Consulting" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5806.b9b346bfa1cabc6655c28489a91c23fd/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-19/hits-706",
                        "#text": "Aquinas Consulting"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06902",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-01-29T13:35:41Z",
                      "dp": "2013-01-29T13:35:41Z",
                      "e": "an expert in web technologies such as HTML / HTML 5, CSS, JavaScript and JQuery. Hands on working knowledge of ... communication is a necessity. Skills: : HTML / HTML 5, JavaScript, CSS, JSTL, JSP, JQuery, AJAX, JSON : Java / J2EE..."
                    },
                    {
                      "jt": "C/C++ Developer : AJAX, JavaScript, Oracle, Unix, MySQL, Java, Perl, PHP",
                      "cn": { "#text": "Amba Systems" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5843.200079/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-20/hits-706",
                        "#text": "iitjobs.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06905",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-01-22T11:04:08Z",
                      "dp": "2013-01-22T11:04:08Z",
                      "e": "* Proficient in Website creation with Focus on AJAX, JavaScript, and other technologies to improve client side user interfaces. * Proficient in PHP4 and 5 (class based php a plus ), and Perl Scripting. * Especially talking to Oracle and..."
                    },
                    {
                      "jt": "Java Developer/ HIS / PACS/ RIS : JavaScript, HTML, DHTML, MSXML",
                      "cn": { "#text": "S.Com" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5843.178371/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-21/hits-706",
                        "#text": "iitjobs.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Stamford",
                        "-st": "CT",
                        "-postal": "06905",
                        "-country": "US",
                        "#text": "Stamford, CT"
                      },
                      "ls": "2013-01-16T09:41:13Z",
                      "dp": "2012-11-15T10:07:23Z",
                      "e": "technologies. * Specific technical skills * Proficient in JavaScript, HTML, DHTML, MSXML (XMLDOM, XSL, XPATH), CSS (Cascading Style Sheets) * Proficient in Microsoft Visual Studio 2008/10 * Knowledge of debugging tools and techniques *..."
                    },
                    {
                      "jt": ".NET DEVELOPER : SDLC,JavaScript, JQuery, AJAX, XML, WCF",
                      "cn": { "#text": "Epathusa" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-5843.182167/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-22/hits-706",
                        "#text": "iitjobs.com"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Norwalk",
                        "-st": "CT",
                        "-postal": "06857",
                        "-country": "US",
                        "#text": "Norwalk, CT"
                      },
                      "ls": "2013-01-12T09:38:55Z",
                      "dp": "2012-10-09T07:38:16Z",
                      "e": "Technical Qualifications: ASP.NET using C# and/or VB.NET ASP and VB6 experience JavaScript, JQuery, AJAX, XML, WCF, XML Web Services Integration, X/HTML, CSS and DHTML Responsible for leading, developing and optimizing complex data and..."
                    },
                    {
                      "jt": "Salesforce Architect",
                      "cn": { "#text": "Mindlance" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-4f3bd1c6e8eb32d32e27b0b115148d627eb69112/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-23/hits-706",
                        "#text": "Mindlance"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Norwalk",
                        "-st": "CT",
                        "-postal": "06857",
                        "-country": "US",
                        "#text": "Norwalk, CT"
                      },
                      "ls": "2013-02-01T04:54:16Z",
                      "dp": "2013-02-01T04:54:16Z",
                      "e": "s Extensive experience designing, implementing, customizing and integrating the Salesforce.com Services."
                    },
                    {
                      "jt": "1901 Salesforce Architect",
                      "cn": { "#text": "Technology Project Group" },
                      "src": {
                        "-url": "http://api.simplyhired.com/a/job-details/view/jobkey-10775.2013-02-01_job_20130131202500_DKD/rid-rjvqthvzaqzqknfujcjkrjlihbrohetx/cjp-24/hits-706",
                        "#text": "Technology Project Group"
                      },
                      "ty": "organic",
                      "loc": {
                        "-cty": "Norwalk",
                        "-st": "CT",
                        "-postal": "06851",
                        "-country": "US",
                        "#text": "Norwalk, CT"
                      },
                      "ls": "2013-02-01T23:11:14Z",
                      "dp": "2013-02-01T07:40:25Z",
                      "e": "ive experience designing, implementing, customizing and integrating the Salesforce.com Services. SKILLS &quot; TECHNOLOGIES bull; Languages: Java, JSP, VisualForce, Apex, SQL, PL/SQL, HTML, JavaScript, CSS, PHP CERTIFICATION bull;..."
                    }
                  ]
                }
              }
            };
        var shJobs = jobsJSON.shrs.rs.r;
        var jobPosts = [];
        if(shJobs){
            var jobs = shJobs;
            for(var i = 0, len =  jobs.length; i < len; i++){
                var jobPost = {
                    date: moment(new Date(jobs[i].dp)).format("MMM D, YYYY"),
                    url:jobs[i].src["-url"],
                    title:jobs[i].jt,
                    shortDescription: utils.trunc(jobs[i].e, 100, true),
                    description:jobs[i].e,
                    location:jobs[i].loc["#text"],
                    searchProvider1:'simplyhired',
                    searchProvider2:jobs[i].src["#text"],
                    poster: jobs[i].cn["#text"] ? jobs[i].cn["#text"] : "N/A",
                    posterUrl:"",
                    type: "N/A"                
                };
                jobPosts.push(jobPost);
            }
        }
        return { jobs: jobPosts};
};	