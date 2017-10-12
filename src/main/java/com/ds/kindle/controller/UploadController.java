package com.ds.kindle.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ds.json.JsonModel;
import com.ds.kindle.utils.BookUtils;
import com.ds.kindle.utils.IConstrants;
import com.ds.kindle.utils.JsonHelper;
import com.ds.kindle.utils.MemStore;
import com.ds.utils.Log;
import com.ds.utils.StringUtils;

@Controller
public class UploadController {

	@RequestMapping(value="upload",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String upload( @RequestParam MultipartFile[] files, String type, HttpServletRequest request) {
		 Log.d(String.format("上传类型:[%s]", type));
		 List<JsonModel> fileModel =null;
		 if(StringUtils.isEmpty(type)||"book".equalsIgnoreCase(type)) {
			 String path = BookUtils.getBookDir();
			 fileModel = uploadFile(files, path);
			 for(JsonModel model :fileModel) {
				 if(model!=null) {
					 model.set("path", model.getString("name")+"?type=book");
				 }
			 }
		 } else if("img".equalsIgnoreCase(type)) {
			 String path = BookUtils.getBookImgDir();
			 fileModel = uploadFile(files, path);
			 for(JsonModel model :fileModel) {
				 if(model!=null) {
					 model.set("path", IConstrants.WEBROOT_IMG+"/"+model.getString("name")+"?type=book");
				 }
			 }
		 }
		JsonModel result = JsonHelper.getSuccessModel("上传成功");
		result.set("data", fileModel);
		return result.toJson();
	}
	private List<JsonModel> uploadFile(MultipartFile[] files,String path) {
		List<JsonModel> fileModel = new ArrayList<JsonModel>();
		for(MultipartFile file : files){
			 if(file.isEmpty()){  
				 Log.d("文件未上传");  
	         } else {
	        	 String fileName = file.getOriginalFilename();
	        	 Log.d(String.format("文件长度:%d,文件名称:%s,文件原名:%s 保存位置:%s", file.getSize(),file.getName(),fileName,path));
	        	 String ext = StringUtils.getExt(fileName);
	             String upFileName =MemStore.getUUId();
	             if(!StringUtils.isEmpty(ext)) {
	                upFileName +="."+ext;
	             }
	             File upFile = new File(path, upFileName);
	             com.ds.utils.FileUtils.keepFileExists(upFile, true);
	             try {
					FileUtils.copyInputStreamToFile(file.getInputStream(), upFile);
				 } catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				 }
	             JsonModel model = new JsonModel();
	             model.set("status", upFile.exists());
	             model.set("name", upFile.getName());
	             fileModel.add(model);
	         }
		}
		return fileModel;
	}
	
}