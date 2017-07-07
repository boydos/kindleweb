$(document).ready(function(){
	var app = new AppImport();
	app.bindClick();
	app.showApps();
});
function AppImport() {
	this.domSaveOnline=$("#online2DbId");
	this.domAppId="appListId";
	this.domAppList =$("#appListId");
	this.saveOnlineUrl="importAppFromNet";
	this.getAppsUrl = "getApps";
	this.tablejs = new TableJs(this.domAppId);
	this.configHelper = new TableJsConfigHelper();

	this.loadingHelper = new LoadingHelper();
	this.sdtProcessHelper = new SDTProcess();
	this.appupload =new AppUpload();
	this.initTable();
}
AppImport.prototype ={
		bindClick :function () {
			this.domSaveOnline.bind("click",$.hitch(this,this.saveOnlineInit));
		},
		initTable: function() {
			this.tablejs.pushHead("ID","id");
			this.tablejs.pushHead("APPID","appid");
			this.tablejs.pushHead("名称","name");
			this.tablejs.pushHead("大小","apkSize");
			this.tablejs.pushHead("操作","operation");
			this.configHelper.setServerUrl(this.getAppsUrl);
			//this.configHelper.setServerParams({"typeId":-1});
			//this.configHelper.setServerEnable(true);
			this.configHelper.setFenYe(true);
			this.configHelper.setCheckBox(false,"checkbox", true);// 设置启用 checkbox
			this.tablejs.setConfig( this.configHelper.getConfig() );
			var btnHelper = new TableJsKeyValueHelper();
			//btnHelper.pushValue("name", [""],false); 
			btnHelper.pushValue("apk", [null],true);
			this.configHelper.pushBtn("operation", "上传APK", $.hitch(this,this.upLoadFile), "btn btn-sm blue", btnHelper.getData());
			btnHelper = new TableJsKeyValueHelper();
			btnHelper.pushValue("apk", [null],false);
			this.configHelper.pushBtn("operation", "更新APK", $.hitch(this,this.upLoadFile), "btn btn-sm green", btnHelper.getData()); 

		},
		showApps : function() {
			this.tablejs.show(true);
		},
		saveOnlineInit : function () {
			var data= {
					title:"下载在线新闻",
					message:("将从网络拉取最新新闻，并保存到数据库中？"),
					buttons:[{css:"green btn-primary",method:$.hitch(this,this.saveOnline),name:"确定"}]
			};
			this.showDialog(data);
		},
		showDialog: function(data) {
			var dialog = new DialogModal(data);
			dialog.init();
			dialog.show();
		},
		saveOnline: function () {
			var option ={
					url:this.saveOnlineUrl,
					title:"开始从网络下载数据",
					msg_update:"总共$count个应用分类,正在处理第$num个分类",
					msg_success:"应用数据已成功下载到数据库中",
					msg_error:"应用数据下载失败"
				};
			this.sdtProcessHelper.start(option);
		},
		upLoadFile : function(evt) {
			console.info("upLoadFile",this.tablejs.getValuesOn( $(evt.target)));
			var data = this.tablejs.getValuesOn( $(evt.target));
			if(data ==null || data["id"]==null) return;
			this.appupload.show(data ,$.hitch(this,this.showApps));
		}
}