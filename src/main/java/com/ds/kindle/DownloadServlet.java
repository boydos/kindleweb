package com.ds.kindle;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ds.kindle.utils.BookUtils;
import com.ds.kindle.utils.PlatformUtils;
import com.ds.utils.FileUtils;
import com.ds.utils.Log;
import com.ds.utils.StringUtils;

public class DownloadServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6701927773994566026L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stubs
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doPost(req, resp);
        req.setCharacterEncoding("utf-8");
        String userName = req.getHeader("userName");
        String passwd = req.getHeader("passwd");
        String fileName = req.getHeader("fileName");
        System.out.println("userName:" + userName);
        System.out.println("passwd:" + passwd);
        System.out.println("fileName:" + fileName);
        
		String page = req.getPathInfo();
		if(StringUtils.isEmpty(page) || page.equals("/")){
			return;
		}
		String type = req.getParameter("type");
		String path =PlatformUtils.getFileDir();
		if(StringUtils.isEmpty(type)||"book".equals(type)) {
			path= BookUtils.getBookDir();
		}
		page = page.substring(1);
		if(StringUtils.isEmpty(page)) return;
		path = path+"/"+page;
		processDownload(path,req,resp);
	
	}
	
	public void processDownload(String path,HttpServletRequest request, HttpServletResponse response){
        int BUFFER_SIZE = 4096;
        InputStream in = null;
        OutputStream out = null;
        System.out.println("downloading..."+path);      
        try{
        	response.reset();
            response.setCharacterEncoding("utf-8");  
            response.setContentType("application/octet-stream");
            //可以根据传递来的userName和passwd做进一步处理，比如验证请求是否合法等             
            File file = new File(path);
            if(!file.exists()) return ;
            response.setHeader("content-Disposition", "attachment;filename=" + URLEncoder.encode(file.getName(), "UTF-8"));
            response.setContentLength((int) file.length());
            response.setHeader("Accept-Ranges", "bytes");
            long p = 0;   
            long l = file.length();
            if (request.getHeader("Range") != null) //客户端请求的下载的文件块的开始字节   
            {   
             //如果是下载文件的范围而不是全部,向客户端声明支持并开始文件块下载   
             //要设置状态   
             //响应的格式是:   
             //HTTP/1.1 206 Partial Content   
             response.setStatus(javax.servlet.http.HttpServletResponse.SC_PARTIAL_CONTENT);//206   
            
             //从请求中得到开始的字节   
             //请求的格式是:   
             //Range: bytes=[文件块的开始字节]-
             System.out.println("Range:=="+request.getHeader("Range"));
             String range= request.getHeader("Range");
             if(range!=null) {
            	 range=range.replaceAll("bytes=","");
            	 String []arrs = range.split("-");
            	 if(arrs!=null&&arrs.length>0&&StringUtils.isNumber(arrs[0])) {
            		 p= Long.parseLong(arrs[0]);
            	 }
             }
            }
            response.setHeader("Content-Length", new Long(l - p).toString());   
            
            /*if (p != 0)   
            {   
             //不是从最开始下载,   
             //响应的格式是:   
             //Content-Range: bytes [文件块的开始字节]-[文件的总大小 - 1]/[文件的总大小]   
*/             response.setHeader("Content-Range","bytes " + new Long(p).toString() + "-" + new Long(l -1).toString() + "/" + new Long(l).toString());   
            //}
            System.out.println("downloading...file:"+new Long(p).toString() + "-" + new Long(l -1).toString() + "/" + new Long(l).toString());      
            int readLength = 0;
            in = new BufferedInputStream(new FileInputStream(file), BUFFER_SIZE);
            in.skip(p);
            out = new BufferedOutputStream(response.getOutputStream());
            byte[] buffer = new byte[BUFFER_SIZE];
            while ((readLength=in.read(buffer)) > 0) {
                byte[] bytes = new byte[readLength];
                System.arraycopy(buffer, 0, bytes, 0, readLength);
                out.write(bytes);
            }
            out.flush();
            response.addHeader("token", "hello 1");
        }catch(Exception e){
            //e.printStackTrace();
            Log.e(e.getCause()+e.getMessage());
             response.addHeader("token", "hello 2");
        }finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                }
            }
        }
    }
	public HttpServletResponse download(String path, HttpServletResponse response) {
		 InputStream fis=null;
		 OutputStream out =null;
        try {
        	System.out.println("downloading..."+path);
            // path是指欲下载的文件的路径。
            File file = new File(path);
            if(!file.exists()) return response;
            // 取得文件名。
            String filename = file.getName();
          /*  // 取得文件的后缀名。
            String ext = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase();*/
            
            // 清空response
            response.reset();
            // 设置response的Header
            response.setHeader("content-Disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
            //response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes()));
            response.addHeader("Content-Length", "" + file.length());
            // 以流的形式下载文件。
            fis = new BufferedInputStream(new FileInputStream(file.getAbsolutePath()));
            out = response.getOutputStream();  
            FileUtils.inputStreamToOutStream(fis, out);
            out.flush();
            fis.close();
			out.close();
        } catch (IOException ex) {
            ex.printStackTrace();
            try{
	            if(fis!=null) fis.close();
	            if(out!=null) out.close();
            }catch (IOException e1) {
            	
            }
        }
        return response;
    }
	

}
