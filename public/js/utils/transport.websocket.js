(function(app, $, undefined){
    app.Utils = app.Utils || {};

    var Transport = app.Utils.WebSocketTransport = function(socket) {
        var self = this;
        self._socket = socket;
        return self;
    };

    Transport.prototype = {
        init: function(){

        },
        receiveOn: function(event, fn){
            var self = this;
            self._socket.on(event, fn);           
        },
        send: function(event, params){
            var self = this;          
            self._socket.emit(event, params);            
        }
    };

    return Transport;
})(window.app = window.app || {}, jQuery);