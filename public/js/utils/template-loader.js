(function(app, $, undefined){
	app.Utils = app.Utils || {};

	var TemplateLoader = app.Utils.TemplateLoader = function(transport){
		var self = this;
		self._transport = transport;
	}


	TemplateLoader.prototype = {
		load: function(urls, cb){
			var self = this;
			if(urls.length > 1){
				self._transport.load({
				  url: urls[0]
				},function(html){
				  $("body").append(html);
				  urls.splice(0,1);
				  self.load(urls, cb);
				});
			}else{				
				self._transport.load({
				  url: urls[0]
				},function(html){
				  $("body").append(html);
				  cb();
				});
			}
		}
	};
})(window.app = window.app || {}, jQuery);