
/***
 * NOTE: You will have to set up your own users on your mongodb instance
 ********************************************************************************/

module.exports = {
	localhost:{
		uri: "mongodb://localhost/jobs",
		options: {
	        db: { safe: true },
	        user: "jobs-web",
	        pass: "6yhhJ8DdU25yr1X2Xki67f7JDINxd7q5"		
		}
	},
	development: {
		uri: "mongodb://localhost/jobs",
		options: {
	        db: { safe: true },
	        user: "jobs",
	        pass: "6yhhJ8DdU25yr1X2Xki67f7JDINxd7q5"		
		}
	}
};