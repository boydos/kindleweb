package com.ds.kindle.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.ds.kindle.pojo.Book;

@Repository("bookDao")
public interface BookDao {
	//select--order[ 0-by date; 1-by follow ]
	public Book getBook(int id);
	public List<Book> getBooks(@Param("typeId")int typeId,@Param("name")String name,@Param("author")String author,@Param("start")int start,@Param("length")int length,@Param("order")int order);
	public List<Book> getOrBooks(@Param("typeId")int typeId,@Param("name")String name,@Param("author")String author,@Param("start")int start,@Param("length")int length,@Param("order")int order);

	public int getBookCount(@Param("typeId")int typeId,@Param("name")String name,@Param("author")String author);
	public int getOrBookCount(@Param("typeId")int typeId,@Param("name")String name,@Param("author")String author);
	//create
	public int insert(Book book);
	public int update(Book book);
	public int delete(int id);
}
