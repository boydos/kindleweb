package com.ds.kindle.pojo;

import org.apache.ibatis.type.Alias;

import com.ds.json.JsonModel;

@Alias("role")
public class Role {
	private long id;
	private String name;
	private String date;
	private JsonModel model = new JsonModel();
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
		model.set("date", date);
		return model;
	}
}
