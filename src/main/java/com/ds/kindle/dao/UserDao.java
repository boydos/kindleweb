package com.ds.kindle.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.ds.kindle.pojo.Role;
import com.ds.kindle.pojo.User;

@Repository("userDao")
public interface UserDao {
	List<User> getUsers(@Param("start")int start,@Param("count")int count);
	List<User> getUsersByAccount(@Param("account")String account);
	List<User> getUsersByNickName(@Param("nickname")String nickname);
	User login(@Param("account")String account,@Param("password")String password);
	int getUserSize();
	int createUser(User user);
	
	int updateUser(User user);
	int deleteUser(long id);
	//-----------role
	List<Role> getRoles();
	int createRole(Role role);
	int deleteRole(long id);
	int updateRole(Role role);
}
