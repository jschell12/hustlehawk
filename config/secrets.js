// App Secrets for accessing Linkedin and Job APIs 
// asdf
module.exports = { 
        test:{},
        localhost: {
                linkedin: {
                        LINKEDIN_API_KEY: "",
                        LINKEDIN_SECRET_KEY: "",
                        LINKEDIN_CALLBACK_URL : ""  
                },
                careerbuilder: {
                        developerKey : ""
                },
                careerjet: {},
                indeed: { 
                        publisherId : ""
                },
                linkup: {
                        apiKey : "",
                        searchKey: ""
                },  
                simplyhired: {}   
        },
        development: {
                linkedin: {
                        LINKEDIN_API_KEY: "",
                        LINKEDIN_SECRET_KEY: "",  
                        LINKEDIN_CALLBACK_URL : ""
                },
                careerbuilder: {
                        developerKey : ""
                },
                careerjet: {}, 
                indeed: {
                        publisherId: ""
                },
                linkup: {
                        apiKey : "",
                        searchKey: ""
                },
                simplyhired: {}
        }    
}; 