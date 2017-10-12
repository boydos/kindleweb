package com.ds.kindle.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ds.json.JsonModel;
import com.ds.kindle.pojo.IWProcess;
import com.ds.kindle.utils.JsonHelper;
import com.ds.kindle.utils.MemStore;
import com.ds.utils.StringUtils;
@Controller
public class ProcessController {
	@RequestMapping(value="getProcess",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getProcess(String uid) {
		IWProcess process = MemStore.getProcess(uid);
		if(StringUtils.isEmpty(uid)) {
			return JsonHelper.getError("参数输入不正确");
		}
		if(process ==null) {
			return JsonHelper.getError("未找到相关进度");
		}
		JsonModel result = JsonHelper.getSuccessModel("获取成功");
		result.set("size", process.getCount());
		result.set("process", process.getProcess());
		if(process.getCount() <= process.getProcess()) {
			MemStore.deleteKey(uid);
		}
		return result.toJson();
	}
}
