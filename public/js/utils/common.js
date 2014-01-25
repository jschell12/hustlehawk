(function(app, $, undefined) {
    app.Utils = app.Utils || {};
	app.Utils.Common = {
		compareObjects: function(obj1, obj2){
			var self = this;
			return JSON.stringify(obj1) === JSON.stringify(obj2); // TODO:need to include json2 lib for backwards ie compatibility.
		},

	    copyObject: function(obj){
			return JSON.parse(JSON.stringify(obj));
		},		
		_toObject : function(arr) {
			var self = this;
		  var rv = {};
		  for (var i = 0; i < arr.length; ++i)
		    if (arr[i] !== undefined) rv[i] = arr[i];
		  return rv;
		}
	};
})(window.app = window.app || {}, jQuery);


