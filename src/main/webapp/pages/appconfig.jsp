<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="base/header.jsp"></jsp:include>
<style>
.portlet-tabs .nav-tabs > li > a {
	color:#fff;
}
.portlet-tabs .nav-tabs > li > a:hover {
	color:#000;
}
</style>
<jsp:include page="dependency/tableDependency.jsp"/>
<div class="page-content">
  <div class="container-fluid">
  	<div class="row-fluid">
		<div class="span12">
		<!-- BEGIN PAGE TITLE & BREADCRUMB-->
		<h3 class="page-title">应用配置 <small>detail message</small></h3>
		<ul class="breadcrumb">
			<li><i class="icon-home"></i><a href="pages/home.jsp">Home</a> <i class="icon-angle-right"></i></li>
			<li><a href="#">应用配置 </a></li>
			<li class="pull-right no-text-shadow"></li>
		</ul>
		<!-- END PAGE TITLE & BREADCRUMB-->
		</div>
	</div>
	<div id="configure">
		<div class="portlet box green tabbable">
				<div class="portlet-title">
					<div class="caption" ><i class="icon-reorder"></i>应用数据导入</div>
				</div>
				<div class="portlet-body form">
				   <div class="tabbable portlet-tabs">
					 <ul class="nav nav-tabs">
								<li class="active"><a href="#portlet_tab1" data-toggle="tab">数据库管理</a></li>
								<li><a href="#portlet_tab2" data-toggle="tab">在线数据下载</a></li>
								<li><a href="#portlet_tab3" data-toggle="tab">本地数据导入</a></li>
								<li><a href="#portlet_tab4" data-toggle="tab">应用数据管理</a></li>
					</ul>
					<div class="tab-content">
					    <!-- tab1 -->
						<div class="tab-pane active" id="portlet_tab1">
							<form action="javascript:;">
								<div class="control-group">
								   	<div class="controls">
								   		<a id="newsDbId" href="javascript:;"  class="btn blue"><i class="icon-off"></i> 清空数据库</a>
								   		<span class="help-inline">如果已存在数据库,请忽略此步骤</span>
								    </div>
						   		</div>
					   		</form>
						</div>
						<!-- tab3 -->
						<div class="tab-pane" id="portlet_tab2">
							<form action="javascript:;">
								<div class="control-group">
									<label class="control-label">保存应用到数据库</label>
								   	<div class="controls">
								   		<a id="online2DbId" href="javascript:;"  class="btn blue"><i class="icon-signin"></i> 导入网络数据</a>
								    </div>    
						   		</div>
						   		<div class="control-group">
								    <label class="control-label">保存数据到本地</label>
									<div class="controls">
									  	<input id="saveNewsPathId" name="path" data-required="1" type="text" placeholder="输入文件/文件夹路径" class="span6 m-wrap" />
										<a id="downloadNewsBtnId" href="javascript:;"  class="btn blue"><i class="icon-download-alt"></i> 保存在线数据</a>
										<span class="help-inline ok valid" for="path"></span>
					                </div>
					  			</div>
					   		</form>
						</div>
						<!-- tab2 -->
						<div class="tab-pane" id="portlet_tab3">
							<form action="javascript:;">
								<div class="control-group">
								    <label class="control-label">应用数据文件路径</label>
									<div class="controls">
									  	<input id="importNewsPathId" name="path" data-required="1" type="text" placeholder="输入文件/文件夹路径" class="span6 m-wrap" />
										<a id="newsImportBtnId" href="javascript:;"  class="btn blue"><i class="icon-signin"></i> 导入</a>
										<span class="help-inline ok valid" for="path"></span>
					                </div>
					  			</div>
					   		</form>
						</div>
						<!-- tab4 -->
						<div class="tab-pane" id="portlet_tab4">
							<form action="javascript:;">
								<div class="control-group" id="appListId"> 
								
								</div>
					   		</form>
						</div>
					</div>
				  </div>
				<jsp:include page="dependency/dialogDependency.jsp"></jsp:include>
				<jsp:include page="appupload.jsp"></jsp:include>
				
				</div><!-- //end body -->
			</div>
	</div>
  </div>
</div>
<script src="js/customer/app.js" type="text/javascript"></script>
<jsp:include page="base/footer.jsp"></jsp:include>