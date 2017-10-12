/**
 * option = {
 *   formId : "",
 *   fileId : "",
 *   viewId : "",
 *   msg :"请选择一个封面",
 *   url:"upload",
 *   width:"120px",
 *   height:"120px",
 *   maxWidth: 150,
 *   maxHeight: 150,
 *   minWidth: 100,
 *   minHeight: 50
 *   dataType :"json",
 *   params : {type:"img"},
 *   filetypes: "/(\.|\/)(png|jpg|jpeg|gif)$/i",
 *   add : function() {},
 *   success : function () {
 *   }
 * }
 */
function ImageHelper (option) {
	this.setOption(option);
	this.processHelper=new ProgressHelper();
}
ImageHelper.prototype = {
		setOption:function(option) {
			this.option = option ||{};
		},
		setDom : function(formDom,fileDom,viewDom) {
			if(formDom==null|| fileDom==null|| viewDom==null) return;
			this.preViewFormDom = formDom;
			this.preViewFileDom = fileDom;
			this.preViewImgDom = viewDom;
			this.initEvent();
		},
		init : function () {
			this.preViewFormDom = $("#"+(this.option["formId"]||"previewFormId"));
			this.preViewFileDom = $("#"+(this.option["fileId"]||"previewId"));
			this.preViewImgDom = $("#"+(this.option["viewId"]||"previewImgId"));
			this.initEvent();
		},
		initEvent :function () {
			this.preViewImgDom.css("background","url(img/plus.png) center center no-repeat #bcbcbc80");
			this.initPreviewImg();
		},
		upload : function () {
			this.preViewFormDom.submit();
		},
		initPreviewImg : function () {
			var _this =this;
			this.preViewFormDom.submit = function() {
				sdt.log(_this.option["msg"]||"请选择一个封面");
			};
			this.preViewFileDom.fileupload({
				url:this.option["url"]||"upload",
				dataType: this.option["dateType"]||'json',
				formData :this.option["params"]||{type:"img"},
				acceptFileTypes: this.option["filetypes"]|| (/(\.|\/)(png|jpg|jpeg|gif)$/i),
				add : function(e,data) {
					loadImage(
							data["files"][0],
						    function (img) {
								console.info("tds,",img)

								if(img["type"]==null) {
									_this.preViewImgDom.css("background","#bcbcbc80");
									_this.preViewImgDom.html(img);
									console.info(_this.option)
									if(_this.option["add"]!=null) {
						        		   _this.option["add"]();        		   
						        	}
								}
						    },
						    {
						        maxWidth: _this.option["maxWidth"]||150,
						        maxHeight: _this.option["maxHeight"]||150,
						        minWidth:  _this.option["minWidth"]||100,
						        minHeight: _this.option["minHeight"]||50
						    }
					);
					
					_this.preViewFormDom.submit = function(){
						data.submit();
					}
				},
			    done: function (e, data) {
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
			    	 sdt.log("封面上传失败...")
			    },
				progressall: function (e, data) {
			        var pgress = parseInt(data.loaded / data.total * 100, 10);
			        
			    }
			});
		}
}