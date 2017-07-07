$(function(){
	var videoconfig = new VideoConfig();
	videoconfig.init();
	videoconfig.load();
	var videotype = new VideoType();
	videotype.setVideoConfig(videoconfig);
	videotype.load();
});
function VideoConfig() {
	this.domId="videListId";
	this.domPreview=$("#previewId");
	this.domUpload =$("#uploadBtnId");
	this.domPreviewFrom =$("#previewFormId");
	this.domFileForm=$("#fileFormId");
	this.domSaveBtn=$("#saveBtnId");
	this.domFileInfoDisplay=$("#fileInfoId");
	
	this.domVideoName=$("#videoNameId");
	this.domVideoSubName=$("#videoSubNameId");
	this.domVideoDescription=$("#videoDescriptionId");
	this.domSelectedSpan=$("#videTypeSelectedId");
	this.domAuthorSelectedSpan=$("#videAuthorSelectedId");
	this.domType=$("<div>");
	this.domAuthor=$("<div>");;
	this.tablejs = new TableJs(this.domId);
	this.configHelper = new TableJsConfigHelper();
	this.processHelper=new ProgressHelper();
	this.loadingHelper = new LoadingHelper();
	this.readVideoListUrl="getVideoByType";
	this.createVideoUrl = "createVideo";
	this.modifyVideoUrl="updateLive";
	this.deleteVideoUrl="deleteLive";
	
	this.readTypeListUrl="getVideoTypeWithoutRoot";
	this.readUserListUrl="getAllUser";
	this.users =[];
	this.types=[];
	this.temp_video_path;
	this.temp_img_path;
	this.initTable();
}
VideoConfig.prototype= {
		initTable : function () {
			this.tablejs.pushHead("ID","id");
			this.tablejs.pushHead("视频名称","title");
			this.tablejs.pushHead("副标题","subTitle");
			this.tablejs.pushHead("类型","typeId");
			this.tablejs.pushHead("作者","authorId");
			this.tablejs.pushHead("日期","date");
			this.tablejs.pushHead("操作","operation");
			
			this.configHelper.setFenYe(true);
			this.configHelper.setCheckBox(false,"checkbox", true);// 设置启用 checkbox
			this.configHelper.setServerUrl(this.readVideoListUrl);
			this.configHelper.setServerParams({"typeId":-1});
			var btnHelper = new TableJsKeyValueHelper();
			btnHelper.pushValue("id", [""],false); //key为name的列，值是xiaoming1或zhong guo, 
			this.configHelper.pushBtn("operation", "编辑", $.hitch(this,this.editVideo), "btn btn-sm blue", btnHelper.getData()); 
			this.configHelper.pushBtn("operation", "删除", $.hitch(this,this.deleteVideo), "btn btn-sm red", btnHelper.getData()); 
			this.tablejs.setConfig( this.configHelper.getConfig() );
		},
		changeToNV: function(data,name,value) {
			if(data==null||data.length==0)return [];
			var temp =[];
			for(var i in data) {
				var item=data[i];
				temp.push({"name":item[name],"value":item[value]});
			}
			return temp;
		},
		replaceItem: function(key,data,id,name) {
			var replaceHelper = new TableJsValueHelper();
			for(var i in data||[]) {
				var item = data[i];
				replaceHelper.pushValue(item[id||"id"], item[name||"name"]);
			}
			this.configHelper.pushReplace(key, replaceHelper.getData());
			this.tablejs.setConfig( this.configHelper.getConfig() );
		},
		replaceTypes : function() {
			this.replaceItem("typeId",this.types);
		},
		replaceUser : function() {
			this.replaceItem("authorId",this.users);
		},
		initTypes : function() {
			this.domType=this.initSelected(this.domSelectedSpan,this.types);
		},
		initUsers : function() {
			this.domAuthor=this.initSelected(this.domAuthorSelectedSpan,this.users);
		},
		initSelected : function (span,data,id,name) {
			if(span ==null) return;
			span.empty();
			var selectedDom=$('<select class="chosen" data-placeholder="请选择..." tabindex="1"></select>');
			$("<option>").appendTo(this.domType);
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
		getUsers: function() {
			var _this= this;
			return sdt.post(this.readUserListUrl,{},function(data){
				if(data.s==1) {
					_this.users=data.data||[];
					_this.replaceUser();
					_this.initUsers();
				}
			},function(error){
			});
		},
		getTypes: function() {
			var _this= this;
			return sdt.post(this.readTypeListUrl,{},function(data){
				if(data.s==1) {
					_this.types=data.data||[];
					_this.replaceTypes();
					_this.initTypes();
				}
			},function(error){
			});
		},
		initPath : function() {
			this.temp_video_path=null;
			this.temp_img_path=null;
		},
		setVideoPath :function(path) {
			this.temp_video_path =path;
		},
		getVideoPath: function() {
			return this.temp_video_path;
		},
		setImgPath :function(path) {
			this.temp_img_path =path;
		},
		getImgPath : function() {
			return this.temp_img_path;
		},
		load : function() {
			this.resetInput();
			$.when(this.getUsers(),this.getTypes()).then($.hitch(this,this.getVideoList));
		},
		getVideoList:function() {
			this.tablejs.show(true);
		},
		init : function () {
			//this.initPreview();
			this.initUpload();
			this.bindEvent();
		},
		resetInput : function() {
			this.domVideoName.val("");
			this.domVideoName.focus();
		},
		bindEvent : function () {
			this.domSaveBtn.unbind("click");
			this.domSaveBtn.bind("click",$.hitch(this,this.save));
		},
		save : function () {
			this.initPath();
			var title = this.domVideoName.val();
			var subTitle = this.domVideoSubName.val();
			var description=this.domVideoDescription.val();
			var typeId = this.domType.val();
			var authorId = this.domAuthor.val();
			var file = this.domUpload.val();
			if(title ==null||title.length==0) {
				sdt.log("请输入视频名称");
				this.domVideoName.focus();
				return false;
			}
			if(subTitle ==null||subTitle.length==0) {
				sdt.log("请输入视频副标题");
				this.domVideoSubName.focus();
				return false;
			}
			if(description==null || description.length==0) {
				sdt.log("请输入视频描述信息");
				this.domVideoDescription.focus();
				return false;
			}
			if(authorId ==null||authorId.length==0||authorId==-1) {
				sdt.log("请选择视频作者");
				this.domAuthor.focus();
				return false;
			}
			if(typeId ==null||typeId.length==0||typeId==-1) {
				sdt.log("请选择视频类型");
				this.domType.focus();
				return false;
			}
			if(file == null || file.length==0) {
				sdt.log("请选择视频进行上传...");
				return false;
			}
			sdt.log(file);
			var typeName ="";
			for(var i in this.types||[]) {
				var item = this.types[i];
				if(item["id"]== typeId) {
					typeName = item["name"];
				}
			}
			var authorName ="";
			for(var i in this.users||[]) {
				var item = this.users[i];
				if(item["id"]== authorId) {
					authorName = item["name"];
				}
			}
			var option = {
					  title:"上传视频并保存视频信息",
					  message:"请确认视频信息是否正确?",
					  form :[{key:"title",label:"视频名称",type:"readonly",value:title},
					         {key:"subTitle",label:"副标题",type:"readonly",value:subTitle},
					         {key:"description",label:"视频描述",type:"readonly",value:description},
					         {key:"author",label:"视频作者",type:"readonly",value:authorName},
					         {key:"type",label:"视频类型",type:"readonly",value:typeName},
					         {key:"fileName",label:"文件信息",type:"readonly",value:$("#fileInfoId").html()}],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.domFileForm.submit),name:"确定"}]
					};
			this.showDialog(option);
			//this.domPreviewFrom.submit();
		},
		initUpload : function () {
			var _this = this;
			this.domFileForm.submit = function() {
				sdt.log("请选择一个文件");
			};
			this.domUpload.fileupload({
				url:"upload",
				dataType: 'json',
				formData : {type:"video"},
				acceptFileTypes: /(\.|\/)(mp4|avi|rvmb|flv)$/i,
				add : function(e,data) {
					console.info("add",data);
					var file = data["files"][0];
					if(file !=null) {
						var info ="文件名称:"+file["name"]+" 文件大小:"+_this.formatSize(file["size"]) +" 文件类型:"+file["type"];
						$("#fileInfoId").html(info);
					}
					_this.domFileForm.submit = function(){
							_this.processHelper.show("正在上传并保存视频信息,请稍后...");
							data.submit();
					}
				},
			    done: function (e, data) {
			           console.info("done",data);
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
			    	sdt.log("文件上传失败,文件类型错误或服务器忙...")
			    },
				progressall: function (e, data) {
					console.info("progressall",data);
			        var progress = parseInt(data.loaded / data.total * 100, 10);
			        _this.processHelper.update(progress);
			        console.info("progress=",progress);
			        if(progress >=100) {
				    	 _this.processHelper.hide();
			        	_this.loadingHelper.show("上传完成,正在进行视频转码,请稍后...");
			        }
			    }
			});
		},
		initPreview : function () {
			var _this = this;
			this.domPreview.fileupload({
				url:"upload",
				dataType: 'json',
				add : function(e,data) {
					console.info("e",e,data);
					loadImage(
							data["files"][0],
						    function (img) {
						        $("#previewImgId").html(img);
						    },
						    {
						        maxWidth: 150,
						        maxHeight: 150,
						        minWidth: 100,
						        minHeight: 50
						    }
					);
					_this.domPreviewFrom.submit = function(){
						data.submit();
					}
				},
			    done: function (e, data) {
			           console.info("preview done",data);
			           var result = data["result"];
			           if(result["s"] ==1) {
			        	   var json = result["data"][0];
			        	   _this.setImgPath(json["url"]);
			        	   _this.saveSubmit();
			           }
			    },
				progressall: function (e, data) {
					console.info("preview progressall",data);
			        var progress = parseInt(data.loaded / data.total * 100, 10);
			        console.info("preview progress=",progress);
			    }
			});
		},
		saveSubmit : function (path,img) {
			var videopath = path;//this.getVideoPath();
			var imgurl = img;//this.getImgPath();

			var title = this.domVideoName.val();
			var subTitle = this.domVideoSubName.val(); 
			var description = this.domVideoDescription.val();
			var typeId = this.domType.val();
			var authorId = this.domAuthor.val();
			if(videopath==null||videopath.length==0){
				sdt.log("请选择要上传的视频");
				return false;
			}
			console.info("saveSubmit:"+videopath+" img:"+imgurl,"typeId="+typeId);
			var data = {
					title: title,
					subTitle: subTitle,
					description : description,
					url:videopath,
					img:imgurl,
					typeId:typeId,
					authorId:authorId
			};
			this.loadingHelper.show("正在创建视频信息,请稍后...");
			var dtd=sdt.post(this.createVideoUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			$.when(dtd).done($.hitch(this,this.load));
		},
		editVideo : function (evt) {
			var video = this.tablejs.getValuesOn($(evt.target));
			console.info("edit",video["typeId"],this.types);
			var option = {
					  title:"编辑视频信息",
					  message:"请输入视频相关信息",
					  form :[{key:"id",label:"视频ID",type:"readonly",value:video["id"]},
						     {key:"title",label:"视频名称",type:"text",value:video["title"]},
					         {key:"subTitle",label:"副标题",type:"text",value:video["subTitle"]},
						     {key:"authorId",label:"视频作者",type:"select",value:this.changeToNV(this.users,"name","id"),selected:video["authorId"]},
						     {key:"typeId",label:"视频类型",type:"select",value:this.changeToNV(this.types,"name","id"),selected:video["typeId"]}],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subEditVideo),name:"确定"}]
					};
			this.showDialog(option);
		},
		deleteVideo : function (evt) {
			var video = this.tablejs.getValuesOn($(evt.target));
			var option = {
					  title:"删除视频信息",
					  message:"确定要删除该视频信息吗?",
					  form :[{key:"id",label:"视频ID",type:"readonly",value:video["id"]},
						     {key:"title",label:"视频名称",type:"readonly",value:video["title"]},
						     {key:"subTitle",label:"副标题",type:"readonly",value:video["subTitle"]}],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subDeleteVideo),name:"确定"}]
					};
			this.showDialog(option);
		},
		subEditVideo : function (data) {
			if(!this.checkString(data["id"])) {
				sdt.log("视频ID不能为空");
				return false;
			}
			if(!this.checkString(data["title"])) {
				sdt.log("视频名称不能为空");
				return false;
			}
			if(!this.checkString(data["subTitle"])) {
				sdt.log("副标题不能为空");
				return false;
			}
			this.loadingHelper.show("正在修改视频信息,请稍后...");
			var dtd=sdt.post(this.modifyVideoUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			$.when(dtd).done($.hitch(this,this.load));
		},
		subDeleteVideo : function (data) {
			if(!this.checkString(data["id"])) {
				sdt.log("视频ID不能为空");
				return false;
			}
			this.loadingHelper.show("正在删除视频信息,请稍后...");
			var dtd=sdt.post(this.deleteVideoUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			$.when(dtd).done($.hitch(this,this.load));
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
		},
		showDialog: function(data) {
			var dialog = new DialogModal(data);
			dialog.init();
			dialog.show();
		},
		checkString: function( value) {
			return value!=null&&value.length>0;
		}	
}

function VideoType() {
	this.domId = "videoTypeListId";
	this.domCreateBtn = $("#videoTypeCreateBtn");
	this.tablejs = new TableJs(this.domId);
	this.loadingHelper = new LoadingHelper();
	this.configHelper = new TableJsConfigHelper();
	this.readTypeListUrl="getVideoTypeList";
	this.createTypeUrl="createVideoType";
	this.modifyTypeUrl="modifyVideoType";
	this.deleteTypeUrl="deleteVideoType";
	this.getTypeByGroupUrl="getVideoTypeByGroup";
	this.rootTypes = [{"name":"Root标签","id":0}];
	this.videoConfig = null;

	this.initTable();

	this.initEvent();
}
VideoType.prototype ={
		initTable : function () {
			this.tablejs.pushHead("ID","id");
			this.tablejs.pushHead("视频类型","name");
			this.tablejs.pushHead("分组","groupId");
			this.tablejs.pushHead("日期","date");
			this.tablejs.pushHead("操作","operation");
			this.configHelper.setFenYe(true);
			this.configHelper.setCheckBox(false,"checkbox", true);// 设置启用 checkbox
			var btnHelper = new TableJsKeyValueHelper();
			btnHelper.pushValue("id", [""],false); //key为name的列，值是xiaoming1或zhong guo, 
			this.configHelper.pushBtn("operation", "编辑", $.hitch(this,this.editType), "btn btn-sm blue", btnHelper.getData()); 
			btnHelper = new TableJsKeyValueHelper();
			btnHelper.pushValue("groupId", ["0"],false); 
			this.configHelper.pushBtn("operation", "删除", $.hitch(this,this.deleteType), "btn btn-sm red", btnHelper.getData()); 
			this.tablejs.setConfig( this.configHelper.getConfig() );
		},
		setVideoConfig : function(config) {
			this.videoConfig = config;
		},
		initEvent : function() {
			this.domCreateBtn.unbind("click");
			this.domCreateBtn.bind("click",$.hitch(this,this.createType));
		},
		load : function() {
			$.when(this.getRootTypes()).then($.hitch(this,this.getTypeList));
		},
		getRootTypes: function() {
			var _this = this;
			return sdt.post(this.getTypeByGroupUrl,{groupId:0},function(data){
				if(data.s==1) {
					_this.rootTypes=data.data||[];
					_this.rootTypes.push({"name":"Root标签","id":0});
					_this.replaceRootGroup();
				}
				sdt.log(data.i);
			},function(error){
				sdt.log(error);
			});
		},
		replaceRootGroup : function() {
			this.replaceItem("groupId",this.rootTypes);
		},
		replaceItem: function(key,data,id,name) {
			var replaceHelper = new TableJsValueHelper();
			for(var i in data||[]) {
				var item = data[i];
				replaceHelper.pushValue(item[id||"id"], item[name||"name"]);
			}
			this.configHelper.pushReplace(key, replaceHelper.getData());
			this.tablejs.setConfig( this.configHelper.getConfig() );
		},
		changeToNV: function(data,name,value) {
			if(data==null||data.length==0)return [];
			var temp =[];
			for(var i in data) {
				var item=data[i];
				temp.push({"name":item[name],"value":item[value]});
			}
			return temp;
		},
		getTypeList:function() {
			var _this= this;
			//$("#"+this.domId).html("<span style='float:left;width:100%;text-align:center'>没有数据</span>");
			return sdt.post(this.readTypeListUrl,{},function(data){
				if(data.s==1) {
					_this.tablejs.setData(data.data||[]);
					_this.tablejs.show();
					if(_this.videoConfig!=null) {
						_this.videoConfig.getTypes();
					}
				}
				sdt.log(data.i);
			},function(error){
				sdt.log(error);
			});
		},
		editType : function (evt) {
			var video = this.tablejs.getValuesOn($(evt.target));
			var option = {
					  title:"编辑类型信息",
					  message:"请输入视频类型相关信息",
					  form :[{key:"id",label:"类型ID",type:"readonly",value:video["id"]},
					         {key:"groupId",label:"类型分组",type:"select",value:this.changeToNV(this.rootTypes,"name","id"),selected:video["groupId"]},
						     {key:"name",label:"类型名称",type:"text",value:video["name"]}],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subEditType),name:"确定"}]
					};
			this.showDialog(option);
		},
		deleteType : function (evt) {
			var video = this.tablejs.getValuesOn($(evt.target));
			var option = {
					  title:"删除视频类型信息",
					  message:"确定要删除该视频类型吗?",
					  form :[{key:"id",label:"类型ID",type:"readonly",value:video["id"]}, 
						     {key:"name",label:"类型名称",type:"readonly",value:video["name"]}],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subDeleteType),name:"确定"}]
					};
			this.showDialog(option);
		},
		createType : function () {
			var option= {
					  title:"创建新类型",
					  message:"请输入视频类型相关信息",
					  form :[ 
					         {key:"groupId",label:"类型分组",type:"select",value:this.changeToNV(this.rootTypes,"name","id")},
					         {key:"name",label:"类型名称",type:"text",value:"",description:"名称描述"}
					        ],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subCreateType),name:"确定"}]
					};
			this.showDialog(option);
		},
		subCreateType : function(data) {
			if(!this.checkString(data["name"])) {
				sdt.log("请输入类型名称");
				return false;
			}
			if(!this.checkString(data["groupId"])) {
				sdt.log("请选择分组");
				return false;
			}
			this.loadingHelper.show("正在创建视频类型信息,请稍后...");
			var dtd=sdt.post(this.createTypeUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			$.when(dtd).done($.hitch(this,this.load));
		},
		subEditType : function (data) {
			if(!this.checkString(data["id"])) {
				sdt.log("视频类型ID不能为空");
				return false;
			}
			if(!this.checkString(data["name"])) {
				sdt.log("请输入类型名称");
				return false;
			}
			if(!this.checkString(data["groupId"])) {
				sdt.log("请选择分组");
				return false;
			}
			this.loadingHelper.show("正在保存视频类型信息,请稍后...");
			var dtd=sdt.post(this.modifyTypeUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			$.when(dtd).done($.hitch(this,this.load));
		},
		subDeleteType : function (data) {
			if(!this.checkString(data["id"])) {
				sdt.log("视频类型ID不能为空");
				return false;
			}
			this.loadingHelper.show("正在删除视频类型信息,请稍后...");
			var dtd=sdt.post(this.deleteTypeUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			$.when(dtd).done($.hitch(this,this.load));
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
		showDialog: function(data) {
			var dialog = new DialogModal(data);
			dialog.init();
			dialog.show();
		},
		checkString: function( value) {
			return value!=null&&value.length>0;
		}
}