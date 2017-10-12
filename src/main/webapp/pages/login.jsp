<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<jsp:include page="dependency/comcss.jsp" flush="true" />
<jsp:include page="dependency/comjs.jsp" flush="true" />
<link rel="stylesheet" href="css/customer/login-soft.css" />
<title>纵横数据中心</title>
</head>
<body class="login">
	<jsp:include page="dependency/notyDependency.jsp" flush="true" />

	<div class="logo"></div>

	<div class="content row-fluid">
		<form class="form-vertical login-form" action="javascript:;"
			method="post">
			<h3 class="form-title">用户登陆中心</h3>
			<div id="errorMsgId">
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">用户账号</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-user"></i> 
						<input id="username" class="m-wrap placeholder-no-fix" type="text" placeholder="用户账号" name="username" />
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">用户密码</label>
				<div class="controls">
					<div class="input-icon left">
						<i class="icon-lock"></i> 
						<input id="password" class="m-wrap placeholder-no-fix" type="password" placeholder="用户密码" name="password" />
					</div>
				</div>
			</div>
			<div class="form-actions" style="margin-left: -10px">
				<label class="checkbox"> 
					<input id="remember"style="margin-top: 1px;"type="checkbox"> <span>记住</span>
				</label> 
				<a id="signBtn" href="javascript:void(0)" class="btn blue pull-right">登陆 <i class="icon-signin"></i></a>
			</div>
			<div class="forget-password">
				<h4>忘记密码 ?</h4>
				<p>
					不用担心, 点击 <a href="javascript:;" class="" id="forget-password">这里</a>重置您的密码.
				</p>
			</div>
			<div class="create-account">
				<p>
					尚未拥有账号 ?&nbsp; <a href="pages/register.jsp" id="register-btn" class="">注册新用户</a>
				</p>
			</div>
			<div style="bottom: 0px;position: absolute;color: white;">2017 &copy; ZONGHENG BY DS.</div>
		</form>
	</div>
	<script src="js/customer/login.js"></script>
	<div class="footer" style="width: 100%;text-align: center;">
		
		<div class="footer-tools">
			<span class="go-top"> <i class="icon-angle-up"></i></span>
		</div>
	</div>
</body>
</html>