<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="../base/header.jsp"></jsp:include>
<div class="page-content">
  <div class="container-fluid">
  	<div class="row-fluid">
		<div class="span12">
		<!-- BEGIN PAGE TITLE & BREADCRUMB-->
		<h3 class="page-title">天气配置 <small>detail message</small></h3>
		<ul class="breadcrumb">
			<li><i class="icon-home"></i><a href="pages/home.jsp">Home</a> <i class="icon-angle-right"></i></li>
			<li><a href="#">天气配置 </a></li>
			<li class="pull-right no-text-shadow"></li>
		</ul>
		<!-- END PAGE TITLE & BREADCRUMB-->
		</div>
	</div>
	<div id="configure">
	<div class="row-fluid">

					<div class="span12">

						<div class="portlet box blue" id="form_wizard_1">

							<div class="portlet-title">

								<div class="caption">

									<i class="icon-reorder"></i> 天气离线导入 - <span class="step-title">Step 1 of 2</span>

								</div>

								<div class="tools hidden-phone">

									<a href="javascript:;" class="collapse"></a>

									<a href="#portlet-config" data-toggle="modal" class="config"></a>

									<a href="javascript:;" class="reload"></a>

								</div>

							</div>

							<div class="portlet-body form">

								<form action="#" class="form-horizontal" id="submit_form">

									<div class="form-wizard">

										<div class="navbar steps">

											<div class="navbar-inner">

												<ul class="row-fluid">

													<li class="span3">

														<a href="#tab1" data-toggle="tab" class="step active">

														<span class="number">1</span>

														<span class="desc"><i class="icon-ok"></i> 详细配置 </span>   

														</a>

													</li>

													<li class="span3">

														<a href="#tab2" data-toggle="tab" class="step">

														<span class="number">2</span>

														<span class="desc"><i class="icon-ok"></i> 信息确认</span>   

														</a>

													</li>

												</ul>

											</div>

										</div>

										<div id="bar" class="progress progress-success progress-striped">

											<div class="bar"></div>

										</div>

										<div class="tab-content">

											<div class="alert alert-error hide">

												<button class="close" data-dismiss="alert"></button>

												You have some form errors. Please check below.

											</div>

											<div class="alert alert-success hide">

												<button class="close" data-dismiss="alert"></button>

												Your form validation is successful!

											</div>

											<div class="tab-pane active" id="tab1">

												<h3 class="block">Provide your account details</h3>

												<div class="control-group">

													<label class="control-label">Username<span class="required">*</span></label>

													<div class="controls">

														<input type="text" class="span6 m-wrap" name="username"/>

														<span class="help-inline">Provide your username</span>

													</div>

												</div>

												<div class="control-group">

													<label class="control-label">Password<span class="required">*</span></label>

													<div class="controls">

														<input type="password" class="span6 m-wrap" name="password" id="submit_form_password"/>

														<span class="help-inline">Provide your username</span>

													</div>

												</div>

												<div class="control-group">

													<label class="control-label">Confirm Password<span class="required">*</span></label>

													<div class="controls">

														<input type="password" class="span6 m-wrap" name="rpassword"/>

														<span class="help-inline">Confirm your password</span>

													</div>

												</div>

												<div class="control-group">

													<label class="control-label">Email<span class="required">*</span></label>

													<div class="controls">

														<input type="text" class="span6 m-wrap" name="email"/>

														<span class="help-inline">Provide your email address</span>

													</div>

												</div>

											</div>

											<div class="tab-pane" id="tab2">

												<h3 class="block">Confirm your account</h3>

												<h4 class="form-section">Account</h4>

												<div class="control-group">

													<label class="control-label">Username:</label>

													<div class="controls">

														<span class="text display-value" data-display="username"></span>

													</div>

												</div>


											</div>

										</div>

										<div class="form-actions clearfix">

											<a href="javascript:;" class="btn button-previous">

											<i class="m-icon-swapleft"></i> Back 

											</a>

											<a href="javascript:;" class="btn blue button-next">

											Continue <i class="m-icon-swapright m-icon-white"></i>

											</a>

											<a href="javascript:;" class="btn green button-submit">

											Submit <i class="m-icon-swapright m-icon-white"></i>

											</a>

										</div>

									</div>

								</form>

							</div>

						</div>

					</div>

				</div>
	
	</div>
  </div>
</div>
<jsp:include page="formWizardDependency.jsp"/>

<jsp:include page="../base/footer.jsp"/>