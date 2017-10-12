package com.ds.kindle.pojo;

import org.apache.ibatis.type.Alias;

import com.ds.json.JsonModel;

@Alias("book")
public class Book {
	private int id=-1;
	private String name;
	private String subtitle;
	private String img;
	private String description;
	private String author;
	private String type;
	private int typeId=-1;
	private String resources;
	private int follow=-1;
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
	public String getSubtitle() {
		return subtitle;
	}
	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public String getResources() {
		return resources;
	}
	public void setResources(String resources) {
		this.resources = resources;
	}
	public int getFollow() {
		return follow;
	}
	public void setFollow(int follow) {
		this.follow = follow;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public JsonModel toModel() {
		model.clear();
		model.set("id", id);
		model.set("name", name);
		model.set("subtitle", subtitle);
		model.set("img", img);
		model.set("description", description);
		model.set("author", author);
		model.set("type", type);
		model.set("typeId", typeId);
		model.set("resources", resources);
		model.set("follow", follow);
		model.set("date", date);
		return model;
	}
	
}
