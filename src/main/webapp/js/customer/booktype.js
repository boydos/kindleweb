$(function(){
	var booktype = new BookType();
	booktype.load();
});
function BookType() {
	this.domId = "bookTypeListId";
	this.domCreateBtn = $("#createBookType");
	
	this.tablejs = new TableJs(this.domId);
	this.loadingHelper = new LoadingHelper();
	this.configHelper = new TableJsConfigHelper();
	this.readTypeListUrl="book/getBookTypes";
	this.createTypeUrl="book/createBookType";
	this.modifyTypeUrl="book/modifyBookType";
	this.deleteTypeUrl="book/deleteBookType";
	this.getTypeByGroupUrl="book/getBookTypeByGroup";
	this.rootTypes = [{"name":"系统标签","id":0}];
	
	this.bookConfig = null;

	this.initTable();
	this.initEvent();
}
BookType.prototype ={
		initTable : function () {
			this.tablejs.pushHead("ID","id");
			this.tablejs.pushHead("书籍类型","name");
			this.tablejs.pushHead("分组","groupId");
			this.tablejs.pushHead("日期","date");
			this.tablejs.pushHead("操作","operation");
			this.configHelper.setFenYe(true);
			this.configHelper.setCheckBox(false,"checkbox", true);
			var btnHelper = new TableJsKeyValueHelper();
			btnHelper.pushValue("id", [""],false);
			this.configHelper.pushBtn("operation", "编辑", $.hitch(this,this.editType), "btn btn-sm blue", btnHelper.getData()); 
			btnHelper = new TableJsKeyValueHelper();
			btnHelper.pushValue("groupId", ["0"],false); 
			this.configHelper.pushBtn("operation", "删除", $.hitch(this,this.deleteType), "btn btn-sm red", btnHelper.getData()); 
			this.tablejs.setConfig( this.configHelper.getConfig() );
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
			return ds.post(this.getTypeByGroupUrl,{groupId:0},function(data){
				if(data.s==1) {
					_this.rootTypes=[];
					_this.rootTypes.push({"name":"系统标签","id":0});
					for(var i in data.data||[]) {
						_this.rootTypes.push(data.data[i]);
					}
					_this.replaceRootGroup();
				}
			},function(error){
				ds.log(error);
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
		getTypeList:function() {
			var _this= this;
			return ds.post(this.readTypeListUrl,{},function(data){
				if(data.s==1) {
					_this.tablejs.setData(data.data||[]);
					_this.tablejs.show();
				}
			},function(error){
				ds.log(error);
			});
		},
		editType : function (evt) {
			var book = this.tablejs.getValuesOn($(evt.target));
			var option = {
					  title:"编辑类型信息",
					  message:"请输入书籍类型相关信息",
					  form :[{key:"id",label:"类型ID",type:"readonly",value:book["id"]},
					         {key:"groupId",label:"类型分组",type:"select",value:ds.changeToNV(this.rootTypes,"name","id"),selected:book["groupId"]},
						     {key:"name",label:"类型名称",type:"text",value:book["name"]}],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subEditType),name:"确定"}]
					};
			this.showDialog(option);
		},
		deleteType : function (evt) {
			var book = this.tablejs.getValuesOn($(evt.target));
			var option = {
					  title:"删除书籍类型信息",
					  message:"确定要删除该书籍类型吗?",
					  form :[{key:"id",label:"类型ID",type:"readonly",value:book["id"]}, 
						     {key:"name",label:"类型名称",type:"readonly",value:book["name"]}],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subDeleteType),name:"确定"}]
					};
			this.showDialog(option);
		},
		createType : function () {
			var option= {
					  title:"创建新类型",
					  message:"请输入书籍类型相关信息",
					  form :[ 
					         {key:"groupId",label:"类型分组",type:"select",value:ds.changeToNV(this.rootTypes,"name","id")},
					         {key:"name",label:"类型名称",type:"text",value:"",description:"名称描述"}
					        ],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subCreateType),name:"确定"}]
					};
			this.showDialog(option);
		},
		subCreateType : function(data) {
			if(ds.isEmpty(data["name"])) {
				ds.log("请输入类型名称");
				return false;
			}
			if(ds.isEmpty(data["groupId"])) {
				ds.log("请选择分组");
				return false;
			}
			this.loadingHelper.show("正在创建书籍类型信息,请稍后...");
			var dtd=ds.post(this.createTypeUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			$.when(dtd).done($.hitch(this,this.load));
		},
		subEditType : function (data) {
			if(ds.isEmpty(data["id"])) {
				ds.log("书籍类型ID不能为空");
				return false;
			}
			if(ds.isEmpty(data["name"])) {
				ds.log("请输入类型名称");
				return false;
			}
			if(ds.isEmpty(data["groupId"])) {
				ds.log("请选择分组");
				return false;
			}
			this.loadingHelper.show("正在保存书籍类型信息,请稍后...");
			var dtd=ds.post(this.modifyTypeUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			$.when(dtd).done($.hitch(this,this.load));
		},
		subDeleteType : function (data) {
			if(ds.isEmpty(data["id"])) {
				ds.log("书籍类型ID不能为空");
				return false;
			}
			this.loadingHelper.show("正在删除书籍类型信息,请稍后...");
			var dtd=ds.post(this.deleteTypeUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
			$.when(dtd).done($.hitch(this,this.load));
		},
		success : function (data) {
			this.loadingHelper.hide();
			if(data.s==1) {
				ds.log(data.i||"数据操作成功");
			} else {
				ds.log(data.i||"数据操作失败");
			}
		},
		error : function(data) {
			ds.log(data.i||"操作失败,服务器忙...");
			this.loadingHelper.hide();
		},
		showDialog: function(data) {
			var dialog = new DialogModal(data);
			dialog.init();
			dialog.show();
		}
}