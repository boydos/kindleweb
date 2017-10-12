/**
 * option = {
 *   formId : "",
 *   fileId : "",
 *   viewId : "",
 *   msg :"请选择一个封面",
 *   upmsg:"正在上传并保存文件信息,请稍后...",
 *   url:"upload",
 *   dataType :"json",
 *   params : {type:"img"},
 *   filetypes: "/(\.|\/)(png|jpg|jpeg|gif)$/i",
 *   success : function () {
 *   }
 * }
 */

function FileUploadHelper (option) {
	this.setOption(option);
	this.processHelper=new ProgressHelper();
}
FileUploadHelper.prototype = {
		setOption:function(option) {
			this.option = option ||{};
		},
		init : function () {
			this.domForm = $("#"+(this.option["formId"]||"fileFormId"));
			this.domFile = $("#"+(this.option["fileId"]||"uploadFileId"));
			this.domInfo = $("#"+(this.option["viewId"]||"fileInfoId"));
			this.initUpload();
		},
		upload : function () {
			this.domForm.submit();
		},
		initUpload : function () {
			var _this = this;
			this.domForm.submit = function() {
				sdt.log(_this.option["msg"]||"请选择一个文件");
			};
			this.domFile.fileupload({
				url:this.option["url"]||"upload",
				dataType: this.option["dataType"]||'json',
				formData:this.option["params"]||{type:"apk"},
				acceptFileTypes: this.option["filetypes"],
				add : function(e,data) {
					var file = data["files"][0];
					if(file !=null) {
						var info ="文件名称:"+file["name"]+"<br/>文件大小:"+_this.formatSize(file["size"]) +"<br/>文件类型:"+file["type"];
						_this.domInfo.html(info);
					}
					_this.domForm.submit = function(){
							_this.processHelper.show(_this.option["upmsg"]||"正在上传并保存文件信息,请稍后...");
							data.submit();
					}
				},
			    done: function (e, data) {
			           _this.processHelper.hide();
			           var result = data["result"];
			           if(result["s"] ==1) {
			        	   var json = result["data"][0];
			        	   if(json == null) {
			        		   sdt.log("上传失败");
			        		   return;
			        	   }
			        	   if(_this.option["success"]!=null) {
			        		   _this.option["success"](json["path"],json,result["data"]);        		   
			        	   }
			           }
			    },
			    fail : function(e,data) {
			    	 _this.processHelper.hide();
			    	sdt.log("文件上传失败,文件类型错误或服务器忙...")
			    },
				progressall: function (e, data) {
			        var progress = parseInt(data.loaded / data.total * 100, 10);
			        _this.processHelper.update(progress);
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