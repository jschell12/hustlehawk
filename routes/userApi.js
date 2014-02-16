/**
 * 
 */

module.exports = function(serverContext){
  var expressApp = serverContext.expressApp;
  var passportUtils = serverContext.auth.passportUtils;
  var mongodb = serverContext.data.mongodb;

  // User Profile
  expressApp.get('/api/me', function(req, res){ 
      if(req.user){
        var user = req.user;
        delete user.skills;
        return res.send(passportUtils.createResponse(null, req.user));  
      }
      return res.send(passportUtils.createResponse("Not authenticated.", null));
  });

  expressApp.put('/api/me', function(req, res){     
      console.log(req);
      return res.send({});
  });


  // User Skills
  expressApp.get('/api/me/skills', function(req, res){ 
      if(req.user){
        return res.send(passportUtils.createResponse(null, req.user.skills));  
      }
      return res.send(passportUtils.createResponse("Not authenticated.", null));
  });

  expressApp.put('/api/me/skills', function(req, res){  
    if(req.body && req.user){
      var userId = req.user.id;
      var newSkills = req.body.models;

      mongodb.OauthIdentity.findOne( {userId: userId } , function (err, linkedinUser) {
        var lSkills = linkedinUser.skills; 

        for(var i = 0, len1 = lSkills.length; i < len1; i++){
          for(var j = 0, len2 = newSkills.length; j < len2; j++){
            if(lSkills[i].id === newSkills[j].id){
              lSkills[i].toggled = newSkills[j].toggled;
              console.log(lSkills[i], newSkills[j])
            }
          }
        }


        // TODO - Find out why I have to set the array to [] first.
        linkedinUser.skills = [];
        linkedinUser.skills = lSkills;
        linkedinUser.metadata.updateDate = new Date();
        linkedinUser.save(function(err, updatedLinkedInProfile){
          if(err){
            res.send(err);
          }else{
            res.send(updatedLinkedInProfile.skills);
          }
        });
      });
    }   
  });
};