
function AppUpload () {
	this.domApp = $("#appupload");
	this.domAppId =$("#appID");
	this.domAppName=$("#appNameId");
	this.domAPPSize =$("#appSizeId");
	this.domSaveBtn=$("#saveBtnId");
	this.domAppForm=$("#appFormId");
	this.uploadFiles=$("#uploadFilesId");
	this.domApp.modal({show:false});
	this.updateApkUrl = "updateApk";
	this.oldapk =null;
	this.refresh = null;
	this.processHelper=new ProgressHelper();
	this.loadingHelper = new LoadingHelper();
	this.initUpload();
	this.bindEvent();
}
AppUpload.prototype= {
		init:function(detail) {
			detail =detail||{};
			this.domAppId.html(detail["id"]||"");
			this.domAppName.html(detail["name"]||"");
			this.domAPPSize.html(this.formatSize(parseInt(detail["apkSize"]||"0")));
			this.oldapk = detail["apk"];

		},
		bindEvent : function () {
			this.domSaveBtn.unbind("click");
			this.domSaveBtn.bind("click",$.hitch(this,this.save));
		},
		show: function(detail,refresh) {
			this.init(detail);
			this.refresh = refresh;
			this.domApp.modal('show');
		},
		close : function() {
			this.domApp.modal('hide');
		},
		save : function () {
			this.domAppForm.submit();
		},
		saveSubmit : function(apk) {
			if(apk==null||apk.length==0){
				sdt.log("请选择要上传的应用");
				return false;
			}
			var id = this.domAppId.html();
			var data = {id:id,apk:apk,oldapk:this.oldapk};
			console.info("update,data=",data);
			this.loadingHelper.show("正在保存APK信息,请稍后...");
			var dtd=sdt.post(this.updateApkUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			if(this.refresh!=null) {
				$.when(dtd).done(this.refresh);
			}
		},
		success : function (data) {
			this.loadingHelper.hide();
			if(data.s==1) {
				sdt.log(data.i||"数据操作成功");
			} else {
				sdt.log(data.i||"数据操作失败");
			}
		},
		error : function(data) {
			sdt.log(data.i||"操作失败,服务器忙...");
			this.loadingHelper.hide();
		},
		initUpload : function () {
			var _this = this;
			this.domAppForm.submit = function() {
				sdt.log("请选择一个文件");
			};
			this.uploadFiles.fileupload({
				url:"upload",
				dataType: 'json',
				formData:{type:"apk"},
				acceptFileTypes: /(\.|\/)(apk|apk)$/i,
				add : function(e,data) {
					console.info("add",data);
					var file = data["files"][0];
					if(file !=null) {
						var info ="文件名称:"+file["name"]+"<br/>文件大小:"+_this.formatSize(file["size"]) +"<br/>文件类型:"+file["type"];
						console.info(info);
						$("#appFileInfoId").html(info);
					}
					_this.domAppForm.submit = function(){
							_this.processHelper.show("正在上传并保存APK信息,请稍后...");
							data.submit();
					}
				},
			    done: function (e, data) {
			           console.info("done",data);
			           _this.processHelper.hide();
			           var result = data["result"];
			           if(result["s"] ==1) {
			        	   var json = result["data"][0];
			        	   if(json == null) {
			        		   sdt.log("上传失败");
			        		   return;
			        	   }
			        	   _this.saveSubmit(json["apk"]);
			           }
			    },
			    fail : function(e,data) {
			    	console.info("failed",data);
			    	 _this.processHelper.hide();
			    	sdt.log("文件上传失败,文件类型错误或服务器忙...")
			    },
				progressall: function (e, data) {
					console.info("progressall",data);
			        var progress = parseInt(data.loaded / data.total * 100, 10);
			        _this.processHelper.update(progress);
			        console.info("progress=",progress);
			    }
			});
		},
		formatSize : function(size) {
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
		xround: function (x, num){
		    return Math.round(x * Math.pow(10, num)) / Math.pow(10, num) ;
		}
}