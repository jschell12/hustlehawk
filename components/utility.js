<<<<<<< HEAD
=======


exports.createFacets = function(jobs){
    return facets;
}	

>>>>>>> e82feb2262864c479beb1b2f51141ba39299742f
exports.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

exports.toJSON = function(obj){
    var objJSON = null;
    if(obj){
        objJSON = JSON.stringify(obj);
    }
    return objJSON;
};

exports.trunc =  function(s, n,useWordBoundary){
     var toLong = s.length>n,
         s_ = toLong ? s.substr(0,n-1) : s;
     s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
     return  toLong ? s_ + '&hellip;' : s_;
};	
