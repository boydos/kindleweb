<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<jsp:include page="base/header.jsp"/>
<div class="page-content">
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span12">
				<!-- BEGIN PAGE TITLE & BREADCRUMB-->
				<h3 class="page-title">
					用户中心 <small>信息管理</small>
				</h3>
				<ul class="breadcrumb">
					<li><i class="icon-home"></i><a href="pages/home.jsp">Home</a>
						<i class="icon-angle-right"></i></li>
					<li><a href="#">用户管理</a></li>
					<li class="pull-right no-text-shadow"></li>
				</ul>
				<!-- END PAGE TITLE & BREADCRUMB-->
			</div>
		</div>
		<div id="dashboard">
			<div class="portlet box blue tabbable">
				<div class="portlet-title">
					<div class="caption"><i class="icon-reorder"></i>用户管理</div>
				</div>
				<div class="portlet-body form">
					<div class="tabbable portlet-tabs">
						 <ul class="nav nav-tabs">
								<li><a href="#rolelist" data-toggle="tab">角色列表</a></li>
								<li class="active"><a href="#userlistTab" data-toggle="tab">用户列表</a></li>
						</ul>
						<div class="tab-content">
						  　　<div class="tab-pane active" id="userlistTab">
						  		<div class="row-fluid" style="margin-top:-15px">
						  			<a id="createUserBtn" class="btn-sm blue btn" href="javascript:;">创建用户</a>
						  		</div>
						  		<div class="row-fluid" id="userlist" style="margin-top:15px">
						  		
						  		</div>
						    </div>
						    <div class="tab-pane" id="rolelist">
						    </div>
						 </div>
				    </div>
				</div>
			</div>
		</div>
	</div>
</div>
<jsp:include page="dependency/tableDependency.jsp"/>
<jsp:include page="dependency/dialogDependency.jsp"/>
<script src="js/customer/userlist.js"></script>
<jsp:include page="base/footer.jsp"/>