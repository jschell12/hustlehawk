
module.exports = function(serverContext){
    var util = require('util');    
    var expressApp = serverContext.expressApp;   
    var mongodb = serverContext.data.mongodb;


    expressApp.get('/api/geo/mylocation', function(req, res){
        var lat = req.query.lat;
        var lon = req.query.lon;

        if(lat && lon){
            mongodb.GeoLocation.findOne( { latitude: lat, longitide: lon }, function (err, results) { 
                res.json(results);
            });         
        }
        res.json([]); 
    });    
};