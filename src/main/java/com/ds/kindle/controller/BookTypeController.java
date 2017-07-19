package com.ds.kindle.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ds.json.JsonModel;
import com.ds.kindle.service.BookService;
import com.ds.kindle.utils.JsonHelper;
import com.ds.utils.StringUtils;

@Controller
@RequestMapping("/book")
public class BookTypeController {

	@Autowired
	BookService bookService;
	
	@RequestMapping(value="getBookTypes",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getBookTypes() {
		List<JsonModel> types = bookService.getBookTypes();
		JsonModel response = JsonHelper.getSuccessModel("书籍类型获取成功");
		response.set("data", types);
		return response.toJson();
	}
	@RequestMapping(value="getBookTypeByGroup",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getBookTypeByGroup(String groupId) {
		if(!StringUtils.isNumber(groupId)) {
			return JsonHelper.getError("书籍类型获取失败");
		}
		List<JsonModel> types = bookService.getBookTypeByGroup(Integer.parseInt(groupId));
		JsonModel response = JsonHelper.getSuccessModel("书籍类型获取成功");
		response.set("data", types);
		return response.toJson();
	}
	@RequestMapping(value="getBookTypeWithoutRoot",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getBookTypeWithoutRoot() {
		List<JsonModel> types = bookService.getBookTypeWithoutGroup(0);
		JsonModel response = JsonHelper.getSuccessModel("视频类型获取成功");
		response.set("data", types);
		return response.toJson();
	}

	@RequestMapping(value="createBookType",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String createBookType(String name,String groupId) {
		if(StringUtils.isEmpty(name)) {
			return JsonHelper.getError("请输入类型名称");
		}
		if(!StringUtils.isNumber(groupId)) {
			return JsonHelper.getError("请选择分组类型");
		}
		if(bookService.hasName(name)) {
			return JsonHelper.getError("书籍类型已经存在");
		}
		long ret = bookService.createBookType(name,Integer.parseInt(groupId));
		if(ret >0) {
			return JsonHelper.getSuccess("书籍类型创建成功");
		}
		return JsonHelper.getError("书籍类型创建失败");
	}
	
	@RequestMapping(value="modifyBookType",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String modifyBookType(String id,String name,String groupId) {
		if(!StringUtils.isNumber(id)) {
			return JsonHelper.getError("书籍类型不存在");
		}
		if(StringUtils.isEmpty(name)) {
			return JsonHelper.getError("请输入类型名称");
		}
		if(!StringUtils.isNumber(groupId)) {
			return JsonHelper.getError("请选择分组类型");
		}
		if(bookService.hasName(name)) {
			return JsonHelper.getError("书籍类型已经存在");
		}
		long ret = bookService.updateBookType(Integer.parseInt(id), name,Integer.parseInt(groupId));
		if(ret >0) {
			return JsonHelper.getSuccess("书籍类型修改成功");
		}
		return JsonHelper.getError("书籍类型修改失败");
	}
	
	@RequestMapping(value="deleteBookType",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String deleteBookType(String id) {
		if(!StringUtils.isNumber(id)) {
			return JsonHelper.getError("书籍类型不存在");
		}
		long ret = bookService.deleteBookType(Integer.parseInt(id));
		if(ret >0) {
			return JsonHelper.getSuccess("书籍类型删除成功");
		}
		return JsonHelper.getError("书籍类型删除失败");
	} 
}
