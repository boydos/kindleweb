package com.ds.kindle;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ds.kindle.utils.PlatformUtils;
import com.ds.utils.FileUtils;
import com.ds.utils.StringUtils;

public class PictureServlet extends HttpServlet {
	private static final long serialVersionUID = -3546576879872348L;
	private static String ImageDirPath =PlatformUtils.getFileDir()+"/imgs";
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req,resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		 String type=req.getParameter("type");
		 if("app".equalsIgnoreCase(type)){
			// ImageDirPath="";
		 } else if("video".equalsIgnoreCase(type)){
		 } else if("live".equalsIgnoreCase(type)){
		 }else {
		 }
		try {
			String page = req.getPathInfo();
			if(StringUtils.isEmpty(page) || page.equals("/")){
				return;
			}
			page = page.substring(1);
			try {
				resp.reset();
				String imagePath = ImageDirPath+"/"+page;
				if(!new File(imagePath).exists()) {
					imagePath=ImageDirPath+"/default.jpg";
				}
				FileInputStream fis = FileUtils.getInputStream(imagePath);
				resp.setContentType("image/jpeg");
				resp.setContentLength(fis.available());
				OutputStream os = resp.getOutputStream();
				FileUtils.inputStreamToOutStream(fis, os);
				fis.close();
				os.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
			PrintWriter pw = resp.getWriter();
			pw.print(e.getMessage());
			pw.flush();
			pw.close();
		}
		
	}
}
