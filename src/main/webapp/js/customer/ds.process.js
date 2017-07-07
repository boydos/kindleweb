/* dependency loadingHelper.js */
function DSProcess(option) {
	this.progressHelper = new ProgressHelper();
	this.option =  {
			update:"/platform/getProcess",
			url:null,
			param:null,
			title:"开始数据导入",
			msg:"文件数量$count个",
			msg_update :"文件数量$count个,已导入$num/$count个",
			msg_success:"数据导入成功",
			msg_error:"数据导入失败",
			success : function(data){},
			error: function (data){}
	};
	this.setOption(option);
	this.countReg = new RegExp('\\$count',"g");
	this.numReg = new RegExp('\\$num',"g");
	this.perReg = new RegExp('\\$per',"g");
}
DSProcess.prototype = {
		setOption: function(option) {
			$.extend(this.option, option||{});
		},
		getProgress: function(uid) {
			this.clearInterval();
			sdt.post(this.option.update,{uid:uid},$.hitch(this,this.subSuccess),$.hitch(this,this.subError));
		},
		getReplaceMsg(msg,data) {
			if(msg!=null) return msg.replace(this.countReg,data.size).replace(this.numReg,data.process).replace(this.perReg,value+"%");
			else return null;
		},
		subSuccess:function(data) {
			console.info("success",data);
			if(data.s ==1) {
				var value=0;
				if(data.uid) {
					this.uid=data.uid;
					sdt.log((data.i||"")+"  uid="+this.uid);
				}
				if(data["process"]) {
					var msg_update=this.option.msg_update;
					if(msg_update==null) msg_update ="文件数量:"+data.size+"个,已导入"+data.process+"/"+data.size+"个";
					else {
					   msg_update=msg_update.replace(this.countReg,data.size).replace(this.numReg,data.process).replace(this.perReg,value+"%");
					}
					this.progressHelper.setInfo(msg_update);	
					value =Math.round((data.process*100)/data.size);
					this.progressHelper.update(value);
					
				} else {
					var msg=this.option.msg;
					if(msg==null) msg ="文件数量:"+data["size"]+"个";
					else {
					  msg=msg.replace(this.countReg,data.size).replace(this.numReg,data.process).replace(this.perReg,value+"%");
					}
					this.progressHelper.setInfo(msg);	
				}
				if(value<100) {
					this.interval = window.setInterval($.hitch(this, this.getProgress), 1000,this.uid);
				}else {
					sdt.log(this.option.msg_success||"数据导入成功");
					this.progressHelper.hide();
				}
			}else {
				sdt.log(data.i||(this.option.msg_error||"数据导入失败"));
				this.progressHelper.hide();
			}
			if(this.option.success!=null) {
				this.option.success(data);
			}
		},
		subError:function(data) {
			sdt.log("Can't Connection Server!");
			this.clearInterval();
			this.progressHelper.hide();
			if(this.option.error!=null) {
				this.option.error(data);
			}
		},
		start : function(option) {
			this.setOption(option);
			if(this.option.url!=null&&this.option.url.length>0) {
			   this.progressHelper.show(this.option.title||"开始数据导入");
			   sdt.post(this.option.url,this.option.param,$.hitch(this,this.subSuccess),$.hitch(this,this.subError));
			}
		},
		clearInterval:function() {
			if( this.interval != null) clearInterval( this.interval );
		}
}