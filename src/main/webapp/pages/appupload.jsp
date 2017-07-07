<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="dependency/fileDependency.jsp" />
<style>
.topPadding {
	padding-top:7px;
}
</style>
<div id="appupload" class="modal hide fade in" tabindex="-1"
	role="dialog" aria-labelledby="appTitleId" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true"></button>
		<h3 id="appTitleId">应用上传</h3>
	</div>
	<div class="modal-body">
		<div class="form-horizontal">
			<div class="control-group">
				<label class="control-label">应用ID</label>
				<div class="controls">
					<div id="appID" class="topPadding"></div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">应用名称</label>
				<div class="controls">
					<div class="topPadding" id="appNameId"></div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">应用大小</label>
				<div class="controls">
					<div class="topPadding" id="appSizeId"></div>
				</div>
			</div>

			<div class="control-group">
				<label class="control-label">选择应用</label>
				<div class="controls">
					<form style="margin:0px 0px 0px 0px" id="appFormId" method="post" action="javascript:void(0)"
						enctype="multipart/form-data" class="form-horizontal">
						<span class="btn fileinput-button"> <i class="icon-plus icon-white"></i>
						 <span id="appFileInfoId">选择文件（apk）...</span>
						<input id="uploadFilesId" type="file" name="files"> <!-- name="files[]" multiple -->
						</span>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<a id="saveBtnId" href="javascript:void(0)" data-dismiss="modal"
			class="btn blue"><i class="icon-ok"></i> 保存</a> <a
			href="javascript:void(0)" class="btn" aria-hidden="true"
			data-dismiss="modal">关闭</a>
	</div>
</div>

<script src="js/customer/appupload.js"></script>
