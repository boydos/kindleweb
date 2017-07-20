package com.ds.kindle.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
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
import com.ds.kindle.utils.JsonHelper;
import com.ds.kindle.utils.MemStore;
import com.ds.utils.DateUtil;
import com.ds.utils.Log;
import com.ds.utils.StringUtils;

@Controller
public class UploadController {

	@RequestMapping(value="upload",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String upload( @RequestParam MultipartFile[] files, String type, HttpServletRequest request) {
		 Log.d(String.format("上传类型:[%s]", type));
		 List<JsonModel> fileModel =null;
		 if(StringUtils.isEmpty(type)||"video".equalsIgnoreCase(type)) {
			 fileModel = uploadVideoFile(files);
		 } else if("apk".equalsIgnoreCase(type)) {
			 fileModel = uploadApkFile(files);
		 } else if("img".equalsIgnoreCase(type)) {
			 String path = BookUtils.getBookImgDir();
			 fileModel = uploadFile(files, path);
			 for(JsonModel model :fileModel) {
				 if(model!=null) {
					 model.set("path", model.getString("name")+"?type=book");
				 }
			 }
		 } else if("book".equalsIgnoreCase(type)) {
			 String path = BookUtils.getBookDir();
			 fileModel = uploadFile(files, path);
			 for(JsonModel model :fileModel) {
				 if(model!=null) {
					 model.set("path", model.getString("name")+"?type=book");
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
	private List<JsonModel> uploadApkFile(MultipartFile[] files) {
		 List<JsonModel> fileModel = new ArrayList<JsonModel>();
		 for(MultipartFile file : files){
			 if(file.isEmpty()){  
				 Log.d("文件未上传");  
	         } else {
	                String fileName = file.getOriginalFilename();
	                Log.d(String.format("文件长度:%d,文件名称:%s,文件原名:%s", file.getSize(),file.getName(),fileName));
	                String path ="";
	                Log.d("保存位置: "+path);
	                Log.d("========================================");  
	                String ext = StringUtils.getExt(fileName);
	                String upFileName =MemStore.getUUId();
	                if(!StringUtils.isEmpty(ext)) {
	                	upFileName +="."+ext;
	                }
	                Date now = new Date(System.currentTimeMillis());
	                String today = DateUtil.date2String(now);
	                String time = DateUtil.date2String(now,"HH:mm:ss");
	                path += File.separator+today+File.separator+time;
	                File upFile = new File(path, upFileName);
	                com.ds.utils.FileUtils.keepFileExists(upFile, true);
	                //这里不必处理IO流关闭的问题，因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉，我是看它的源码才知道的  
	                try {
						FileUtils.copyInputStreamToFile(file.getInputStream(), upFile);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	                Log.d(String.format("total:%s  use:%s  file:%s",upFile.length(),upFile.getUsableSpace(),file.getSize()));
	                JsonModel model = new JsonModel();
	                model.set("status", upFile.exists());
	                model.set("apk", today+File.separator+time+File.separator+upFile.getName());
	                fileModel.add(model);
	         }
		 }
		 return fileModel;
	}
	private List<JsonModel> uploadVideoFile(MultipartFile[] files) {
		 String videoSavePath =  "";
		 List<JsonModel> fileModel = new ArrayList<JsonModel>();
		 for(MultipartFile file : files){  
	            if(file.isEmpty()){  
	            	Log.d("文件未上传");  
	            }else{
	                String fileType = file.getContentType();
	                String fileName = file.getOriginalFilename();
	                Log.d(String.format("文件长度:%d,文件类型:%s,文件名称:%s,文件原名:%s", 
	                		file.getSize(),fileType,file.getName(),fileName));
	                String path = videoSavePath;
	                Log.d("保存位置: "+path);
	                Log.d("========================================");  
	                String ext = StringUtils.getExt(fileName);
	                String upFileName =MemStore.getUUId();
	                if(!StringUtils.isEmpty(ext)) {
	                	upFileName +="."+ext;
	                }
	                Date now = new Date(System.currentTimeMillis());
	                String today = DateUtil.date2String(now);
	                String time = DateUtil.date2String(now,"HH:mm:ss");
	                path += File.separator+today+File.separator+time;
	                File upFile = new File(path, upFileName);
	                com.ds.utils.FileUtils.keepFileExists(upFile, true);
	                //这里不必处理IO流关闭的问题，因为FileUtils.copyInputStreamToFile()方法内部会自动把用到的IO流关掉，我是看它的源码才知道的  
	                try {
						FileUtils.copyInputStreamToFile(file.getInputStream(), upFile);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
	              /*  Log.d("upFile");
	                String m3u8 =CmdUtils.ffmpegMp4Tom3u8(upFile.getAbsolutePath(), path);
	                Log.d("m3u8File:" +m3u8);
	                String img = CmdUtils.ffmpegGetImg(upFile.getAbsolutePath(), VideoHelper.getVideoImgDirectory());
	                Log.d("img:"+img);
	                upFile.delete();
	                Log.d("upFile delete");
	                File m3u8File = new File(m3u8);*/
	                JsonModel model = new JsonModel();
	                /*model.set("status", m3u8File.exists());
	                model.set("type", fileType);
	                model.set("img",  IConstrants.WEBROOT_IMG+File.separator+new File(img).getName()+"?type=video");
	                model.set("name", today+File.separator+time+File.separator+m3u8File.getName());*/
	                fileModel.add(model);
	            }  
		 }
		 return fileModel;
	}
	
}