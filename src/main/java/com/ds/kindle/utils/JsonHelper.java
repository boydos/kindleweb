package com.ds.kindle.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.ds.json.JsonModel;
import com.ds.utils.FileUtils;
import com.ds.utils.StringUtils;

public class JsonHelper {
	public static final String JSONFILE_END=".json";
	
	public static String getJson(String name) {
		return getJson(null,name);
	}
	public static String getJson(String dir,String name) {
		if(StringUtils.isEmpty(name)) return null;
		if(StringUtils.isEmpty(dir)) {
			dir =PlatformUtils.getJsonDir();
		}
		return FileUtils.fileReaderString(dir+"/"+name+".json");
	}
	public static boolean saveJson(String fold,String name,String data) {
		if(StringUtils.isEmpty(name)) return false;
		return FileUtils.fileWriter(fold+"/"+name+".json", data);
	}
	public static JsonModel getErrorModel(String msg) {
		JsonModel error = new JsonModel();
		error.set("s", 0);
		error.set("i", msg);
		return error;
	}
	public static String getError(String msg) {
		return getErrorModel(msg).toJson();
	}
	public static JsonModel getSuccessModel(String msg) {
		JsonModel success = new JsonModel();
		success.set("s", 1);
		success.set("i", msg);
		return success;
	}
	public static String getSuccess(String msg) {
		return getSuccessModel(msg).toJson();
	}
	
	public static List<File> getAllJsonFiles(File file) {
		List<File> files= new ArrayList<File>();
		if(file ==null)return files;
		if(file.isFile()) {
			if(file.getName().endsWith(JSONFILE_END)) {
				files.add(file);
			}
		} else if(file.isDirectory()) {
			for(File tmpFile :file.listFiles()) {
				files.addAll(getAllJsonFiles(tmpFile));
			}
		}
		return files;
	}
}
