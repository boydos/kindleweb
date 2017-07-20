package com.ds.kindle.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.json.JsonModel;
import com.ds.kindle.dao.BookTypeDao;
import com.ds.kindle.pojo.BookType;
import com.ds.utils.DateUtil;
import com.ds.utils.StringUtils;

@Service("bookService")
public class BookService {
	@Autowired
	private BookTypeDao bookTypeDao;
	
	//-------------bookType DAO-------
	public List<JsonModel> getBookTypes() {
		List<BookType> typeList = bookTypeDao.getBookTypes();
		return changeBookType(typeList);
	}
	public List<JsonModel> getBookTypeByGroup(int groupId) {
		List<BookType> typeList = bookTypeDao.getBookTypeByGroup(groupId);
		return changeBookType(typeList);
	}
	public List<JsonModel> getBookTypeWithoutGroup(int groupId) {
		List<BookType> typeList = bookTypeDao.getBookTypeWithoutGroup(groupId);
		return changeBookType(typeList);
	}
	public long deleteBookType(int id) {
		return bookTypeDao.deleteBookType(id);
	}
	public boolean hasName(String name) {
		if(StringUtils.isEmpty(name)) return false;
		List<BookType> list = bookTypeDao.getBookTypeByName(name);
		return !StringUtils.isEmpty(list);
	}
	public int createBookType(String name,int groupId) {
		BookType  type = new BookType();
		type.setName(name);
		type.setGroupId(groupId);
		return createBookType(type);
	}
	public int updateBookType(int id,String name,int groupId) {
		BookType  type = new BookType();
		type.setId(id);
		type.setName(name);
		type.setGroupId(groupId);
		return updateBookType(type);
	}
	
	private int updateBookType(BookType type) {
		if(type !=null) {
			type.setDate(DateUtil.date2String(new Date()));
		}
		return bookTypeDao.updateBookType(type);
	}
	private int createBookType(BookType type) {
		if(type !=null) {
			type.setDate(DateUtil.date2String(new Date()));
		}
		return bookTypeDao.insertBookType(type);
	}
	
	private List<JsonModel> changeBookType(List<BookType> types) {
		List<JsonModel> list = new ArrayList<JsonModel>();
		if(StringUtils.isEmpty(types)) return list;
		for(BookType type : types) {
			if(type == null) continue;			
			list.add(type.toModel());
		}
		return list;
	}
}
