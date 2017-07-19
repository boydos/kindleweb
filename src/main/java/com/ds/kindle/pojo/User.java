package com.ds.kindle.pojo;

import org.apache.ibatis.type.Alias;

import com.ds.json.JsonModel;

@Alias("user")
public class User {
	private int id=-1;
	private String nickname;
	private String account;
	private String password;
	private int roleId =-1;
	private int level=-1;
	private String levelDate;
	private String date;
	private JsonModel model = new JsonModel();
	public long getId() {
		return id;
	}
	public void setId(int id) {
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
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}

	public String getLevelDate() {
		return levelDate;
	}
	public void setLevelDate(String levelDate) {
		this.levelDate = levelDate;
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
		model.set("level", level);
		model.set("levelDate", levelDate);
		model.set("roleId", roleId);
		model.set("date", date);
		return model;
	}
}
