$(function(){
	var userlist= new UserList();
	var userRoles = new UserRoles(userlist);
	$.when(userRoles.getRoles()).then($.hitch(userlist,userlist.load));
});
function UserList() {
	this.domId="userlist";
	this.readUserListUrl="user/getUsers";
	this.createUserUrl="user/createUser";
	this.deleteUserUrl="user/deleteUser";
	this.updateUserUrl="user/updateUser"
	this.createBtn=$("#createUserBtn");
	this.tablejs = new TableJs(this.domId);
	this.configHelper = new TableJsConfigHelper();
	this.loadingHelper = new LoadingHelper();
	this.initTable();
	this.bindEvent();
	this.roles=[];
}
UserList.prototype = {
		bindEvent: function() {
			this.createBtn.unbind("click");
			this.createBtn.bind("click",$.hitch(this,this.createUser));
		},
		initTable : function () {
			this.tablejs.pushHead("ID","id");
			this.tablejs.pushHead("账号","account");
			this.tablejs.pushHead("昵称","nickname");
			this.tablejs.pushHead("角色","roleId");
			this.tablejs.pushHead("日期","date");
			this.tablejs.pushHead("操作","operation")
			this.configHelper.setServerUrl(this.readUserListUrl);
			this.configHelper.setFenYe(true);
			this.configHelper.setSearchEnable(false);
			this.configHelper.setCheckBox(false,"checkbox", true);// 设置启用 checkbox
			var btnHelper = new TableJsKeyValueHelper();
			btnHelper.pushValue("id", ["-1"],false);
			this.configHelper.pushBtn("operation", "编辑", $.hitch(this,this.editUser), "btn-sm blue btn", btnHelper.getData()); 
			this.configHelper.pushBtn("operation", "删除", $.hitch(this,this.deleteUser), "btn-sm red btn", btnHelper.getData());
			this.tablejs.setConfig( this.configHelper.getConfig());
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
		replaceRoles : function() {
			this.replaceItem("roleId",this.roles);
		},
		updateRoles : function (data) {
			this.roles = data||[];
			this.replaceRoles();
			this.tablejs.show();
		},
		load : function () {
			this.getUsers();
		},
		createUser : function () {
			var option= {
					  title:"创建用户",
					  message:"请输入相关用户信息",
					  form :[{key:"account",label:"账号",type:"text",value:"",description:"用户账号"},
						     {key:"nickname",label:"昵称",type:"text",value:"",description:"用户昵称"},
					         {key:"roleId",label:"角色",type:"select",value:this.changeToNV(this.roles,"name","id"),description:"用户角色"},
					         {key:"password",label:"密码",type:"password",value:""},
					         {key:"repassword",label:"再次输入密码",type:"password",value:""}
					        ],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subCreate),name:"确定"}]
					}
			ds.showDialog(option);
		},
		editUser :function (evt) {
			console.info("edit");
			var user=this.tablejs.getValuesOn($(evt.target));
			var option= {
					  title:"编辑用户",
					  message:"请输入相关用户信息",
					  form :[{key:"id",label:"ID",type:"hidden",value:user["id"]},
						     {key:"nickname",label:"昵称",type:"text",value:user["nickname"],description:"用户昵称"},
					         {key:"roleId",label:"角色",selected:user["roleId"],type:"select",value:this.changeToNV(this.roles,"name","id"),description:"用户角色"},
					         {key:"date",label:"日期",type:"readonly",value:user["date"]}
					        ],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subEdit),name:"确定"}]
					}
			ds.showDialog(option);
		},
		deleteUser:function(evt) {
			var user=this.tablejs.getValuesOn($(evt.target));
			var roleName="--";
			for(var i in this.roles||[]) {
				var id = this.roles[i]["id"];
				if(id == user["roleId"]) {
					roleName= this.roles[i]["name"];
					break;
				}
			}
			var option= {
					  title:"删除用户",
					  message:"确定要删除该用户吗？",
					  form :[{key:"id",label:"ID",type:"readonly",value:user["id"]},
						     {key:"nickname",label:"昵称",type:"readonly",value:user["nickname"]},
					         {key:"roleId",label:"角色",value:roleName,type:"readonly"},
					         {key:"date",label:"日期",type:"readonly",value:user["date"]}
					        ],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subDelete),name:"确定"}]
					};
			ds.showDialog(option);
		},
		subCreate:function (data) {
			if(ds.isEmpty(data["account"])) {
				ds.log("用户邮箱不能为空");
				return false;
			}
			if(!ds.isEmail(data["account"])) {
				ds.log("用户邮箱格式不正确");
				return false;
			}
			if(ds.isEmpty(data["nickname"])) {
				ds.log("用户昵称不能为空");
				return false;
			}
			if(data["roleId"]==-1) {
				ds.log("用户角色不能为空");
				return false;
			}
			if(ds.isEmpty(data["password"])) {
				ds.log("用户密码不能为空");
				return false;
			}
			if(ds.isEmpty(data["repassword"])) {
				ds.log("请再次输入密码");
				return false;
			}
			if(data["repassword"]!=data["password"]) {
				ds.log("两次输入的密码不一致");
				return false;
			}
			this.loadingHelper.show("正在创建用户信息...");
			ds.post(this.createUserUrl,data,$.hitch(this,this.success),$.hitch(this,this.close));
		},
		subEdit: function (data) {
			console.info("update",data);
			this.loadingHelper.show("正在更新用户信息...");
			ds.post(this.updateUserUrl,data,$.hitch(this,this.success),$.hitch(this,this.close));
		},
		subDelete: function(data) {
			this.loadingHelper.show("正在删除用户信息...");
			ds.post(this.deleteUserUrl,data,$.hitch(this,this.success),$.hitch(this,this.close));
		},
		getUsers:function() {
			/*var _this= this;
			this.loadingHelper.show("正在获取用户信息...");
			ds.post(this.readUserListUrl,{},function(data){
				if(data.s==1) {
					_this.tablejs.setData(data.data);
					_this.tablejs.show();
				}
				_this.loadingHelper.hide();
			},function(error){
				ds.log(error);
				_this.loadingHelper.hide();
			});*/
			this.tablejs.show(true);
		},
		success : function (data) {
			this.loadingHelper.hide();
			if(data["s"] ==1) {
				this.load();
			}
		},
		close : function(data) {
			this.loadingHelper.hide();
			ds.log(data["i"]||"服务器忙...");
		}
}

