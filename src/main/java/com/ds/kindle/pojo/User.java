package com.ds.kindle.pojo;

import org.apache.ibatis.type.Alias;

import com.ds.json.JsonModel;

@Alias("user")
public class User {
	private long id=-1L;
	private String nickname;
	private String account;
	private String password;
	private long roleId =-1L;
	private String date;
	private JsonModel model = new JsonModel();
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public long getRoleId() {
		return roleId;
	}
	public void setRoleId(long roleId) {
		this.roleId = roleId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public JsonModel toModel() {
		model.clear();
		model.set("id", id);
		model.set("nickname", nickname);
		model.set("account", account);
		//model.set("password", password);
		model.set("roleId", roleId);
		model.set("date", date);
		return model;
	}
}
