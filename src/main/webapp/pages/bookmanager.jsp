<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<jsp:include page="base/header.jsp"/>
<div class="page-content">
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span12">
				<!-- BEGIN PAGE TITLE & BREADCRUMB-->
				<h3 class="page-title">
					用户中心 <small>书籍管理</small>
				</h3>
				<ul class="breadcrumb">
					<li><i class="icon-home"></i><a href="pages/home.jsp">Home</a>
						<i class="icon-angle-right"></i></li>
					<li><a href="#">书籍管理</a></li>
					<li class="pull-right no-text-shadow"></li>
				</ul>
				<!-- END PAGE TITLE & BREADCRUMB-->
			</div>
		</div>
		<div id="dashboard">
			<div class="portlet box blue tabbable">
				<div class="portlet-title">
					<div class="caption"><i class="icon-reorder"></i>书籍管理</div>
				</div>
				<div class="portlet-body form">
					<div class="tabbable portlet-tabs">
						 <ul class="nav nav-tabs">
								<li><a href="#booklistTab" data-toggle="tab">书籍列表</a></li>
								<li class="active"><a href="#addBookTab" data-toggle="tab">添加书籍</a></li>
						</ul>
						<div class="tab-content">
						 	<div class="tab-pane" id="booklistTab">
						    </div>
						  　　<div class="tab-pane active form-horizontal" id="addBookTab">
						  			<div class="control-group">
										<label class="control-label">书籍名称</label>
										<div class="controls">
											<input class="span6 m-wrap" id="bookNameId"  type="text"/>
											<span class="help-inline">"XXX书籍"</span>
										</div>		
									</div>
									<div class="control-group">
										<label class="control-label">小副标题</label>
										<div class="controls">
											<input class="span6 m-wrap" length="10" id="bookSubNameId"  type="text"/>
											<span class="help-inline">"书籍"</span>
										</div>		
									</div>
									<div class="control-group">
										<label class="control-label">书籍作者</label>
										<div class="controls">
											<input class="span6 m-wrap" length="10" id="bookAuthorId"  type="text"/>
										</div>		
									</div>
									<div class="control-group">
										<label class="control-label">书籍简介</label>
										<div class="controls">
											<textarea class="span6 m-wrap" id="bookDescriptionId"></textarea>
										</div>		
									</div>
									<div class="control-group">
										<label class="control-label">书籍分类</label>
										<div class="controls">
											<div id="videTypeSelectedId" style="position: absolute;margin-left: 10px;" class="span6">
											</div>
										</div>		
									</div>
									<div class="control-group">
										<label class="control-label">书籍封面</label>
										<div class="controls">
											<form id="previewFormId"method="post" enctype="multipart/form-data" class="form-horizontal">
												<span style="height:150px;"class="btn fileinput-button">
													<div class="control-label blog-img blog-tag-data" id="previewImgId">
													</div>
													<input id="previewId" type="file" name="files">
												</span>
											</form>
										</div>		
									</div>
									<div class="control-group">
										<label class="control-label">书籍路径</label>
										<div class="controls">
											<form id="fileFormId" method="post" action="javascript:void(0)" enctype="multipart/form-data" class="form-horizontal">
												<span class="btn fileinput-button">
													<i class="icon-plus icon-white"></i>
													<span id="fileInfoId">选择文件（mobi|txt）...</span>
													<input id="uploadBtnId" type="file" name="files" ><!-- name="files[]" multiple -->
												</span>
											</form>
										</div>		
									</div>
									<div class="form-actions">
									    <a id="saveBtnId" href="javascript:void(0)" class="btn blue"><i class="icon-ok"></i> 保存</a>
									    <a id="cancelBtnId" href="javascript:void(0)" class="btn"><i class="icon-off"></i> 重置</a>				
									</div>
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
<jsp:include page="dependency/fileDependency.jsp"/>
<script src="js/customer/bookmanager.js"></script>
<jsp:include page="base/footer.jsp"/>