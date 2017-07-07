
$(document).ready(function(){
  var leftmenu = new LeftMenu ("leftMenuId");
  leftmenu.init();
});

function LeftMenu (id) {
	this.parentDom=$("#"+id)
	this.menuDom=$('<ul class="page-sidebar-menu"></ul>');
	
	this.menuData =[
	           { url:"pages/home.jsp",title:"首页",icon:"icon-home"},
	           { title:"用户中心",icon:"icon-cogs",sub:[ {url:"pages/userlist.jsp",title:"用户管理"}]}
	     ];
	this.currentUrl=window.location.pathname;
	this.defaultUrl = this.menuData[0]["url"]||"pages/home.jsp";
}
LeftMenu.prototype ={
		initTogglerButton : function () {
			$('<li><div class="sidebar-toggler hidden-phone"></div></li>').appendTo(this.menuDom);
		},
		initSearchButton : function () {
			var box = $('<li><form class="sidebar-search"><div class="input-box"></div></form></li>');
			var div =box.find("div");
			$('<a href="javascript:;" class="remove"></a>').appendTo(div);
			$('<input type="text" placeholder="Search..." />').appendTo(div);
			$('<input type="button" class="submit" value=" " />').appendTo(div);
			box.appendTo(this.menuDom);
		},
		init : function() {
			this.parentDom.html('');
			this.menuDom.appendTo(this.parentDom);
			this.initTogglerButton();
			this.initSearchButton();
			this.initMenu();
		},
		setData: function (data) {
			this.menuData = data;
		},
		initMenu : function() {
			$.each(this.menuData,$.hitch(this,this.hitchGetMenu,this.menuDom));
			
			if(this.menuDom.find(".active").length==0) {
				var search =false,pos=0;
				var selectDom=this.menuDom.find("a[href='"+this.defaultUrl+"']:eq(0)");
				selectDom.parents("li").addClass("active");
				selectDom.parents(".arrow").addClass("open");
				if(selectDom.find(".selected").length==0) {
					 $('<span class="selected"></span>').appendTo(selectDom);
				}
			}
			
		},
		checkUrl:function (item,selecturl){
			if(item["url"]== selecturl) {
				return true;
			} else {
				var search =false;
				if(item["sub"]&&item.sub.length>0) {
					$.each(item.sub,$.hitch(this,function(index,item){
						if(this.checkUrl(item,selecturl)){
							search= true;
						};
					}));
				}
				return search;
			}

		},
		hitchGetMenu: function(parentDom,index,item) {
			this.getMenu(item,parentDom);
		},
		getMenu: function(item,parentDom) {
			var selected = false;
			if(item==null)return false;
			if(this.endWith(this.currentUrl,item.url)) selected =true;
			var liDom=$("<li></li>");
			var aDom=$('<a href="javascript:;"></a>');
			var iconDom=$('<i class="icon-home"></i>');
			var titleDom=$('<span class="title"></span> ');
			 liDom.appendTo(parentDom);
			 aDom.appendTo(liDom);
			 if(item["icon"]){
				 iconDom.attr("class",item.icon);
				 iconDom.appendTo(aDom);
			 }
			 titleDom.appendTo(aDom);
			 item["url"]&&aDom.attr('href',item.url);
			 item["title"]&&titleDom.html(item.title);
			 
			 if(item["sub"]&& item.sub.length>0) {
				 var arrowDom=$('<span class="arrow"></span>');
				 arrowDom.appendTo(aDom);				 
				 var submenu =$('<ul class="sub-menu"></ul>');
				 submenu.appendTo(liDom);
				 var _this =this;
				 $.each(item["sub"],function(index,item) {
					 if(_this.getMenu(item,submenu)) {
						 selected =true;
					 }
				 });
				 if(selected)arrowDom.addClass("open");
			 } else {
				 
			 }
			 if(selected) {
				 liDom.addClass("active");
				 $('<span class="selected"></span>').appendTo(aDom);
			 }
			
			 return selected;
		},
		endWith : function (s1,s2) {
	        if(s1==null)return false;
	        if(s2==null)return false;
	        if(s1.length<s2.length)
	            return   false;
	        if(s1==s2)
	            return   true;
	        if(s1.substring(s1.length-s2.length)==s2)
	            return   true;
	        return   false;
	    }
		
}