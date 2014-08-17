// App Secrets for accessing Linkedin and Job APIs
// test
module.exports = {  
        test:{},
        localhost: {
                linkedin: {
                        LINKEDIN_API_KEY: "75omxcayu0gh8t",
                        LINKEDIN_SECRET_KEY: "iudRSTlu1rTUzGqK",
                        LINKEDIN_CALLBACK_URL : "http://localhost:4000/auth/linkedin/callback"  
                },
                careerbuilder: {
                        developerKey : "WDX954Z6FCN5X40YZLHQ"
                },
                careerjet: {},
                indeed: { 
                        publisherId : "9656496047255481"
                },
                linkup: {
                        apiKey : "370055E1B925D46C9D52904CCD41F4B2",
                        searchKey: "4299F0BBB53C01F7B644FA1CA040C860"
                },
                simplyhired: {}   
        },
        development: {
                linkedin: {
                        LINKEDIN_API_KEY: "7590eir6timkeg",
                        LINKEDIN_SECRET_KEY: "QwHBhlBuR43Brjy1",  
                        LINKEDIN_CALLBACK_URL : "http://hustlehawk.schellster.com/auth/linkedin/callback"
                },
                careerbuilder: {
                        developerKey : "WDX954Z6FCN5X40YZLHQ"
                },
                careerjet: {},
                indeed: {
                        publisherId: "9656496047255481"
                },
                linkup: {
                        apiKey : "370055E1B925D46C9D52904CCD41F4B2",
                        searchKey: "4299F0BBB53C01F7B644FA1CA040C860"
                },
                simplyhired: {}
        } 
};