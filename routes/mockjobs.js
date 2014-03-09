module.exports = function(app){
	var sh = require("../modules/mocks/mocksimplyhiredapi");    
	var cj = require("../modules/mocks/mockcareerjetapi");    
	var cb = require("../modules/mocks/mockcareerbuilderapi"); 
	var lu = require("../modules/mocks/mocklinkupapi");
    
    app.get('/api/mockjobs/simplyhired', function(req, res){
        res.json(sh.getMockJobs());
    });
    
    app.get('/api/mockjobs/careerjet', function(req, res){
            res.json(cj.getMockJobs());
    });
    
    app.get('/api/mockjobs/careerbuilder', function(req, res){
            res.json(cb.getMockJobs());
    });
    
    app.get('/api/mockjobs/linkup', function(req, res){
            res.json(lu.getMockJobs());
    });    
};