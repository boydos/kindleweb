<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<jsp:include page="../dependency/comcss.jsp" flush="true" />
<jsp:include page="../dependency/comjs.jsp" flush="true" />
<title>纵横数据中心</title>
</head>
<body class="page-header-fixed">
<jsp:include page="../dependency/notyDependency.jsp" flush="true"/>
<jsp:include page="banner.jsp" flush="true" />
<div class="page-container row-fluid">
<jsp:include page="leftMenu.jsp" flush="true" />
