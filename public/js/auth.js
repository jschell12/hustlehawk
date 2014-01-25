(function(app, $, kendo, undefined){
  app.Component = app.Component || {};

  var Auth = app.Component.Auth = function( pubsub, transport) {
    var self = this;
    self._pubsub = pubsub;
    self._transport = transport;
    return self;
  };

  Auth.prototype = {
    authenticate: function(cb){
      var self = this;
      self._transport.get({
        url: "/auth/is-authenticated"
      },function(data){
        cb(data);
      });
    },


    init: function(){
      var self = this;
     
      self.authenticate(function(data){
        if(data.user){            
          self._pubsub.trigger("authenticate", data.user);
        }else{
          self._pubsub.trigger("authenticate", null);
        }
      });
    },
  };

  return Auth;
})(window.app = window.app || {}, jQuery, kendo);
