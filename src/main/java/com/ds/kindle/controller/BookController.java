package com.ds.kindle.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ds.json.JsonModel;
import com.ds.kindle.pojo.Book;
import com.ds.kindle.service.BookService;
import com.ds.kindle.utils.JsonHelper;
import com.ds.utils.StringUtils;

@Controller
@RequestMapping("book")
public class BookController {

	@Autowired
	BookService bookService;
	
	@RequestMapping(value="getBooks",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getBooks(String typeId,String start,String count,String search) {
		if(!StringUtils.isNumber(typeId)) {
			typeId ="-1";
		}
		if(!StringUtils.isNumber(start)) {
			start="0";
		}
		if(!StringUtils.isNumber(count)) {
			count="10";
		}
		List<JsonModel> books = bookService.getSearchBooks(Integer.parseInt(typeId), search, search,Integer.parseInt(start),Integer.parseInt(count));
		JsonModel response = JsonHelper.getSuccessModel("书籍数据获取成功");
		response.set("data", books);
		response.set("total", bookService.getOrBookCount(Integer.parseInt(typeId), search, search));
		return response.toJson();
	}
	
	@RequestMapping(value="getBooksByName",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getBooksByName(String name,String start,String count) {
		if(StringUtils.isEmpty(name)) {
			return JsonHelper.getError("书籍名称不能为空");
		}
		if(!StringUtils.isNumber(start)) {
			start="0";
		}
		if(!StringUtils.isNumber(count)) {
			count="10";
		}
		List<JsonModel> books = bookService.getBooksByName(name, Integer.parseInt(start), Integer.parseInt(count));
		JsonModel response = JsonHelper.getSuccessModel("书籍数据获取成功");
		response.set("data", books);
		response.set("total",bookService.getBookCountName(name));
		return response.toJson();
	}
	
	@RequestMapping(value="getBooksByAuthor",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getBooksByAuthor(String author,String start,String count) {
		if(StringUtils.isEmpty(author)) {
			return JsonHelper.getError("书籍名称不能为空");
		}
		if(!StringUtils.isNumber(start)) {
			start="0";
		}
		if(!StringUtils.isNumber(count)) {
			count="10";
		}
		List<JsonModel> books = bookService.getBooksByAuthor(author, Integer.parseInt(start), Integer.parseInt(count));
		JsonModel response = JsonHelper.getSuccessModel("书籍数据获取成功");
		response.set("data", books);
		response.set("total",bookService.getBookCountAuthor(author));
		return response.toJson();
	}
	@RequestMapping(value="register",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String register(Book book) {
		if(StringUtils.isEmpty(book.getName())) {
			return JsonHelper.getError("书籍名称不能为空");
		}
		if(StringUtils.isEmpty(book.getSubtitle())) {
			return JsonHelper.getError("书籍小标题不能为空");
		}
		if(StringUtils.isEmpty(book.getAuthor())) {
			return JsonHelper.getError("书籍作者不能为空");
		}
		if(StringUtils.isEmpty(book.getDescription())) {
			return JsonHelper.getError("书籍简介不能为空");
		}
		if(StringUtils.isEmpty(book.getImg())) {
			return JsonHelper.getError("请上传书籍封面");
		}
		if(StringUtils.isEmpty(book.getResources())) {
			return JsonHelper.getError("请上传书籍文件");
		}
		if(book.getTypeId()==-1) {
			return JsonHelper.getError("请选择书籍分类");
		}
		int ret = bookService.createBook(book);
		if(ret >0) {
			return JsonHelper.getSuccess("书籍保存成功");
		}
		return JsonHelper.getError("书籍保存失败");
	}
	@RequestMapping(value="modify",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String modify(String id,String name,String subtitle,String description,String author,String typeId) {
		if(!StringUtils.isNumber(id)) {
			return JsonHelper.getError("书籍ID不能为空");
		}
		if(StringUtils.isEmpty(name)) {
			return JsonHelper.getError("书籍名称不能为空");
		}
		if(StringUtils.isEmpty(subtitle)) {
			return JsonHelper.getError("书籍小标题不能为空");
		}
		if(StringUtils.isEmpty(author)) {
			return JsonHelper.getError("书籍作者不能为空");
		}
		if(StringUtils.isEmpty(description)) {
			return JsonHelper.getError("书籍简介不能为空");
		}
		if(!StringUtils.isNumber(typeId)) {
			return JsonHelper.getError("请选择书籍分类");
		}
		Book book = new Book();
		book.setId(Integer.parseInt(id));
		book.setName(name);
		book.setSubtitle(subtitle);
		book.setAuthor(author);
		book.setDescription(description);
		book.setTypeId(Integer.parseInt(typeId));
		int ret = bookService.updateBook(book);
		if(ret>0) {
			return JsonHelper.getSuccess("书籍信息修改成功");
		}
		return JsonHelper.getError("书籍信息修改失败");
	}
	@RequestMapping(value="delete",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String delete(String id) {
		if(!StringUtils.isNumber(id)) {
			return JsonHelper.getError("书籍ID不能为空");
		}
		int ret=bookService.deleteBook(Integer.parseInt(id));
		if(ret>0) {
			return JsonHelper.getSuccess("书籍删除成功");
		}
		return JsonHelper.getError("书籍删除失败");
	}
}
