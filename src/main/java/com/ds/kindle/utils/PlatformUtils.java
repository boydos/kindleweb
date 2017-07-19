package com.ds.kindle.utils;

import java.util.ResourceBundle;

import com.ds.utils.Log;

public class PlatformUtils {
	private static final String TAG="PlatformUtils";
	private static ResourceBundle serverConfig = null;
	private static String baseDir = null;
	static {
		serverConfig = ResourceBundle.getBundle("kindle");
		baseDir = serverConfig.getString("base.dir");
	}
	public static void init() {
		Log.setDebug(true);
		Log.i(TAG,"baseDir="+baseDir);
	}
	
	public static String getBaseDir() {
        return baseDir;
    }
    public static String getJsonDir() {
        return baseDir + "/json/";
    }
    public static String getFileDir() {
    	return baseDir + "/files/";
    }
    public static String getXMLDir() {
    	return baseDir + "/xml/";
    }
}
