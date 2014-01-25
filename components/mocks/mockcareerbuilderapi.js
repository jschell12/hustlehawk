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


exports.getMockJobs =  function(searchTerms, location){
	var utils = require("../utility");
    var moment = require('moment');
    console.log(searchTerms + " " + location);
    var jobsJSON = {
          "ResponseJobSearch": {
            "TimeResponseSent": "2/1/2013 9:36:52 PM",
            "TimeElapsed": "0.2963487",
            "TotalPages": "3",
            "TotalCount": "53",
            "FirstItemIndex": "1",
            "LastItemIndex": "25",
            "Results": {
              "JobSearchResult": [
                {
                  "Company": "Experis",
                  "CompanyDID": "c7g8dw6bpyf3tnvfb7t",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C7G8DW6BPYF3TNVFB7T/Experis/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3J7V36BW3R3083KY06",
                  "OnetCode": "15-1031.00",
                  "ONetFriendlyTitle": "Computer Software Engineers, Applications",
                  "DescriptionTeaser": ", PL/SQL, HTML, JavaScript, CSS, PHP CERTIFICATION \" Salesforce.com Certified Administrator, Developer ... ",
                  "Distance": "12 miles",
                  "EmploymentType": "Contractor",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3J7V36BW3R3083KY06",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3J7V36BW3R3083KY06&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Norwalk",
                  "LocationLatitude": "41.11366",
                  "LocationLongitude": "-73.40765",
                  "PostedDate": "2/1/2013",
                  "Pay": "$55.00 - $90.00/hour",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3J7V36BW3R3083KY06",
                  "JobTitle": "Salesforce Architect (  REMOTELY)",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/5W/MXN8CC6SJBV7Z2C9S5W.jpg"
                },
                {
                  "Company": "Kelly IT Resources",
                  "CompanyDID": "c8c0lk65033gfh0d2cf",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C8C0LK65033GFH0D2CF/Kelly-IT-Resources/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3J5T066VKMMDZ4FW1N",
                  "OnetCode": "15-1099.02",
                  "ONetFriendlyTitle": "Computer Systems Engineers/Architects",
                  "DescriptionTeaser": "���� Languages: Java, JSP, VisualForce, Apex, SQL, PL/SQL, HTML, JavaScript, CSS, PHPCERTIFICATION���Salesforce ... ",
                  "Distance": "12 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3J5T066VKMMDZ4FW1N",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3J5T066VKMMDZ4FW1N&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Norwalk",
                  "LocationLatitude": "41.11366",
                  "LocationLongitude": "-73.40765",
                  "PostedDate": "2/1/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3J5T066VKMMDZ4FW1N",
                  "JobTitle": "IT79 - Systems Architect",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/RT/MR60FS70KZYT8D0BQRT.jpg"
                },
                {
                  "Company": "Kforce Technology",
                  "CompanyDID": "chn42x5vt1w3t20jrly",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/CHN42X5VT1W3T20JRLY/Kforce-Technology/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3G19877K8C0GFTCZR9",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": "Excellent knowledge of use of JavaScriptExcellent knowledge of JavaScript for rapid prototyping purposes ... ",
                  "Distance": "19 miles",
                  "EmploymentType": "Contractor",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3G19877K8C0GFTCZR9",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3G19877K8C0GFTCZR9&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Stamford",
                  "LocationLatitude": "41.05182",
                  "LocationLongitude": "-73.54223",
                  "PostedDate": "2/1/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3G19877K8C0GFTCZR9",
                  "JobTitle": "Web Developer - Interaction Developer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/XH/MWH3LK6Z6Y76N3GJ4XH.jpg"
                },
                {
                  "Company": "Kforce Technology",
                  "CompanyDID": "chn42x5vt1w3t20jrly",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/CHN42X5VT1W3T20JRLY/Kforce-Technology/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3H6XJ6V3C61KWPTRMW",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": "Extensive work with JavaScript and JS Frameworks (like JQuery, and DoJo) and work with JS micro frameworks ... ",
                  "Distance": "19 miles",
                  "EmploymentType": "Contractor",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3H6XJ6V3C61KWPTRMW",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3H6XJ6V3C61KWPTRMW&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Stamford",
                  "LocationLatitude": "41.05182",
                  "LocationLongitude": "-73.54223",
                  "PostedDate": "2/1/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3H6XJ6V3C61KWPTRMW",
                  "JobTitle": "Sr. UX Developer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/XH/MWH3LK6Z6Y76N3GJ4XH.jpg"
                },
                {
                  "Company": "Lloyd Staffing",
                  "CompanyDID": "c8f2dx6xf0gpxbtl6gl",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C8F2DX6XF0GPXBTL6GL/Lloyd-Staffing/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "JHQ3066LHV4QJG9L688",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": " SKILLS YOU'LL WANT - AND NEED:HTML (various versions)�CSSJavaScript �PHPMy SQL (a PLUS)�Photoshop ... ",
                  "Distance": "19 miles",
                  "EmploymentType": "Full-Time/Part-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JHQ3066LHV4QJG9L688",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JHQ3066LHV4QJG9L688&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "NY - Hauppauge",
                  "LocationLatitude": "40.8179",
                  "LocationLongitude": "-73.2091",
                  "PostedDate": "2/1/2013",
                  "Pay": "$22.00 - $25.00/hour",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JHQ3066LHV4QJG9L688",
                  "JobTitle": "Web Developer/Designer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/M3/MVM2555YXQCLVCGFQM3.jpg"
                },
                {
                  "Company": "Adecco Technical",
                  "CompanyDID": "c8e7bp6cdrbv3wbxh90",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C8E7BP6CDRBV3WBXH90/Adecco-Technical/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3H1RP61G4KD5N1DVG2",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": ", JSP, VisualForce, Apex, SQL, PL/SQL, HTML, JavaScript, CSS, PHPCERTIFICATION� Salesforce.com Certified ... ",
                  "Distance": "11 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3H1RP61G4KD5N1DVG2",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3H1RP61G4KD5N1DVG2&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - norwalk",
                  "LocationLatitude": "41.1388",
                  "LocationLongitude": "-73.4037",
                  "PostedDate": "1/31/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3H1RP61G4KD5N1DVG2",
                  "JobTitle": "Front End Developer - Salesforce.com",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/M2/MRP0R75ZP0PKRZHN1M2.jpg"
                },
                {
                  "Company": "CapTech Consulting",
                  "CompanyDID": "c7x6666hvks67v14bqf",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C7X6666HVKS67V14BQF/CapTech-Consulting/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "JB70F565NMZB9B9TD2D",
                  "OnetCode": "15-1031.00",
                  "ONetFriendlyTitle": "Computer Software Engineers, Applications",
                  "DescriptionTeaser": ", SQL, HTML, CSS, JavaScript, UNIX, Windows, scripting languages, rules engines, point of sale and ... ",
                  "Distance": "19 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JB70F565NMZB9B9TD2D",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JB70F565NMZB9B9TD2D&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Stamford",
                  "LocationLatitude": "41.05182",
                  "LocationLongitude": "-73.54223",
                  "PostedDate": "1/31/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JB70F565NMZB9B9TD2D",
                  "JobTitle": "JAVA DEVELOPER-JAVA/ORACLE/IBM DEVELOPER (NATIONAL)",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/V7/I8B2C665H36GD05PLV7.gif"
                },
                {
                  "Company": "CapTech Consulting",
                  "CompanyDID": "c7x6666hvks67v14bqf",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C7X6666HVKS67V14BQF/CapTech-Consulting/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "JB70KL705XGSNDTTZY0",
                  "OnetCode": "15-1031.00",
                  "ONetFriendlyTitle": "Computer Software Engineers, Applications",
                  "DescriptionTeaser": ", SQL, HTML, CSS, JavaScript, UNIX, Windows, scripting languages, rules engines, point of sale and ... ",
                  "Distance": "15 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JB70KL705XGSNDTTZY0",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JB70KL705XGSNDTTZY0&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - New Haven",
                  "LocationLatitude": "41.30713",
                  "LocationLongitude": "-72.92498",
                  "PostedDate": "1/31/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JB70KL705XGSNDTTZY0",
                  "JobTitle": "JAVA DEVELOPER-JAVA/ORACLE/IBM DEVELOPER (NATIONAL)",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/V7/I8B2C665H36GD05PLV7.gif"
                },
                {
                  "Company": "Adecco Technical",
                  "CompanyDID": "c8e7bp6cdrbv3wbxh90",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C8E7BP6CDRBV3WBXH90/Adecco-Technical/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3F7NT607K94KJBVR7P",
                  "OnetCode": "15-1031.00",
                  "ONetFriendlyTitle": "Computer Software Engineers, Applications",
                  "DescriptionTeaser": ", PL/SQL, HTML, JavaScript, CSS, PHPCERTIFICATION� Salesforce.com Certified Administrator, Developer ... ",
                  "Distance": "11 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3F7NT607K94KJBVR7P",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3F7NT607K94KJBVR7P&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - norwalk",
                  "LocationLatitude": "41.1388",
                  "LocationLongitude": "-73.4037",
                  "PostedDate": "1/31/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3F7NT607K94KJBVR7P",
                  "JobTitle": "Sr. Principal Solutions Architect: Salesforce.com",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/M2/MRP0R75ZP0PKRZHN1M2.jpg"
                },
                {
                  "Company": "EDI Specialists",
                  "CompanyDID": "c8b6c5666njb898j1pm",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C8B6C5666NJB898J1PM/EDI-Specialists/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3H2YD6G3YLFN6VNHBL",
                  "OnetCode": "15-1051.00",
                  "ONetFriendlyTitle": "Computer Systems Analysts",
                  "DescriptionTeaser": " relationship skills. 			Experience with leading projects 			Experience with Java, Javascript, C, C++, SQL, AIX ... ",
                  "Distance": "3 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3H2YD6G3YLFN6VNHBL",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3H2YD6G3YLFN6VNHBL&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Stratford",
                  "LocationLatitude": "41.1871",
                  "LocationLongitude": "-73.1396",
                  "PostedDate": "1/31/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3H2YD6G3YLFN6VNHBL",
                  "JobTitle": "Senior Analyst IT Systems Design and Development",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/2X/MR10L367V61W51V742X.jpg"
                },
                {
                  "Company": "Cablevision Systems Corporation",
                  "CompanyDID": "c8c1ty627x5hxgnj7w0",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C8C1TY627X5HXGNJ7W0/Cablevision-Systems-Corporation/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "JHR81F5YV0408ZP348P",
                  "OnetCode": "15-1031.00",
                  "ONetFriendlyTitle": "Computer Software Engineers, Applications",
                  "DescriptionTeaser": ", EJB, JSF, Weblogic, XML, VXML, Hibernate, JavaScript, Unix/Linux, Unix Shell Scripting, Windows, .NET ... ",
                  "Distance": "27 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JHR81F5YV0408ZP348P",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JHR81F5YV0408ZP348P&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "NY - Bethpage",
                  "LocationLatitude": "40.7426",
                  "LocationLongitude": "-73.4861",
                  "PostedDate": "1/31/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JHR81F5YV0408ZP348P",
                  "JobTitle": "Contact Center Technology Engineer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/Q2/IN48H56T4H73D9NRFQ2.gif"
                },
                {
                  "Company": "Gannett Co., Inc.",
                  "CompanyDID": "c336b62t2rpc7tyrds",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C336B62T2RPC7TYRDS/Gannett-Co-Inc/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "JHM0C96BHGXCYJBVGK8",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": ".     Demonstrated experience with iOS SDK is a must.     Demonstrated experience with javascript, XHMTL and HTML5 ... ",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JHM0C96BHGXCYJBVGK8",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JHM0C96BHGXCYJBVGK8&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "US-Nationwide",
                  "LocationLatitude": "0",
                  "LocationLongitude": "0",
                  "PostedDate": "1/30/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JHM0C96BHGXCYJBVGK8",
                  "JobTitle": "Mobile iOS Developer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/93/MXE6216WJPDQP8M8K93.jpg"
                },
                {
                  "DID": "JB74YD7765NP2J5W1X5",
                  "OnetCode": "11-3021.00",
                  "ONetFriendlyTitle": "Computer and Information Systems Managers",
                  "DescriptionTeaser": " competency in C# developmentHigh competency in ASP.net frameworkDeep knowledge of JavaScript, HTML5, CSS ... ",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JB74YD7765NP2J5W1X5",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JB74YD7765NP2J5W1X5&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "US-Nationwide",
                  "LocationLatitude": "0",
                  "LocationLongitude": "0",
                  "PostedDate": "1/30/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JB74YD7765NP2J5W1X5",
                  "JobTitle": "Development Manager - Workflow"
                },
                {
                  "DID": "JB75V0606LTDNVLTX6V",
                  "OnetCode": "11-3021.00",
                  "ONetFriendlyTitle": "Computer and Information Systems Managers",
                  "DescriptionTeaser": " competency in C# developmentHigh competency in ASP.net frameworkDeep knowledge of JavaScript, HTML5, CSS ... ",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JB75V0606LTDNVLTX6V",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JB75V0606LTDNVLTX6V&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "US-Nationwide",
                  "LocationLatitude": "0",
                  "LocationLongitude": "0",
                  "PostedDate": "1/30/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JB75V0606LTDNVLTX6V",
                  "JobTitle": "Development Manager - Workflow"
                },
                {
                  "DID": "JHS51K7570FBLFZBX50",
                  "OnetCode": "11-3021.00",
                  "ONetFriendlyTitle": "Computer and Information Systems Managers",
                  "DescriptionTeaser": " competency in C# developmentHigh competency in ASP.net frameworkDeep knowledge of JavaScript, HTML5, CSS ... ",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JHS51K7570FBLFZBX50",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JHS51K7570FBLFZBX50&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "US-Nationwide",
                  "LocationLatitude": "0",
                  "LocationLongitude": "0",
                  "PostedDate": "1/30/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JHS51K7570FBLFZBX50",
                  "JobTitle": "Development Manager - Workflow"
                },
                {
                  "Company": "Talon",
                  "CompanyDID": "c8e34t709hntwpct3wy",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C8E34T709HNTWPCT3WY/Talon/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3G86P6TG0778M71C3Q",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": " experience-Strong HTML/ColdFusion/CSS/JavaScript/AJAX and JQuery Experience-2+ years of ASP.NET, C# ... ",
                  "Distance": "17 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3G86P6TG0778M71C3Q",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3G86P6TG0778M71C3Q&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Danbury",
                  "LocationLatitude": "41.3768",
                  "LocationLongitude": "-73.4601",
                  "PostedDate": "1/28/2013",
                  "Pay": "$70k/year",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3G86P6TG0778M71C3Q",
                  "JobTitle": "Web Developer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/DV/MRK3PQ6L3TMSRQJBKDV.jpg"
                },
                {
                  "Company": "Belimo Americas",
                  "DID": "JHV3BS6W5XKLY62NY6L",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": ".�Experience with CSS3, JavaScript, HTML5, CS5 Suite, and MS Office.�Experience in developing user ... ",
                  "Distance": "17 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JHV3BS6W5XKLY62NY6L",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JHV3BS6W5XKLY62NY6L&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Danbury",
                  "LocationLatitude": "41.39268",
                  "LocationLongitude": "-73.45359",
                  "PostedDate": "1/28/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JHV3BS6W5XKLY62NY6L",
                  "JobTitle": "Website Specialist"
                },
                {
                  "Company": "Career Developers, Inc.",
                  "CompanyDID": "chm8d06vlsk8h4lpp0y",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/CHM8D06VLSK8H4LPP0Y/Career-Developers-Inc/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "JHM52W71H9BHT0QZ432",
                  "OnetCode": "15-1021.00",
                  "ONetFriendlyTitle": "Computer Programmers",
                  "DescriptionTeaser": " SQL-Server 2005 and higher), ADO, JavaScript    Must have working knowledge of JQuery, AJAX, HTML ... ",
                  "Distance": "20 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JHM52W71H9BHT0QZ432",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JHM52W71H9BHT0QZ432&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Stamford",
                  "LocationLatitude": "41.0489",
                  "LocationLongitude": "-73.5575",
                  "PostedDate": "1/27/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JHM52W71H9BHT0QZ432",
                  "JobTitle": "Perl SQL Developer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/0P/MW92M45YDQBGTXCXB0P.jpg"
                },
                {
                  "Company": "WESTMED Medical Group",
                  "CompanyDID": "c7x2jy69vbldqqzsy6p",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C7X2JY69VBLDQQZSY6P/WESTMED-Medical-Group/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "JHM1W769GHNR859K9PD",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": ", JavaScript, CSS    Experience in SEO (Search Engine Optimization), Google analytics, AdWords a plus ... ",
                  "Distance": "29 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JHM1W769GHNR859K9PD",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JHM1W769GHNR859K9PD&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "NY - White Plains",
                  "LocationLatitude": "41.0555",
                  "LocationLongitude": "-73.7433",
                  "PostedDate": "1/26/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JHM1W769GHNR859K9PD",
                  "JobTitle": "Web Developer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/20/MJK10065VLQLBBNK920.jpg"
                },
                {
                  "Company": "Connolly - IT",
                  "CompanyDID": "c8c5996q6zfptgbpwzk",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C8C5996Q6ZFPTGBPWZK/Connolly-IT/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3I0L76PLJSS2RN5NY1",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": ", JQUERY, JavaScript, HTML, XSL, CAML and CSS.  �� Experience in development of SharePoint workflows ... ",
                  "Distance": "13 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3I0L76PLJSS2RN5NY1",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3I0L76PLJSS2RN5NY1&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Wilton",
                  "LocationLatitude": "41.19529",
                  "LocationLongitude": "-73.43618",
                  "PostedDate": "1/25/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3I0L76PLJSS2RN5NY1",
                  "JobTitle": "SharePoint Developer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/DC/Mwz3H76TMM3GMY39HDC.png"
                },
                {
                  "Company": "Experis",
                  "CompanyDID": "c7g8dw6bpyf3tnvfb7t",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C7G8DW6BPYF3TNVFB7T/Experis/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3J6W46PHZQB7CCSZF2",
                  "OnetCode": "15-1071.00",
                  "ONetFriendlyTitle": "Network and Computer Systems Administrators",
                  "DescriptionTeaser": " of the following scripting languages Windows Host Scripting, VBScript, JavaScript Must be proficient ... ",
                  "Distance": "4 miles",
                  "EmploymentType": "Contractor",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3J6W46PHZQB7CCSZF2",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3J6W46PHZQB7CCSZF2&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Ridgefield",
                  "LocationLatitude": "41.14187",
                  "LocationLongitude": "-73.25121",
                  "PostedDate": "1/25/2013",
                  "Pay": "$45.00 - $55.00/hour",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3J6W46PHZQB7CCSZF2",
                  "JobTitle": "System Lead",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/5W/MXN8CC6SJBV7Z2C9S5W.jpg"
                },
                {
                  "Company": "Randstad Technologies",
                  "CompanyDID": "c8c5r86m6f82xgt982q",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C8C5R86M6F82XGT982Q/Randstad-Technologies/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3H0R16V1S5ZJMHBFJ5",
                  "OnetCode": "15-1071.00",
                  "ONetFriendlyTitle": "Network and Computer Systems Administrators",
                  "DescriptionTeaser": " languages � Windows Host Scripting, VBScript, JavaScript����� Must be proficient with hands on skills in ... ",
                  "Distance": "17 miles",
                  "EmploymentType": "Contractor",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3H0R16V1S5ZJMHBFJ5",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3H0R16V1S5ZJMHBFJ5&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Ridgefield",
                  "LocationLatitude": "41.3064",
                  "LocationLongitude": "-73.5024",
                  "PostedDate": "1/24/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3H0R16V1S5ZJMHBFJ5",
                  "JobTitle": "Citrix Server Admin",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/PW/MXK1Q0605RZNLJXM1PW.jpg"
                },
                {
                  "Company": "Unilever",
                  "CompanyDID": "c7g0tn61rf69hm9b2xh",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C7G0TN61RF69HM9B2XH/Unilever/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "JHL3J85ZWX66Q384YTF",
                  "OnetCode": "15-1099.01",
                  "ONetFriendlyTitle": "Software Quality Assurance Engineers and Testers",
                  "DescriptionTeaser": " Javascript and HTML.� Knowledge of Confirmit, Jscript.net, Compusense At-Hand, online video streaming ... ",
                  "Distance": "4 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JHL3J85ZWX66Q384YTF",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JHL3J85ZWX66Q384YTF&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Trumbull",
                  "LocationLatitude": "41.2599",
                  "LocationLongitude": "-73.2099",
                  "PostedDate": "1/24/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JHL3J85ZWX66Q384YTF",
                  "JobTitle": "Senior Technician",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/3T/MJ759J6GW2FGW6W1K3T.jpg"
                },
                {
                  "Company": "s�com",
                  "CompanyDID": "c7h6kz6qvhhck581fk5",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C7H6KZ6QVHHCK581FK5/s�com/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "JHN7W15WRGZZL7K4XGD",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": " technologies (HTML5, CSS3, and JavaScript) and will be able to show examples of sophisticated front-end ...   JavaScript and CSS Frameworks (like...",
                  "Distance": "19 miles",
                  "EmploymentType": "Full-Time",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=JHN7W15WRGZZL7K4XGD",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=JHN7W15WRGZZL7K4XGD&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Stamford",
                  "LocationLatitude": "41.05182",
                  "LocationLongitude": "-73.54223",
                  "PostedDate": "1/24/2013",
                  "Pay": "N/A",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=JHN7W15WRGZZL7K4XGD",
                  "JobTitle": "JavaScript Developer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/36/I8D08V6HB8DDWYKQ536.gif"
                },
                {
                  "Company": "Robert Half Technology",
                  "CompanyDID": "c03dk1mk0f1wyymypf",
                  "CompanyDetailsURL": "http://www.careerbuilder.com/Jobs/Company/C03DK1MK0F1WYYMYPF/Robert-Half-Technology/?sc_cmp1=13_JobRes_ComDet",
                  "DID": "J3J7JD5XVMK5ZCCWMHP",
                  "OnetCode": "15-1099.04",
                  "ONetFriendlyTitle": "Web Developers",
                  "DescriptionTeaser": " include HTML, JavaScript, CSS3, XML and AJAX. Any PHP and ASP development experience a plus along with SQL ... ",
                  "Distance": "19 miles",
                  "EmploymentType": "Contractor",
                  "JobDetailsURL": "http://api.careerbuilder.com/v1/joblink?TrackingID=CGC36FSG&DID=J3J7JD5XVMK5ZCCWMHP",
                  "JobServiceURL": "https://api.careerbuilder.com/v1/job?DID=J3J7JD5XVMK5ZCCWMHP&DeveloperKey=WDT828C66K0WSKY90JZC",
                  "Location": "CT - Stamford",
                  "LocationLatitude": "41.0531",
                  "LocationLongitude": "-73.5379",
                  "PostedDate": "1/23/2013",
                  "Pay": "$32.00 - $40.00/hour",
                  "SimilarJobsURL": "http://www.careerbuilder.com/Jobs/SimilarJobs.aspx?ipath=JELO&job_did=J3J7JD5XVMK5ZCCWMHP",
                  "JobTitle": "Programmer Analyst - UI Web Developer",
                  "CompanyImageURL": "http://emj.icbdr.com/MediaManagement/WT/IN025R77ZKT64KRFXWT.gif"
                }
              ]
            }
          }
        };
        
        var cbJobs = jobsJSON.ResponseJobSearch.Results.JobSearchResult;
        var jobPosts = [];
        if(cbJobs){
            var jobs = cbJobs;
            for(var i = 0, len =  jobs.length; i < len; i++){
                var jobPost = {
                    date: moment(new Date(jobs[i].PostedDate)).format("MMM D, YYYY"),
                    url:jobs[i].JobDetailsURL,
                    title:jobs[i].JobTitle,
                    shortDescription: utils.trunc(jobs[i].DescriptionTeaser, 100, true),
                    description:jobs[i].DescriptionTeaser,
                    location: _formatLocation(jobs[i].Location),
                    searchProvider1:'careerbuilder',
                    searchProvider2:'N/A',
                    poster: jobs[i].Company ? jobs[i].Company : "N/A",
                    posterUrl:jobs[i].CompanyDetailsURL,
                    type: "N/A"                
                };
                jobPosts.push(jobPost);
            }
        }
        return { jobs: jobPosts};
};	