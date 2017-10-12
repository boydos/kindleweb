(function($){
	ds = (typeof ds !== "undefined")?ds:{};
	ds.post = function (url,params,succFunc,errFunc) {
		return ds.postAndGet(url,params,succFunc,errFunc,"post");
	}
	ds.get = function (url,params,succFunc,errFunc) {
		return ds.postAndGet(url,params,succFunc,errFunc,"get");
	}
	ds.postAndGet =  function (url,params,succFunc,errFunc,method) {
		var deferred = $.Deferred();
		if(method !="get") {
			method ="post";
		}
		$.ajax({
	        "type" : method,
	        "url" : url,
	        "dataType" : "json",
	        "data" : params,
	        "success" : function (data) {
	            if(succFunc)succFunc(data);
	            deferred.resolve();
	        },
	        "error" : function (data) {
	        	if(errFunc)errFunc(data);
	        	deferred.reject();
	        }
		});
		return deferred.promise();
	};
	ds.isEmpty = function (value) {
		return value ==null||value.length==0;
	};
	ds.formatByteSize =function(size) {
		if(size <1024) {
			return size +"B"
		} else if (size <1024*1024) {
			return this.xround(size/1024,2) +"KB"
		} else if (size <1024*1024*1024) {
			return this.xround(size/(1024*1024),2) +"MB"
		} else if (size <1024*1024*1024*1024) {
			return this.xround(size/(1024*1024*1024),2) +"GB"
		} else {
			return this.xround(size/(1024*1024*1024*1024),2) +"TB"
		}
	},
	ds.round = function (x, num){
	    return Math.round(x * Math.pow(10, num)) / Math.pow(10, num) ;
	}
	ds.isEmail = function (email) {
		var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		return reg.test(email);
	}
	ds.changeToNV=function(data,name,value) {
		if(data==null||data.length==0)return [];
		var temp =[];
		for(var i in data) {
			var item=data[i];
			temp.push({"name":item[name],"value":item[value]});
		}
		return temp;
	}
})(jQuery);