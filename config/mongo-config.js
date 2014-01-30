
module.exports = {
	localhost:{
		uri: "mongodb://127.0.0.1/jobs",
		options: {
	        db: { safe: true },
	        user: "jobs-web",
	        pass: "6yhhJ8DdU25yr1X2Xki67f7JDINxd7q5"		
		}
	},
	development: {
		uri: "mongodb://127.0.0.1/jobs",
		options: {
	        db: { safe: true },
	        user: "jobs-web",
	        pass: "6yhhJ8DdU25yr1X2Xki67f7JDINxd7q5"		
		}
	}
};