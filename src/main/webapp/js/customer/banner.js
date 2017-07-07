/**
 * For Banner Page 
 */

$(document).ready(function(){
	App.init();
	var banner = new BannerJs();
	banner.bindEvent();
	banner.verify();
});

function BannerJs () {
	this.domName=$("#userNameId");
	this.domProfile=$("#myProfileId");
	this.domLoginOut=$("#loginOutId");
	
	this.loginOutUrl="user/loginOut";
	this.verifyTokenUrl="user/verifyToken"
	this.goLogin="pages/login.jsp"
	this.tokenKey="user_token_for_zongheng";
}
BannerJs.prototype = {
		bindEvent:function () {
			this.domLoginOut.unbind("click");
			this.domLoginOut.bind("click",$.hitch(this,this.loginOut));
		},
		goLoginJsp: function () {
			window.location.href = this.goLogin;
		},
		loginOut : function () {
			var token = $.cookie(this.tokenKey);
			if(token!=null) {
				$.cookie(this.tokenKey,null);
			}
			ds.post(this.loginOutUrl,{token:token},$.hitch(this,this.goLoginJsp),$.hitch(this,this.goLoginJsp));
		},
		verify:function () {
			var token = $.cookie(this.tokenKey);
			if(token!=null) {
				ds.post(this.verifyTokenUrl,{token:token},$.hitch(this,this.verifySuccess),$.hitch(this,this.goLoginJsp))
			} else this.goLoginJsp();
		},
		verifySuccess : function (data) {
			console.info(data);
			if(data.s==1) {
				this.domName.html(data["nickname"]);
			} else {
				this.goLoginJsp();
			}
		}
}
/*  <ul class="nav navbar-nav">
      <li class="active"> <a href="javascript:void(0);">Home</a></li>
      <li> <a href="javascript:void(0);">About</a></li>
    </ul>*/

/*$(function(){
  var bannerJs = new BannerJs ();
  bannerJs.init("/news/data/init.getSystemMenu");
});
function BannerJs () {
	// Menu Data 
	this.data = [
	             { id :"01",url:"/news/page/home",name:"首页"},
	             { id :"02",url:"/news/page/pubnews",name:"新闻发布"},
	             { id :"03",url:"/news/page/newslist",name:"新闻列表"},
	             { id :"04",url:"/news/page/config",name:"服务器配置"}
	             
	            ];
	this.menuDom = $('#menuTop');
}
BannerJs.prototype = {
		init : function ( url ) {
			var loadingHelper = new LoadingHelper();
			loadingHelper.showLoading("正在初始化系统，请稍等...");
			var _this = this;
			$.ajax({
		        "type" : "post",
		        "url" : url ,
		        "dataType" : "json",
		        "data" : {},
		        "success" : function (data) {
		               console.info("success");
		               loadingHelper.hideLoading();
					   if(data.s == 1) {
						   _this.load( data.menuid );
					   } else {
					   	noty({ text: data.i , type:"error"});
					   }
		        },
		        "error" : function (data) {
		               console.info("error");
		               loadingHelper.hideLoading();
					   noty({ text: "System Error,Please Contact your administrator" , type:"error"});
					   
		        }
			});
		},
		load : function ( ids ) {
			ids =ids ||"01,02";
			var menuData = this.getMenuData(ids);
			this.generateMenu(menuData);
		},
		// 根据id 获取 Menu 列表, ids="01,02,03" And So On
		getMenuData : function ( ids ) {
			var list= ids.split(",");
			list = list || [];
			var menuData = [];
			$.each(this.data,function( index, item) {
				for( var i=0; i<list.length; i++) {
					if( list[i] == item.id) {
						menuData.push( item );
					}
				}
			});
			return menuData;
		},
		// Get Menu Item
		getMenuItem : function ( item , selected ) {
			var liDom =$('<li></li>');
			if( selected ) {
				liDom.addClass("active");
			}
			var aDom = $('<a href="javascript:void(0);"></a>');
			aDom.addClass("menuItemA");
			aDom.attr("url",item.url);
			aDom.text( item.name );
			aDom.appendTo( liDom );
			return liDom;
		},
		// 生成 导航条
		generateMenu : function ( menuData ) {
			//[{ id, url, name}]
			menuData = menuData ||[];
			this.menuDom.empty();
			//取消所有事件
			this.menuDom.undelegate();
			
			// 当前页面路径
			var initUrl=window.location.pathname;
	        var _this=this;
	        var selected = false;
	        var itemDom = null;
	        // 生成导航数据
			$.each( menuData, function ( index, item) {
				selected = _this.endWith( initUrl, item.url);
				itemDom = _this.getMenuItem(item, selected);
				itemDom.appendTo( _this.menuDom );
			});
			//增加点击事件
			this.menuDom.delegate(".menuItemA","click", function () {
				 	var url=$(this).attr("url");
		            if( url && url != "") window.location.href=url;
			});
		},
		// Compare Two String
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
}*/