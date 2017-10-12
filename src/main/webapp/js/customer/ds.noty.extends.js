(function($){
	ds = (typeof ds !== "undefined")?ds:{};
	ds.log =  function (msg,title,img,errFunc) {
		$.gritter.add({
            title: title||"",
            text: (msg||"System Error"),
            sticky:false,
            img:img||"",
            class_name: 'gritter-light'
        });
	};
	ds.clearLog =function() {
		$.gritter.removeAll();
	};
	ds.error = function (span,msg,type) {
		if(span==null) return null;
		span.empty();
		var css ="alert alert-error"
		if("info" == type) {
			css ="alert alert-info"
		}
		var dom =$("<div class='"+css+"'>");
		$("<button class='close' data-dismiss='alert'></button>").appendTo(dom);
		var msgDom =$('<span>');
		if(msg!=null)msgDom.html(msg);
		msgDom.appendTo(dom);
		dom.appendTo(span);
		return dom;
	};
	ds.info = function (span,msg) {
		return ds.error(span,msg,"info");
	};
})(jQuery);