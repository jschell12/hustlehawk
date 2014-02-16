
module.exports = function(serverContext){
    var util = require('util');
    var EventEmitter = require('events').EventEmitter;
    var emitter = new EventEmitter();
    
    var expressApp = serverContext.expressApp;
    var indeed = serverContext.api.indeed;
    var simplyHired = serverContext.api.simplyHired;
    var careerJet = serverContext.api.careerJet;
    var careerBuilder = serverContext.api.careerBuilder;
    var linkUp = serverContext.api.linkUp;
    var mongodb = serverContext.data.mongodb;


    expressApp.get('/api/jobs/indeed', function(req, res){
        var keywords = req.query.keywords || "";
        var location = req.query.location;
        var user = req.user;
        if(user && !keywords){
            keywords = _indeedQuery(user.skills, 5);
        }else{
            var keywordParts = keywords.split(" ");
            keywords = keywordParts.join(" and ");
        }

        indeed.search(encodeURIComponent(keywords), location, function(results){           
            res.json(results);
        });         
    });

    
    expressApp.get('/api/jobs/careerbuilder', function(req, res){
        var keywords = req.query.keywords;
        var location = req.query.location;
        var user = req.user;
        if(user && !keywords){
            keywords = _careerBuilderQuery(user.skills);
        }

        careerBuilder.search(keywords, location, function(results){
            res.json(results);
        });         
    });
    
    /*
     * Since Careerjet doesn't allow us to use all of the user's
     * Linkedin skills, we'll just user the first skill in the list.
     **************************************************************/
    expressApp.get('/api/jobs/careerjet', function(req, res){
        var keywords = req.query.keywords;
        var location = req.query.location;
        var user = req.user;
        if(user && !keywords){
            keywords = _careerJetQuery(user.skills);
        }
        careerJet.search(encodeURIComponent(keywords), location, function(results){
            res.json(results);
        });
    });


    expressApp.get('/api/jobs/linkup', function(req, res){
        var keywords = req.query.keywords;
        var location = req.query.location;
        var user = req.user;
        if(user && !keywords){
            keywords = _linkupQuery(user.skills);
        }

        linkUp.search(encodeURIComponent(keywords), location, function(results){
            res.json(results);
        });         
    });

    expressApp.get('/api/jobs/simplyhired', function(req, res){
        var keywords = req.query.keywords || keywords;
        var location = req.query.location;
        var user = req.user;
        if(user && !keywords){
            keywords = _simplyHired(user.skills);
        }
        // keyword format: item1 OR item2 OR ...
        simplyHired.search(encodeURIComponent(keywords), location, function(results){
            res.json(results);
        });         
    });


    // TODO - move this into /components/indeedapi.js
    // Factorial word pairing   
    function _indeedQuery(skills, limit){
        var skillsLen = skills.length;
        var skillsToggled = [];
        for(var i = 0, len = skillsLen; i < len; i++){
            if(skills[i].toggled){
                skillsToggled.push(skills[i]);
            }
        }

        var factorialLen = (len * (len - 1)) / 2;
        var skillsToggledLen = skillsToggled.length;
        var indeedSearchString = "";
        for(var i = 0, len = skillsToggledLen; i < len; i++){
            var word1 = skillsToggled[i].name;
            if((i + 1)< skillsToggledLen - 1){
                for(var j = i + 1, len2 = skillsToggledLen - 1; j < len2; j++){
                    var word2 = skillsToggled[j].name;                
                    indeedSearchString += "(" + word1 + " and " + word2 + ") or ";
                    if(j === limit){
                      indeedSearchString += "(" + word1 + ")";
                      return indeedSearchString;
                    }
                }
              
            }
          
          
            indeedSearchString += "(" + word1 + ")";
            if((i < len - 1)){
                indeedSearchString += " or ";
            }
        }
        return indeedSearchString;
    }

    function _simplyHired(skills){
        var skillsLen = skills.length;
        var skillsToggled = [];
        for(var i = 0, len = skillsLen; i < len; i++){
            if(skills[i].toggled){
                skillsToggled.push(skills[i].name);
            }
        }
        return skillsToggled.join(" OR ");
    }


    function _linkupQuery(skills){
        var skillsLen = skills.length;
        var skillsToggled = [];
        for(var i = 0, len = skillsLen; i < len; i++){
            if(skills[i].toggled){
                skillsToggled.push(skills[i].name);
            }
        }
        return skillsToggled.join(" ");
    }

    function _careerJetQuery(skills){
        var skillsLen = skills.length;
        var skillsToggled = [];
        for(var i = 0, len = skillsLen; i < len; i++){
            if(skills[i].toggled){
                skillsToggled.push(skills[i].name);
            }
        }
        return skillsToggled[0];
    }

    function _careerBuilderQuery(skills){
        var skillsLen = skills.length;
        var skillsToggled = [];
        for(var i = 0, len = skillsLen; i < len; i++){
            if(skills[i].toggled){
                skillsToggled.push(skills[i].name);
            }
        }
        return  skillsToggled.join(",");
    }


    function _getSkillNames(user){   
        var skillNames = []    
        try{
            skills = user.skills;
            for(var i = 0, len = skills.length; i < len ; i++){
                var skill = skills[i];
                if(skill.toggled){
                    skillNames.push(skill.name);
                }
            }
        }catch(ex){       
        }

        return skillNames;
    }
};