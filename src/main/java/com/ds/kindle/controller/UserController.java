package com.ds.kindle.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ds.json.JsonModel;
import com.ds.kindle.pojo.User;
import com.ds.kindle.service.UserService;
import com.ds.kindle.utils.JsonHelper;
import com.ds.kindle.utils.MemStore;
import com.ds.utils.Log;
import com.ds.utils.StringUtils;
@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userService;
	
	
	@RequestMapping(value="loginOut",method=RequestMethod.POST,produces="application/json;charset=UTF-8")
	@ResponseBody
	public String loginOut(String token,HttpServletRequest request) {
		Log.d("token="+token);
		if(!StringUtils.isEmpty(token)) {
			Object result =MemStore.get(token);
			if(result!=null) {
				JsonModel user = new JsonModel(result.toString());
				MemStore.deleteKey(user.getString("id")+"_"+user.getString("account"));
			}
			MemStore.deleteKey(token);
		}
		return JsonHelper.getSuccess("成功退出");
	}
	@RequestMapping(value="getUsers",method=RequestMethod.POST,produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getUsers(String start,String count) {
		if(!StringUtils.isNumber(start)) start="0";
		if(!StringUtils.isNumber(count)) count ="10";
		List<JsonModel> data =userService.getUsers(Integer.parseInt(start), Integer.parseInt(count));
		JsonModel response = JsonHelper.getSuccessModel("用户数据获取成功");
		response.set("data", data);
		response.set("total", userService.getUserSize());
		return response.toJson();
	}
	@RequestMapping(value="login",method=RequestMethod.POST,produces="application/json;charset=UTF-8")
	@ResponseBody
	public String login(String account,String password,HttpServletRequest request) {
		if(StringUtils.isEmpty(account)||StringUtils.isEmpty(password)) {
			return JsonHelper.getError("账号密码不能为空");
		}
		String md5pass =StringUtils.EncoderByMd5(password);
		Log.d(String.format("account=%s password=%s", account,md5pass));
		
		JsonModel user = userService.login(account, md5pass);
		if(user!=null){
			HttpSession session = request.getSession();
			String token =MemStore.getUUId();
			String tempKey = user.getString("id")+"_"+account;
			String lastToken = String.valueOf(MemStore.get(tempKey));
			//session.removeAttribute(lastToken);
			MemStore.deleteKey(lastToken);
			JsonModel response = JsonHelper.getSuccessModel("登陆成功");
			response.set("now", System.currentTimeMillis());
			response.set("token", token);
			response.set("account", account);
			response.set("nickname", user.getString("nickname"));
			response.set("roleId", user.getString("roleId"));
			response.set("id", user.getString("id"));
			String result = response.toJson();
			MemStore.put(tempKey, token);
			MemStore.put(token, result);
			//session.setAttribute(tempKey, token);
			//session.setAttribute(token, result);
			//session.setAttribute(MemStore.CURRENT_USER, user);
			return result;
		} else {
			return JsonHelper.getError("账号密码错误");
		}
	}
	@RequestMapping(value="verifyToken",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String verifyToken(String token,HttpServletRequest request) {
		Log.d("verify token="+token);
		Object result =MemStore.get(token);
		if(result !=null) {
			JsonModel user = new JsonModel(result.toString());
			long time = user.getLong("now", 0);
			if(System.currentTimeMillis() - time <= MemStore.TOKEN_TIMEOUT) {
				return result.toString();
			} else {
				MemStore.deleteKey(user.getString("id")+"_"+user.getString("account"));
				MemStore.deleteKey(token);
			}
		}
		return JsonHelper.getError("登陆过期，请重新登陆");
	}
	@RequestMapping(value="register",method=RequestMethod.POST,produces="application/json;charset=UTF-8")
	@ResponseBody
	public String register(User user) {
		user.setRoleId(0);
		return createUser(user);
	}
	@RequestMapping(value="createUser",method=RequestMethod.POST,produces="application/json;charset=UTF-8")
	@ResponseBody
	public String createUser(User user) {
		if(StringUtils.isEmpty(user.getAccount())) {
			return JsonHelper.getError("用户账号不能为空");
		}
		if(StringUtils.isEmpty(user.getPassword())) {
			return JsonHelper.getError("用户密码不能为空");
		}
		if(StringUtils.isEmpty(user.getNickname())) {
			return JsonHelper.getError("用户昵称不能为空");
		}
		if(user.getRoleId() == -1) {
			return JsonHelper.getError("用户角色不能为空");
		}
		user.setPassword(StringUtils.EncoderByMd5(user.getPassword())); //md5 
		int ret =userService.createUser(user);
		if(ret>0) {
			return JsonHelper.getSuccess("用户注册成功");
		}
		return JsonHelper.getError("用户注册失败");
	}
	@RequestMapping(value="updateUser",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String updateUser(String id,String nickname,String roleId) {
		if(StringUtils.isEmpty(id)) {
			return JsonHelper.getError("用户ID不能为空");
		}
		if(StringUtils.isEmpty(nickname)) {
			return JsonHelper.getError("用户昵称不能为空");
		}
		if(!StringUtils.isNumber(roleId)||"-1".equals(roleId)) {
			return JsonHelper.getError("用户角色不能为空");
		}
		Log.d(String.format("updateUser id=%s nick=%s roleId=%s", id,nickname,roleId));
		int ret=userService.updateUser(Long.parseLong(id),nickname,Long.parseLong(roleId));
		if(ret>0) {
			return JsonHelper.getSuccess("用户更新成功");
		}
		return JsonHelper.getError("用户更新失败");
	}
	@RequestMapping(value="deleteUser",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String deleteUser(String id) {
		if(StringUtils.isEmpty(id)) {
			return JsonHelper.getError("用户ID不能为空");
		}
		int ret=userService.deleteUser(Long.parseLong(id));
		if(ret>0) {
			return JsonHelper.getSuccess("用户删除成功");
		}
		return JsonHelper.getError("用户删除失败");
	}
	
	//-------------User Role--------------------
	@RequestMapping(value="getRoles",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getRoles() {
		List<JsonModel> data =userService.getRoles();
		JsonModel response = JsonHelper.getSuccessModel("用户角色获取成功");
		response.set("data", data);
		response.set("total", data.size());
		return response.toJson();
	}
	@RequestMapping(value="createRole",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String createRole(String name) {
		if(StringUtils.isEmpty(name)) return JsonHelper.getError("角色名称不能为空");
		int ret = userService.createRole(name);
		if(ret>0) {
			return JsonHelper.getSuccess("角色创建成功");
		}
		return JsonHelper.getError("角色创建失败");
	}
	@RequestMapping(value="updateRole",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String updateRole(String id,String name) {
		if(!StringUtils.isNumber(id)) return JsonHelper.getError("角色ID不能为空");
		if(StringUtils.isEmpty(name)) return JsonHelper.getError("角色名称不能为空");
		int ret = userService.updateRole(Long.parseLong(id),name);
		if(ret>0) {
			return JsonHelper.getSuccess("角色更新成功");
		}
		return JsonHelper.getError("角色更新失败");
	}
	@RequestMapping(value="deleteRole",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String deleteRole(String id) {
		if(StringUtils.isEmpty(id)) {
			return JsonHelper.getError("角色ID不能为空");
		}
		int ret=userService.deleteRole(Long.parseLong(id));
		if(ret>0) {
			return JsonHelper.getSuccess("角色删除成功");
		}
		return JsonHelper.getError("角色删除失败");
	}
}
