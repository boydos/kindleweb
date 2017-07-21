package com.ds.kindle.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.json.JsonModel;
import com.ds.kindle.dao.BookDao;
import com.ds.kindle.dao.BookTypeDao;
import com.ds.kindle.pojo.Book;
import com.ds.kindle.pojo.BookType;
import com.ds.kindle.utils.MemStore;
import com.ds.utils.DateUtil;
import com.ds.utils.StringUtils;

@Service("bookService")
public class BookService {
	@Autowired
	private BookTypeDao bookTypeDao;
	@Autowired
	private BookDao bookDao;
	
	// by date
	public List<JsonModel> getBooks(int start,int length) {
		return getBooks(null,null,start, length);
	}
	public List<JsonModel> getBooksByName(String name,int start,int length) {
		return getBooks(name,null,start, length);
	}
	public List<JsonModel> getBooksByAuthor(String author,int start,int length) {
		return getBooks(null,author,start, length);
	}
	public List<JsonModel> getBooks(String name,String author,int start,int length) {
		return getBooks(-1,name,author,start, length);
	}
	public List<JsonModel> getBooks(int typeId,String name,String author,int start,int length) {
		List<Book> books = bookDao.getBooks(typeId,name,author, start, length, 0);
		return changeBook(books);
	}
	// by follow
	public List<JsonModel> getHotBooks(int start,int length) {
		return getHotBooks(null,null,start, length);
	}
	public List<JsonModel> getHotBooksByName(String name,int start,int length) {
		return getHotBooks(name,null,start, length);
	}
	public List<JsonModel> getHotBooksByAuthor(String author,int start,int length) {
		return getHotBooks(null,author,start, length);
	}
	public List<JsonModel> getHotBooks(String name,String author,int start,int length) {
		return getHotBooks(-1,name,author,start, length);
	}
	public List<JsonModel> getHotBooks(int typeId,String name,String author,int start,int length) {
		List<Book> books = bookDao.getBooks(typeId,name,author,start, length, 1);
		return changeBook(books);
	}
	
	// search
	public List<JsonModel> getSearchBooksByAuthor(String author,int start,int length) {
		return getSearchBooks(null,author,start,length);
	}
	public List<JsonModel> getSearchBooksByName(String name,int start,int length) {
		return getSearchBooks(name,null,start,length);
	}
	public List<JsonModel> getSearchBooks(String name,String author,int start,int length) {
		return getSearchBooks(-1,name,author,start,length);
	}
	public List<JsonModel> getSearchBooks(int typeId,String name,String author,int start,int length) {
		List<Book> books = bookDao.getOrBooks(typeId,name,author,start, length, 0);
		return changeBook(books);
	}
	public List<JsonModel> getSearchHotBooks(int typeId,String name,String author,int start,int length) {
		List<Book> books = bookDao.getOrBooks(typeId,name,author,start, length, 1);
		return changeBook(books);
	}
	//and count
	public int getBookCount() {
		return getBookCount(null,null);
	}
	public int getBookCountAuthor(String author) {
		return getBookCount(null,author);
	}
	public int getBookCountName(String name) {
		return getBookCount(name,null);
	}
	public int getBookCount(String name,String author) {
		return getBookCount(-1, name,author);
	}
	public int getBookCount(int typeId,String name,String author) {
		return bookDao.getBookCount(typeId, name, author);
	}
	//or count
	public int getOrBookCount() {
		return getOrBookCount(null,null);
	}
	public int getOrBookCountAuthor(String author) {
		return getOrBookCount(null,author);
	}
	public int getOrBookCountName(String name) {
		return getOrBookCount(name,null);
	}
	public int getOrBookCount(String name,String author) {
		return getOrBookCount(-1, name,author);
	}
	public int getOrBookCount(int typeId,String name,String author) {
		return bookDao.getOrBookCount(typeId, name, author);
	}
	//create
	public int createBook(Book book) {
		if(book == null) return -1;
		book.setFollow(0);
		book.setDate(MemStore.getNowDateTime());
		return bookDao.insert(book);
	}
	
	public int deleteBook(int id) {
		if(id<0) return -1;
		return bookDao.delete(id);
	}
	
	public int updateBook(Book book) {
		if(book == null) return -1;
		book.setDate(MemStore.getNowDateTime());
		return bookDao.update(book);
	}
	
	private List<JsonModel> changeBook(List<Book> books) {
		List<JsonModel> list = new ArrayList<JsonModel>();
		if(StringUtils.isEmpty(books)) return list;
		for(Book book : books) {
			if(book == null) continue;			
			list.add(book.toModel());
		}
		return list;
	}
	
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
