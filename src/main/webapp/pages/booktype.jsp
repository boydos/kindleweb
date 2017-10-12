<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<jsp:include page="base/header.jsp"/>
<div class="page-content">
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span12">
				<!-- BEGIN PAGE TITLE & BREADCRUMB-->
				<h3 class="page-title">
					用户中心 <small>书籍分组</small>
				</h3>
				<ul class="breadcrumb">
					<li><i class="icon-home"></i><a href="pages/home.jsp">Home</a>
						<i class="icon-angle-right"></i></li>
					<li><a href="#">书籍分组</a></li>
					<li class="pull-right no-text-shadow"></li>
				</ul>
				<!-- END PAGE TITLE & BREADCRUMB-->
			</div>
		</div>
		<div id="dashboard">
			<div class="portlet box blue tabbable">
				<div class="portlet-title">
					<div class="caption"><i class="icon-reorder"></i>书籍分组</div>
					<div class="tools">
						<a id="createBookType" style="color:white;text-decoration: none;" href="javascript:void(0);">
							<i class="icon-plus"></i><span style="margin-left:5px">创建分组</span>
						</a>
					</div>
				</div>
				<div class="portlet-body">
					<div id="bookTypeListId" class="row-fluid"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<jsp:include page="dependency/tableDependency.jsp"/>
<jsp:include page="dependency/dialogDependency.jsp"/>
<script src="js/customer/booktype.js"></script>
<jsp:include page="base/footer.jsp"/>