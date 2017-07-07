$(document).ready(function(){
	var register = new Register();
	register.bindEvent();
});
function Register() {
	this.errDom = $("#errorMsgId");
	this.nameDom=$("#username");//email
	this.nickDom=$("#nickname");
	this.passDom=$("#password");
	this.repassDom=$("#repassword");
	
	this.registerBtn=$("#registerBtn");
	this.registerUrl = "user/register";
}
Register.prototype = {
	bindEvent : function() {
		this.registerBtn.unbind("click");
		this.registerBtn.bind("click",$.hitch(this,this.register));
	},
	register : function () {
		var email =this.nameDom.val();
		var nickname = this.nickDom.val();
		var password = this.passDom.val();
		var repassword = this.repassDom.val();
		if(ds.isEmpty(email)) {
			this.nameDom.focus();
			ds.error(this.errDom,"邮箱不能为空");
			return;
		}
		if(!ds.isEmail(email)) {
			this.nameDom.focus();
			ds.error(this.errDom,"邮箱格式不正确");
			return;
		}
		if(ds.isEmpty(nickname)) {
			this.nickDom.focus();
			ds.error(this.errDom,"用户昵称不能为空");
			return;
		}
		if(ds.isEmpty(password)) {
			this.passDom.focus();
			ds.error(this.errDom,"用户密码不能为空");
			return;
		}
		if(ds.isEmpty(repassword)) {
			this.repassDom.focus();
			ds.error(this.errDom,"请再次输入密码");
			return;
		}
		if(password != repassword) {
			this.repassDom.focus();
			ds.error(this.errDom,"两次输入的密码不一致");
			return;
		}
		ds.info(this.errDom,"正在登陆请稍后...");
		var data = {
				account:email,
				nickname:nickname,
				password:password
		};
		ds.post(this.registerUrl,data,$.hitch(this,this.success),$.hitch(this,this.error));
	},
	success : function (data) {
		if(data.s==1) {
			ds.info(this.errDom,data.i||"数据操作成功");
			window.location.href="pages/login.jsp"
			
		} else {
			ds.error(this.errDom,data.i||"数据操作失败");
		}
	},
	error : function(data) {
		ds.error(this.errDom,data.i||"操作失败,服务器忙...");
	}
}