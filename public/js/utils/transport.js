(function(app, $, kendo, undefined){
    app.Utils = app.Utils || {};

	var Transport = app.Utils.Transport = function() {
        var self = this;		
        return self;
    };

    Transport.prototype = {
    	init: function(){

    	},
    	delete: function(options, cb){ 		
    		var self = this;
    		var url = options.url || "";
    		var params = options.params || {};
    		
    		$.ajax({
    			url: url,
    			type: "DELETE",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
    			data: kendo.stringify(params)
    		}).done(cb);
    	},
    	_isEmpty: function (obj) {
            if(!obj){
                return false;
            }
		    for(var prop in obj) {
		        if(obj.hasOwnProperty(prop)){
		            return false;
		    	}
		    }
		    return true;
		},
    	get: function(options, cb){    		
    		var self = this;
    		var url = options.url || "";
    		var params = options.params || {};
    		if(self._isEmpty(params)){
            	params =  "";
            }
    		$.ajax({
    			url: url,
    			type: "GET",
                dataType: "json",
    			data: self._toURLParams(params)
    		}).done(cb);
    	},
    	load: function(options, cb){
    		var self = this;
    		var url = options.url || "";
    		var params = options.params || {};
    		if(self._isEmpty(params)){
            	params =  "";
            }
    		$.ajax({
    			url: url,
    			type: "GET",
    			dataType: "HTML",
    			data: self._toURLParams(params)
    		}).done(cb);
    	},
    	post: function(options, cb){
    		var self = this;
    		var url = options.url || "";
    		var params = options.params || {};
            
    		$.ajax({
    			url: url,
    			type: "POST",
    			dataType: "json",
                contentType: "application/json; charset=UTF-8",
    			data: kendo.stringify(params)
    		}).done(cb);
    	},
		put: function(options, cb){
    		var self = this;
    		var url = options.url || "";
    		var params = options.params || {};
    		
    		$.ajax({
    			url: url,
    			type: "PUT",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
    			data: kendo.stringify(params)
    		}).done(cb);
		},
        _toURLParams: function(obj) {
            var parts = [];
            obj = obj || null;
            if(!obj){
            	return "";
            }
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var item = obj[key];
                    if (Object.prototype.toString.call(item) === '[object Array]') {
                        for (var i = 0; i < item.length; i++) {
                            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(item[i]));
                        }
                    } else {
                        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(item));
                    }
                }
            }
            return parts.join('&');
        }
    };

    return Transport;
})(window.app = window.app || {}, jQuery, kendo);