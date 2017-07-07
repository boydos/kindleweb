<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!-- topbar starts -->
<div id="leftMenuId" class="page-sidebar nav-collapse collapse">

	<!-- BEGIN SIDEBAR MENU -->

	<ul class="page-sidebar-menu">

		<li>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<div class="sidebar-toggler hidden-phone"></div> <!-- BEGIN SIDEBAR TOGGLER BUTTON -->

		</li>

		<li>
			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->

			<form class="sidebar-search">

				<div class="input-box">

					<a href="javascript:;" class="remove"></a> <input type="text"
						placeholder="Search..." /> <input type="button" class="submit"
						value=" " />

				</div>

			</form> <!-- END RESPONSIVE QUICK SEARCH FORM -->

		</li>
		<li class="start active">
		   <a href="pages/home.jsp">
		     <i class="icon-home"></i> 
		     <span class="title">Dashboard</span> 
		     <span class="selected"></span>
		   </a>
		</li>

		<li class="">
		   <a href="javascript:;"> 
			   <i class="icon-cogs"></i>
			   <span class="title">Layouts</span>
			   <span class="arrow "></span>
		   </a>
		   <ul class="sub-menu">
		     <li class=""><a href="layout_horizontal_sidebar_menu.html">Horzontal & Sidebar Menu</a></li>
	         <li><a href="layout_horizontal_menu1.html"> Horzontal Menu1</a></li>
		   </ul>
		</li>
		<li>
			<a class="active" href="javascript:;">
				<i class="icon-sitemap"></i>
				<span class="title">3 Level Menu</span>
				<span class="arrow "></span>
			</a>
			<ul class="sub-menu">
				<li>
				    <a href="javascript:;"> Item 1 <span class="arrow"></span></a>
					<ul class="sub-menu">
						<li><a href="#">Sample Link 1</a></li>
						<li><a href="#">Sample Link 2</a></li>
						<li><a href="#">Sample Link 3</a></li>
					</ul>
			   </li>
			   <li>
			   		<a href="javascript:;"> Item 1 <span class="arrow"></span></a>
					<ul class="sub-menu">
						<li><a href="#">Sample Link 1</a></li>
						<li><a href="#">Sample Link 1</a></li>
						<li><a href="#">Sample Link 1</a></li>
					</ul>
			   </li>
		       <li><a href="#"> Item 3 </a></li>
			</ul>
		</li>
</ul>

	<!-- END SIDEBAR MENU -->
<script type="text/javascript" src="js/customer/leftmenu.js"></script>
</div>
