$(function(){
	console.info("load...");
	var bookmanager = new BookManager();
	bookmanager.init();
});
function BookManager() {
	
	this.preViewFormDom =$("#previewFormId");
	this.preViewFileDom=$("#previewId");
	this.preViewImgDom=$("#previewImgId");
	
	this.domFileForm=$("#fileFormId");
	this.domFile =$("#uploadBtnId");
	this.domInfo=$("#fileInfoId");
	
	this.configHelper = new TableJsConfigHelper();
	this.processHelper=new ProgressHelper();
	this.loadingHelper = new LoadingHelper();
}
BookManager.prototype ={
		init : function () {
			console.info("init...");
			this.initPreviewImg(this.preViewFormDom,this.preViewFileDom,this.preViewImgDom,$.hitch(this,this.PISuccess));
			this.initUpload(this.domFileForm,this.domFile,this.domInfo);
		},
		initPreviewImg : function (preViewFormDom,preViewFileDom,preViewImgDom,success,progress) {
			this.preViewFileDom.fileupload({
				url:"upload",
				dataType: 'json',
				formData :{type:"img"},
				add : function(e,data) {
					console.info("start...");
					loadImage(
							data["files"][0],
						    function (img) {
								console.info("img----",img["type"]);
								if(img["type"]==null)preViewImgDom.html(img);
						    },
						    {
						        maxWidth: 150,
						        maxHeight: 150,
						        minWidth: 100,
						        minHeight: 50
						    }
					);
					preViewFormDom.submit = function(){
						data.submit();
					}
				},
			    done: function (e, data) {
			           var result = data["result"];
			           if(result["s"] ==1) {
			        	   var json = result["data"][0];
			        	   if(success!=null) {
			        		   success(json);
			        	   }
			           }
			    },
				progressall: function (e, data) {
			        var pgress = parseInt(data.loaded / data.total * 100, 10);
			        if(progress!=null) {
			        	progress(pgress);
			        }
			    }
			});
	},
	initUpload : function (formDom,fileDom,infoDom,success,progress) {
		var _this =this;
		formDom.submit = function() {
			ds.log("请选择一个文件");
		};
		fileDom.fileupload({
			url:"upload",
			dataType: 'json',
			formData : {type:"book"},
			acceptFileTypes: /(\.|\/)(mobi|txt|pdf|doc)$/i,
			add : function(e,data) {
				var file = data["files"][0];
				if(file !=null) {
					var info ="文件名称:"+file["name"]+" 文件大小:"+ds.formatSize(file["size"]) +" 文件类型:"+file["type"];
					infoDom.html(info);
				}
				formDom.submit = function(){
						_this.processHelper.show("正在上传并保存书籍信息,请稍后...");
						data.submit();
				}
			},
		    done: function (e, data) {
		           _this.processHelper.hide();
		           _this.loadingHelper.hide();
		           var result = data["result"];
		           if(result["s"] ==1) {
		        	   var json = result["data"][0];
		        	   //_this.setVideoPath(json["url"]);
		        	   _this.saveSubmit(json["name"],json["img"]);
		           }
		    },
		    fail : function(e,data) {
		    	console.info("failed",data);
		    	 _this.processHelper.hide();
		         _this.loadingHelper.hide();
		    	 ds.log("文件上传失败,文件类型错误或服务器忙...")
		    },
			progressall: function (e, data) {
		        var progress = parseInt(data.loaded / data.total * 100, 10);
		        _this.processHelper.update(progress);
		        console.info("progress=",progress);
		        if(progress >=100) {
			    	 _this.processHelper.hide();
		        	 _this.loadingHelper.show("书籍上传完成,正在保存,请稍后...");
		        }
		    }
		});
		/*this.domUpload.unbind("fileuploadsubmit");
		this.domUpload.bind("fileuploadsubmit",function(e,data){
			data.formData={type:"video",aspect:_this.domAspect.val()}
		});*/
	},
	PISuccess : function( data) {
		console.info("upload...",data);
	}
}