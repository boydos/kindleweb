/**
 * 
 */
function LoadingHelper ( parentDomId,infoDomId) {
	if( parentDomId == null) this.createDialog();
	this.loadingDom = $("#" + (parentDomId || "loadingImgId"));
	this.loadingInfoDom =$("#" + (infoDomId || "loadingInfoId"));
	
	this.loadingDom.dialog({
		autoOpen : false,
		modal: true,
		minHeight : "50px",
		minWidth : "400px"
	});
	this.loadingDom.parent().children(".ui-dialog-titlebar").hide();
	//$(".ui-dialog-titlebar").hide();
	this.interval = null;
	this.time = 0;
	this.info ="";
}

LoadingHelper.prototype = {
		createDialog : function () {
			var bodyDom = $("body");
			var dialogDom = $('<div id="loadingImgId" style="float: left;padding : 5px;min-width:500px;width :100%;display:none"></div>').appendTo(bodyDom);
			var imgDom =$('<div style="float:left"><img alt="" src="img/ajax-loader.gif" /></div>').appendTo(dialogDom);
			var textDom = $('<div style="float:left;padding:12px;" id="loadingInfoId">服务器正在运行中..</div>').appendTo(dialogDom);
	
		},
		show : function ( info ) {
			
			this.setInfo( info );
			this.setInterval();
			this.loadingDom.dialog("open");
		},
		setInterval : function () {
			this.interval = window.setInterval($.hitch(this, this.update), 1000);
		},
		clearInterval : function () {
			if( this.interval != null) clearInterval( this.interval );
		},
		update : function () {
			this.loadingInfoDom.text( this.info +"  "+(++this.time)+"S" );
		},
		setInfo : function ( value ) {
			if( value == null) value ="服务器忙,请稍后..";
			this.info = value;
			this.loadingInfoDom.text( value );
		},
		hide : function () {
			this.clearInterval();
			this.loadingDom.dialog("close");
		}
}


function ProgressHelper ( parentDomId,infoDomId) {
	if( parentDomId == null) this.createDialog();
	this.progressDom = $("#" + (parentDomId || "progressCustomerId"));
	this.progressInfoDom =$("#" + (infoDomId || "progressInfoId"));
	this.progressBarDom =$("#" + (infoDomId || "progressBarId"));
	
	this.progressDom.dialog({
		autoOpen : false,
		modal: true,
		width:'500px',
		minHeight : "50px",
		minWidth : "500px"
	});
	this.progressDom.parent().children(".ui-dialog-titlebar").hide();
	//$(".ui-dialog-titlebar").hide();
	this.info ="";
	this.process =0;
}

ProgressHelper.prototype = {
		createDialog : function () {
			var bodyDom = $("body");
			var dialogDom = $('<div id="progressCustomerId" style="float: left;padding : 5px;min-width:500px;width :100%;display:none"></div>').appendTo(bodyDom);
			var textDom =$('<div style="float:left;width:100%"><blockquote style="margin-top:10px;margin-bottom:10px;" id="progressInfoId"></blockquote></div>').appendTo(dialogDom);
			var progressDom = $('<div style="float:left;width:98%;"></div>').appendTo(dialogDom);
			$('<div style="border:1px solid #ccc" class="progress progress-striped progress-success"><div id="progressBarId" style="width:0%;" class="bar"></div></div>').appendTo(progressDom);
		
		},
		show : function ( info ) {
			this.process =0;
			this.setInfo(info);
			this.update(0);
			this.progressDom.dialog("open");
		},
		update : function (process) {
			this.process =process;
			this.setInfo(this.info);
			this.process!=null&&this.progressBarDom.css("width",process+"%");
		},
		setInfo : function ( value ) {
			if( value == null) value ="正在努力奔跑中...";
			this.info = value;
			this.process?this.progressInfoDom.text(value+this.process+"%"):this.progressInfoDom.text(value);
		},
		hide : function () {
			this.progressDom.dialog("close");
		}
}
