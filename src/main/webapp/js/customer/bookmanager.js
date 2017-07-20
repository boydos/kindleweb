$(function(){
	var bookmanager = new BookManager();
	bookmanager.init();
	bookmanager.load();
});
function BookManager() {
	this.domBookName = $("#bookNameId");
	this.domSubName = $("#bookSubNameId");
	this.domAuthor=$("#bookAuthorId");
	this.domDes =$("#bookDescriptionId");
	this.domSelectSpan =$("#videTypeSelectedId");
	this.domType=$("<div>");
	
	this.preViewFormDom =$("#previewFormId");
	this.preViewFileDom=$("#previewId");
	this.preViewImgDom=$("#previewImgId");
	
	this.domFileForm=$("#fileFormId");
	this.domFile =$("#uploadBtnId");
	this.domInfo=$("#fileInfoId");
	
	this.saveBtn = $("#saveBtnId");
	
	this.configHelper = new TableJsConfigHelper();
	this.processHelper=new ProgressHelper();
	this.loadingHelper = new LoadingHelper();
	
	this.readTypeListUrl="booktype/getBookTypes";
	this.types = [];
}
BookManager.prototype ={
		init : function () {
			this.reset();
			this.bindEvent();
			this.initPreviewImg(this.preViewFormDom,this.preViewFileDom,this.preViewImgDom);
			this.initUpload(this.domFileForm,this.domFile,this.domInfo);
		},
		bindEvent : function() {
			this.saveBtn.unbind("click");
			this.saveBtn.bind("click",$.hitch(this,this.saveDialog));
		},
		reset: function () {
			this.img=null;
			this.filepath =null;
		},
		setImgUrl: function(img) {
			this.img = img;
		},
		setFileUrl : function(path) {
			this.filepath = path;
		},
		initSelected : function (span,data,id,name) {
			if(span ==null) return;
			span.empty();
			var selectedDom=$('<select class="chosen" data-placeholder="请选择..." tabindex="1"></select>');
			$("<option>").appendTo(selectedDom);
			for(var i in data||[]) {
				var item = data[i];
				var option=$("<option>");
				item[id||"id"]!=null&& option.attr("value",item[id||"id"]);
				item[name||"name"]!=null&& option.html(item[name||"name"]);
				option.appendTo(selectedDom);
			}
			selectedDom.appendTo(span);
			if (!jQuery().chosen) {
	            return;
	        }
			selectedDom.chosen({
                allow_single_deselect: $(this).attr("data-with-diselect") === "1" ? true : false
            });
			return selectedDom;
		},
		initTypes : function() {
			this.domType=this.initSelected(this.domSelectSpan,this.types);
		},
		load : function() {
			this.getTypeList();
		},
		getTypeList:function() {
			var _this= this;
			return ds.post(this.readTypeListUrl,{},function(data){
				if(data.s==1) {
					_this.types=data.data||[];
					_this.initTypes();
				}
			},function(error){
				ds.log(error);
			});
		},
		getInputData : function () {
			var bookName = this.domBookName.val();
			var subName = this.domSubName.val();
			var author = this.domAuthor.val();
			var des = this.domDes.val();
			var typeId = this.domType.val();
			if(ds.isEmpty(bookName)) {
				this.domBookName.focus();
				ds.log("请输入书籍名称");
				return null;
			}
			if(ds.isEmpty(subName)) {
				this.domSubName.focus();
				ds.log("请输入书籍副标题");
				return null;
			}
			if(ds.isEmpty(author)) {
				this.domAuthor.focus();
				ds.log("请输入书籍作者");
				return null;
			}
			if(ds.isEmpty(des)) {
				this.domDes.focus();
				ds.log("请输入书籍简介");
				return null;
			}
			if(ds.isEmpty(typeId) || typeId == -1) {
				this.domDes.focus();
				ds.log("请选择书籍分类");
				return null;
			}
			return {
				name : 	bookName,
				subtitle: subName,
				author :author,
				typeId:typeId
			}
		},
		saveDialog : function () {
			var data = this.getInputData();
			if(data ==null) return;
			console.info("save,--",data);
			var typeName ="---";
			for(var i in this.types) {
				if(data["typeId"] == this.types[i]["id"]) {
					typeName= this.types[i]["name"];
					break;
				}
			}
			var option= {
					  title:"保存书籍信息",
					  message:"请核对相关书籍信息",
					  form :[{key:"name",label:"书籍名称",type:"readonly",value:data["name"]},
						     {key:"subtitle",label:"副标题",type:"readonly",value:data["subtitle"]},
						     {key:"author",label:"作者",type:"readonly",value:data["author"]},
						     {key:"type",label:"类型",type:"readonly",value:typeName}
					        ],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.save),name:"确定"}]
					}
			ds.showDialog(option);
		},
		save : function() {
			var data = this.getInputData();
			if(data ==null) return;
			this.preViewFormDom.submit();
			this.domFileForm.submit();
		},
		initPreviewImg : function (preViewFormDom,preViewFileDom,preViewImgDom) {
			var _this =this;
			preViewFormDom.submit = function() {
				ds.log("请选择一个封面");
			};
			this.preViewFileDom.fileupload({
				url:"upload",
				dataType: 'json',
				formData :{type:"img"},
				add : function(e,data) {
					loadImage(
							data["files"][0],
						    function (img) {
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
			        	   console.info("img",json);
			        	   _this.setImgUrl(json["path"]);
			        	   _this.saveSubmit();
			           }
			    },
				progressall: function (e, data) {
			        var pgress = parseInt(data.loaded / data.total * 100, 10);
			        
			    }
			});
	},
	initUpload : function (formDom,fileDom,infoDom) {
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
					var info ="文件名称:"+file["name"]+" 文件大小:"+ds.formatByteSize(file["size"]) +" 文件类型:"+file["type"];
					infoDom.html(info);
				}
				formDom.submit = function(){
						_this.processHelper.show("正在上传书籍信息,请稍后...");
						data.submit();
				}
			},
		    done: function (e, data) {
		           _this.processHelper.hide();
		           var result = data["result"];
		           if(result["s"] ==1) {
		        	   var json = result["data"][0];
		        	   console.info("file",json);
		        	   _this.setFileUrl(json["path"]);
		        	   _this.saveSubmit();
		           }
		    },
		    fail : function(e,data) {
		    	 _this.processHelper.hide();
		    	 ds.log("文件上传失败,文件类型错误或服务器忙...")
		    },
			progressall: function (e, data) {
		        var progress = parseInt(data.loaded / data.total * 100, 10);
		        _this.processHelper.update(progress);
		    }
		});
		/*this.domUpload.unbind("fileuploadsubmit");
		this.domUpload.bind("fileuploadsubmit",function(e,data){
			data.formData={type:"video",aspect:_this.domAspect.val()}
		});*/
	},
	saveSubmit : function () {
		console.info("saveSubmit",this.img,this.filepath);
		if(ds.isEmpty(this.img)) {
			return;
		}
		if(ds.isEmpty(this.filepath)) {
			return;
		}
		var data = this.getInputData();
		if(data == null) return;
		data["img"] = this.img;
		data["resources"] = this.filepath;
		this.loadingHelper.show("正在保存书籍信息，请稍后...");
	}
}