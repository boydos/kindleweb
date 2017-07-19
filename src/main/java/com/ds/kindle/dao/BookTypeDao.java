package com.ds.kindle.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.ds.kindle.pojo.BookType;

@Repository("bookTypeDao")
public interface BookTypeDao {

	public List<BookType> getBookTypes();
	public List<BookType> getBookTypeByGroup(@Param("groupId")int groupId);
	public List<BookType> getBookTypeWithoutGroup(@Param("groupId")int groupId);
	public BookType getBookType(int id);
	public List<BookType> getBookTypeByName(@Param("name")String name);
	public int insertBookType(BookType type);
	public int updateBookType(BookType type);
	public int deleteBookType(int id);
}
