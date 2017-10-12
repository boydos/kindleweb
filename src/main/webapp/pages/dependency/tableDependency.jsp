<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link href="css/tableCss.css" rel="stylesheet" />
<script src="js/jquery.dataTables.min.js"></script>
<script src="js/jquery.table.extend.js"></script>
<!-- $(function () {
	
	this.tableID ="tableListId";
	tableJs = new TableJs(this.tableID);
	tableJs.pushHead("ID", "id");
	tableJs.pushHead("姓名", "name");
	tableJs.pushHead("性别1", "sex");
	tableJs.pushHead("年龄", "age");
	
	var configHelper = new TableJsConfigHelper();
	configHelper.setFenYe(true);//是否启用分页功能,默认不启用
	configHelper.setSearchEnable(true);//　是否启用搜索功能，默认启用
	configHelper.setSearchText("请输入相应搜索内容");//设置搜索框标题
	//configHelper.setServerUrl("/test/data/test");//服务器分页 设置url,会自动使用
	configHelper.setServerParams({"server":"localhost"});
	//configHelper.setServerEnable(false);//服务器分页 禁用
	// 服务器分页 默认传递参数{start:起始位置,count:长度,search:搜索内容}，返回值格式{total:数据总长度,data:[]} data为查询出的部分数据，total是所有数据的总长度
	configHelper.setCheckBox(true, "checkbox", true);// 设置启用 checkbox
	configHelper.setOperation( "myoperation", true, "操作");//设置操作列
	
	/*
	//1替换
	var replaceHelper = new TableJsValueHelper();
	replaceHelper.pushValue("日本", "日本帝国"); //日本 替换为 日本帝国
	replaceHelper.pushValue("上海", "上海的海上");// 上海 替换为 上海的海上
	//设置 value 列 应用上面的条件。
	configHelper.pushReplace("value", replaceHelper.getData());
	
	//2列之间替换
	var relationHelper = new TableJsValueHelper();
	relationHelper.pushValue("北京", "BEI JING City"); // 北京 替换为 BEI JING City
    // 设置 value == 北京 的列，name值显示BEI JING City
	configHelper.pushRelation("name", "value", relationHelper.getData());
	
	var relationHelper = new TableJsValueHelper();
	relationHelper.pushValue("bei jing", "Today")
	configHelper.pushRelation("value", "name", relationHelper.getData());*/
	
	//3 按钮事件
	var btnHelper = new TableJsKeyValueHelper();
	btnHelper.pushValue("name", ["xiaoming1","zhong guo"]); //key为name的列，值是xiaoming1或zhong guo, 
	//根据上面的条件，设置哪些列 添加 删除事件按钮， 
	configHelper.pushBtn("myoperation", "删除", deleteFunc, "btn-success btn-sm", btnHelper.getData()); 

	var relationHelper = new TableJsValueHelper();
	relationHelper.pushValue("xiaoming1", "被替换了");
	configHelper.pushRelation("sex", "name", relationHelper.getData());
	//应用配置
	tableJs.setConfig( configHelper.getConfig() );

	
	var data = [
	            {name : "tian jin", value: "天津" },
	            {name : "bei jing", value: "北京" },
	            {name : "xiaoming1", value: "上海" },
	            {name : "ri ben", value: "日本" },
	            {name : "zhong guo", value: "中国" },
	            {name : "zhong guo1", value: "中国1" }
	    ];
	//不使用服务器分页的时候起作用， 设置表格要显示的数据
	tableJs.setData(data, "name", "value");
	
	tableJs.show();
});
function deleteFunc ( evt) {
	console.info( evt );
	this.tablejs.getValuesOn($(evt.target));
	console.info("deleteFuncData",this.getValuesOn( $(evt.target))); //获取单个行的数据
	console.info("checked",this.getValues(true));//获取checkbox选中的行的数据
} -->