function UserRoles( userlist ) {
	this.readUserRolesUrl="user/getRoles";
	this.updateRoleUrl="user/updateRole";
	this.userlist = userlist;
	this.tablejs = new TableJs("rolelist");
	this.configHelper = new TableJsConfigHelper();
	this.loadingHelper = new LoadingHelper();
	this.initTable();
}
UserRoles.prototype = {
		initTable: function() {
			this.tablejs.pushHead("ID","id");
			this.tablejs.pushHead("名称","name");
			this.tablejs.pushHead("日期","date");
			this.tablejs.pushHead("操作","operation");
			this.configHelper.setFenYe(true);
			this.configHelper.setCheckBox(false,"checkbox", true);
			var btnHelper = new TableJsKeyValueHelper();
			btnHelper.pushValue("id", ["-1"],false);
			this.configHelper.pushBtn("operation", "编辑", $.hitch(this,this.editRole), "btn-sm blue btn", btnHelper.getData()); 
			//this.configHelper.pushBtn("operation", "删除", $.hitch(this,this.deleteUser), "btn-sm red btn", btnHelper.getData());
			this.tablejs.setConfig( this.configHelper.getConfig());
		},
		updateUserRoles: function (data) {
			this.userlist.updateRoles(data);
		},
		getRoles: function () {
			var _this= this;
			this.loadingHelper.show("正在获取角色信息...");
			return ds.post(this.readUserRolesUrl,{},function(data){
				if(data.s==1) {
					_this.updateUserRoles(data.data);
					_this.tablejs.setData(data.data);
					_this.tablejs.show();
				}
				_this.loadingHelper.hide();
			},$.hitch(this,this.close));
		},
		editRole :function (evt) {
			var role=this.tablejs.getValuesOn($(evt.target));
			var option= {
					  title:"编辑角色",
					  message:"请输入相关角色信息",
					  form :[{key:"id",label:"ID",type:"hidden",value:role["id"]},
						     {key:"name",label:"名称",type:"text",value:role["name"],description:"角色名"},
					         {key:"date",label:"日期",type:"readonly",value:role["date"]}
					        ],
					  buttons:[{css:"btn blue",method:$.hitch(this,this.subEdit),name:"确定"}]
					}
			ds.showDialog(option);
		},
		subEdit : function (data) {
			if(ds.isEmpty(data["name"])) {
				ds.log("角色名称不能为空");
				return;
			}
			this.loadingHelper.show("正在更新角色信息...");
			ds.post(this.updateRoleUrl,data,$.hitch(this,this.success),$.hitch(this,this.close));
		},
		success : function (data) {
			this.loadingHelper.hide();
			if(data["s"] ==1) {
				this.getRoles();
			}
		},
		close : function(data) {
			ds.log(data["i"]||"服务器忙...");
			this.loadingHelper.hide();
		}
		
}