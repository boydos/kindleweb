$(document).ready(function(){
	var login = new Login();
	login.bindEvent();
});
function Login() {
	this.errDom = $("#errorMsgId");
	this.nameDom=$("#username");
	this.passDom=$("#password");
	this.rmbDom=$("#remember");
	
	this.signBtn=$("#signBtn");
	this.loginUrl = "user/login";
	this.goHomeUrl ="pages/home.jsp";
}
Login.prototype = {
	bindEvent : function() {
		this.signBtn.unbind("click");
		this.signBtn.bind("click",$.hitch(this,this.login));
	},
	login : function () {
		var username =this.nameDom.val();
		var password = this.passDom.val();
		var remember = this.rmbDom.attr("checked")=="checked";
		ds.info(this.errDom,"正在登陆请稍后...");
		var data = {
				account:username,
				password:password
		};
		ds.post(this.loginUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
	},
	success : function (data) {
		if(data.s==1) {
			ds.info(this.errDom,data.i||"数据操作成功");
			if(data["token"]!=null)$.cookie("user_token_for_zongheng",data.token);
			window.location.href=this.goHomeUrl;
		} else {
			ds.error(this.errDom,data.i||"数据操作失败");
		}
	},
	error : function(data) {
		ds.error(this.errDom,data.i||"操作失败,服务器忙...");
	}
}