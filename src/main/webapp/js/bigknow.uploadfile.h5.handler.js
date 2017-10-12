
function UpLoadFileJS( formId , fileInputId, btnId, viewImgId,showNoty) {
	this.formDom= $("#"+formId);
	this.fileInputId = fileInputId;
	this.viewImgId = viewImgId;
	this.showNoty = showNoty ==null? true: showNoty;
	this.fileInputDom = $("#"+fileInputId);
	if( btnId !=null) this.btnDom = $("#" + btnId);
	this.config = {
			url : null,
			key : "file",
			fileExt : null
	}
	
	this.ifrmId = formId  +"_"+ fileInputId +"_"+btnId+"_ifm";
	this.loading = new DialogLoadingHelper();
	this.funCallBack =null;
	this.deferred = $.Deferred();
}
UpLoadFileJS.prototype = {
		process : function () {
			this.buildFormAttr();
			this.buildInputDom();
			if(this.btnDom !=null)this.buildBtnDom();
		},
		getDeferred : function() {
			return this.deferred;
		},
		setCallBack : function ( funCallBack) {
			this.funCallBack = funCallBack;
		},
		getUrl : function () {
			return this.config["url"];
		},
		getFileExt : function() {
			return this.config["fileExt"];
		},
		buildFormAttr : function() {
			this.formDom.attr("method","post");
			this.formDom.attr("target", this.ifrmId);
			this.formDom.attr("enctype", "multipart/form-data");
			this.formDom.attr("action", this.getUrl());
			this.formDom.attr("onsubmit","return true;");
		},
		buildInputDom : function () {
			var value = this.fileInputDom.attr("name");
			if( value ==null) this.fileInputDom.attr("name",this.config["key"] || this.fileInputId);
			this.fileInputDom.unbind("change");
			this.fileInputDom.bind("change", $.hitch(this,this.fileSelected));
		},
		fileSelected : function () {
			var file = document.getElementById( this.fileInputId ).files[0];
			console.info( "file:",file);
	        if (file) {
	          var fileSize = 0;
	          if (file.size > 1024 * 1024)
	            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	          else
	            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
	          $("#progressHelperId").remove();
	          $("#fileDetailHelperId").remove();
	          var divDom =$('<div id="fileDetailHelperId"style="float:left;width:100%;font-size:11px;color:#999;"></div>');
	          
	          var nameDom =$('<span style="float: left;margin-right: 10px;"></span>');
	          nameDom.text('文件名: ' + file.name);
	          nameDom.appendTo( divDom);
	          
	          var sizeDom =$('<span style="float: left;margin-right: 10px;"></span>');
	          sizeDom.text('文件大小: ' + fileSize);
	          sizeDom.appendTo( divDom);
	          
	          var typeDom =$('<span style="float: left;margin-right: 10px;"></span>');
	          typeDom.text('文件类型: ' + file.type);
	          typeDom.appendTo( divDom);
	          divDom.appendTo( this.formDom);
	          
	          if( this.viewImgId !=null ) {
	        	  this.preview1(file, this.viewImgId);
	          }
	          
	        }
	    },
		buildBtnDom : function () {
			this.btnDom.attr("type","button");
			this.btnDom.unbind("click");
			this.btnDom.bind("click", $.hitch(this,this.uploadFile));
		},
		setConfig: function ( config){
			$.extend(this.config, config||{});
		},
		checkFile : function ( file ) {
			if( file == null  )  {
				noty({ text :"尚未选择任何文件" , type:"error"});
				return false;
			}
	        var value = file.name;
	        if( value.indexOf('.') !=-1 && this.getFileExt() !=null) {
				var ends = this.getFileExt().split(',');
				var search = false;
				for( var i in ends) {
					if( this.endWidth(value.toLowerCase(), ends[i])) {
						search = true;
					}
				}
				if( !search) {
					noty({ text :"文件格式不符合!,需要上传 "+this.getFileExt() +" 文件" , type:"error"});
					return false;
				}
			}
	        return true;
		},
		uploadFile: function () {
	        var fd = new FormData();
	        var file =  document.getElementById( this.fileInputId ).files[0];
	        if(!this.checkFile( file )) return;
	        if( this.getUrl() == null){
	        	noty({ text :"无上传事件 ", type:"error"});
	        	return;
	        }
	        this.loading.showLoading("正在上传文件，请稍等...");
	        $("#progressHelperId").remove();
	        var divDom =$('<div id="progressHelperId" style="float:left;border: green 1px solid;height:15px;width:100%"></div>');
	        var progressDom = $('<div id="progressNumId_" style="background:green;height:15px;width:0px;color:#fff;"></div>');
	        progressDom.appendTo( divDom);
	        divDom.appendTo( this.formDom);
	        fd.append(this.fileInputId,file);
	        var xhr = new XMLHttpRequest();
	        xhr.upload.addEventListener("progress", $.hitch(this,this.uploadProgress), false);
	        xhr.addEventListener("load", $.hitch(this,this.uploadComplete), false);
	        xhr.addEventListener("error", $.hitch(this,this.uploadFailed), false);
	        xhr.addEventListener("abort", $.hitch(this,this.uploadCanceled), false);
	        xhr.open("POST",this.getUrl());
	        xhr.send(fd);
	        return file.name;
	    },
	    uploadProgress: function (evt) {
	        if (evt.lengthComputable) {
	          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
	          
	          $("#progressNumId_").css("width", percentComplete.toString() + '%');
	          if( percentComplete == 100) {
	        	  $("#progressHelperId").remove();
	          }
	        }
	        else {
	          $("#pageUpNumId").html('unable to compute');
	        }
	    },
	    uploadComplete: function(evt) {
	        /* This event is raised when the server send back a response */
	        var content = evt.target.responseText;
	        this.loading.hideLoading();
	        if( content ) {
				var data = eval('(' + content + ')'); 
				if( this.funCallBack != null ) {
					this.funCallBack(data);
				}
				if( data.s == 1) {
					if( this.showNoty && data.i !=null)	noty({ text : data.i});
				} else {
					if( this.showNoty && data.i !=null) noty({ text : data.i , type:"error"})
				}
			}
	        this.deferred.resolve("Done");
	        
	    },
	    uploadFailed : function(evt) {
	        alert("There was an error attempting to upload the file.");
	        this.loading.hideLoading();
	        this.deferred.reject("failed")
	    },
	    uploadCanceled : function(evt) {
	        alert("The upload has been canceled by the user or the browser dropped the connection.");
	        this.loading.hideLoading();
	        this.deferred.reject("failed")
	    },
	    preview1 : function(file,viewImgId) {
            var img = new Image();
            var url = img.src = URL.createObjectURL(file);
            var $img = $(img);
            img.onload = function() {
                URL.revokeObjectURL(url);
                $('#'+viewImgId).empty().append($img);
            }
        },
        preview2: function(file, viewImgId) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var $img = $('<img>').attr("src", e.target.result);
                $('#' +viewImgId).empty().append($img)
            };
            reader.readAsDataURL(file);
        },
	    endWidth : function(content,end){
	        if(content==null)return false;
	        if(end==null)return false;
	        if(content.length<end.length)
	            return   false;
	        if(content==end)
	            return   true;
	        if(content.substring(content.length-end.length)==end)
	            return   true;
	        return   false;
	  }

}

