package com.ds.kindle.utils;

public class BookUtils {

	public static String getBookDir() {
		return PlatformUtils.getFileDir()+"/books";
	}
	public static String getBookImgDir() {
		return getBookDir()+"/imgs";
	}
}
