package com.ds.kindle.pojo;

import org.apache.ibatis.type.Alias;

import com.ds.json.JsonModel;

@Alias("bookType")
public class BookType {
	private int id =-1;
	private String name;
	private int groupId;
	private String date;
	private JsonModel model = new JsonModel();

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getGroupId() {
		return groupId;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
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
		model.set("name", name);
		model.set("groupId", groupId);
		model.set("date", date);
		return model;
	}
	
}