function DialogLoadingHelper ( parentDomId,infoDomId) {
	if( parentDomId == null) this.createDialog();
	this.loadingDom = $("#" + (parentDomId || "DialogLoadingImgId"));
	this.loadingInfoDom =$("#" + (infoDomId || "DialogLoadingInfoId"));
	this.loadingDom.dialog({
		autoOpen : false,
		modal: true,
		minHeight : "50px",
		minWidth : "205px"
	});
	$('[aria-describedby="'+(parentDomId || "DialogLoadingImgId")+'"]').find('.ui-dialog-titlebar').hide();
}

DialogLoadingHelper.prototype = {
		createDialog : function () {
			var bodyDom = $("body");
			var dialogDom = $('<div id="DialogLoadingImgId" style="float: left;padding : 5px;width :100%;display:none"></div>').appendTo(bodyDom);
			var imgDom =$('<div style="float:left"><img alt="" src="img/ajax-loader.gif" /></div>').appendTo(dialogDom);
			var textDom = $('<div style="float:left;padding:12px;" id="DialogLoadingInfoId">服务器正在运行中..</div>').appendTo(dialogDom);
		},
		showLoading : function ( info ) {
			this.setInfo( info );
			this.loadingDom.dialog("open");
		},
		setInfo : function ( value ) {
			if( value == null) value ="服务器忙,请稍后..";
			this.loadingInfoDom.text( value );
		},
		hideLoading : function () {
			this.loadingDom.dialog("close");
		}
}