package com.ds.kindle.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.ds.kindle.pojo.IWProcess;
import com.ds.utils.DateUtil;


public class MemStore implements IConstrants {
	
	private static Map<String,Object> map = new HashMap<String,Object>();
	public final static int TOKEN_TIMEOUT=30*60*1000;
	public final static String CURRENT_USER="current_user_ds";
	public static void put(String key,Object value) {
		map.put(key, value);
	}
	public static Object get(String key) {
		return map.get(key);
	}

	public static String getString(String key) {
		return (String)get(key);
	}
	public static IWProcess getProcess(String key) {
		Object value = get(key);
		if(value instanceof IWProcess) {
			return (IWProcess)value;
		}
		return null;
	}
	
	public static void deleteKey(String key) {
		map.remove(key);
	}
	public static String getUUId() {
		return UUID.randomUUID().toString();
	}

	public static String getNowDateTime() {
		return DateUtil.date2TimeString(new Date(System.currentTimeMillis()));
	}
	public static String getNowDate() {
		return DateUtil.date2String(new Date(System.currentTimeMillis()));
	}
}
