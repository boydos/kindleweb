package com.ds.kindle.utils;

import com.ds.utils.FileUtils;
import com.ds.utils.StringUtils;
public class XmlHelper {
	public static String getXML(String name) {
		if(StringUtils.isEmpty(name)) return null;
		return FileUtils.fileReaderString(PlatformUtils.getXMLDir()+"/"+name+".xml");
	}

}
