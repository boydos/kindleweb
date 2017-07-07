package com.ds.kindle.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.json.JsonModel;
import com.ds.kindle.dao.UserDao;
import com.ds.kindle.pojo.Role;
import com.ds.kindle.pojo.User;
import com.ds.kindle.utils.MemStore;
import com.ds.utils.StringUtils;

@Service("userService")
public class UserService {
	
	@Autowired
	private UserDao userDao;
	public int getUserSize() {
		return userDao.getUserSize();
	}
	public boolean hasAccount(String account) {
		if(StringUtils.isEmpty(account)) return false;
		List<User> users = userDao.getUsersByAccount(account);
		return !StringUtils.isEmpty(users);
	}
	public boolean hasNickName(String nickname) {
		if(StringUtils.isEmpty(nickname)) return false;
		List<User> users = userDao.getUsersByNickName(nickname);
		return !StringUtils.isEmpty(users);
	}
	public int createUser(User user) {
		if(user ==null) return -1;
		user.setDate(MemStore.getNowDateTime());
		return userDao.createUser(user);
	}
	public int deleteUser(long id) {
		if(id <=-1) return -1;
		return userDao.deleteUser(id);
	}
	public int updateUser(long id,String nickname,long roleId) {
		User user = new User();
		user.setId(id);
		user.setNickname(nickname);
		user.setRoleId(roleId);
		return updateUser(user);
	}
	public int updateUser(User user) {
		if(user==null||user.getId()<=-1) return -1;
		user.setDate(MemStore.getNowDateTime());
		return userDao.updateUser(user);
	}
	public List<JsonModel> getUsers(int start,int count) {
		List<User> users = userDao.getUsers(start, count);
		return changeUser(users);
	}
	
	public JsonModel login(String account,String password) {
		User user = userDao.login(account, password);
		if(user!=null) {
			return user.toModel();
		}
		return null;
	}
	
	//---------User Role----
	public List<JsonModel> getRoles() {
		List<Role> roles = userDao.getRoles();
		return changeRole(roles);
	}
	public int createRole(String name) {
		Role role = new Role();
		role.setName(name);
		role.setDate(MemStore.getNowDateTime());
		return userDao.createRole(role);
	}
	public int deleteRole(long id) {
		if(id <=-1) return -1;
		return userDao.deleteRole(id);
	}
	public int updateRole(long id,String name) {
		if(id<=-1) return -1;
		Role role = new Role();
		role.setId(id);
		role.setName(name);
		role.setDate(MemStore.getNowDateTime());
		return userDao.updateRole(role);
	}
	public List<JsonModel> changeRole(List<Role> roles) {
		List<JsonModel> list = new ArrayList<>();
		if(!StringUtils.isEmpty(roles)) {
			for(Role role:roles) {
				list.add(role.toModel());
			}
		}
		return list;
	}
	public List<JsonModel> changeUser(List<User> users) {
		List<JsonModel> list = new ArrayList<>();
		if(!StringUtils.isEmpty(users)) {
			for(User user : users) {
				if(user!=null) list.add(user.toModel());
			}
		}
		return list;
	}
}
