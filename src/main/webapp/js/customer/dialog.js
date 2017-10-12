/** 
var data= {
  title:"",
  message:"",
  key:"",
  value:"",
  form :[{key:"",label:"",type:"",value:"",description:""}],
  close:false;
  buttons:[{css:"",method:"",name:"",isClose:true}]
}*/

function DialogModal (data) {
	this.data=data;
	this.dialogDom=$("#dialog_modal_tds");
}
DialogModal.prototype = {
		initDialogHeader : function () {
			if(this.data["title"]) {
				this.dialogDom.attr("aria-labelledby","tdsTitleLableId");
				var headDom =$('<div class="modal-header">').appendTo(this.dialogDom);
				var titleDom =$('<h3 id="tdsTitleLableId"></h3>').appendTo(headDom);
				titleDom.html(this.data.title);
			}
		},
		initDialogBody : function() {
			var bodyDom =$('<div class="modal-body">').appendTo(this.dialogDom);
			if(this.data["message"]) {
				var messageDom=$('<blockquote>').appendTo(bodyDom);
				messageDom.html(this.data.message);
			}
			if(this.data["form"]&& this.data["form"].length>0) {
				var formDom =$('<form action="#" class="form-horizontal">').appendTo(bodyDom);
				for(var i in this.data["form"]) {
					var item =this.data.form[i];
					this.makeRow(item,formDom);
				}
			}
		},
		makeRow : function(item,formDom) {
			var groupDom=$('<div class="control-group">').appendTo(formDom);
			var labelDom=$('<label class="control-label"></label>');
			if(item["type"] != "hidden") {
				labelDom.appendTo(groupDom);
				item['label']&&labelDom.html(item['label']);
			}
			var valueDom=$('<div class="controls">').appendTo(groupDom);
			var itemDom=$('<div></div>');
			if(item["type"]==null || item["type"] === "readonly") {
				itemDom=$('<label style="margin-top:7px" class="m-wrap"></label>').appendTo(valueDom);
				item["value"]!=null&&itemDom.text(item["value"]);
			} else if(item["type"] ==="text") {
				itemDom=$('<input class="m-wrap" type="text"/>').appendTo(valueDom);
				item["value"]!=null&&itemDom.val(item["value"]);
			} else if(item["type"] ==="password") {
				itemDom=$('<input class="m-wrap" type="password"/>').appendTo(valueDom);
				item["value"]!=null&&itemDom.val(item["value"]);
			} else if(item["type"] ==="select") {
				itemDom=$('<select class="chosen" data-placeholder="请选择..." tabindex="1">').appendTo(valueDom);
				if(item["value"]!=null) {
					var selected=this.makeOptionTo(itemDom,item["value"],item["selected"]);
					(selected==0||selected)&&itemDom.val(selected);
				}
			} else if(item["type"] ==="date") {
				
			}else if(item["type"] ==="textarea"){
				itemDom=$('<textarea />').appendTo(valueDom);
				item["value"]!=null&&itemDom.val(item["value"]);
			} else {
				itemDom=$('<input class="m-wrap" type="'+item["type"]+'"/>').appendTo(valueDom);
				item["value"]!=null&&itemDom.val(item["value"]);
			}
			item["key"]&&itemDom.attr("key",item["key"]);
			if(item["description"]) {
				itemDom =$('<span class="help-inline"></span>').appendTo(valueDom)
				itemDom.text(item.description);
			}
		},
		makeOptionTo : function(selectDom,data,selectedValue) {
			var selected = null ;
			$('<option>').appendTo(selectDom);
			if(selectDom==null||data==null||data.length==0)return selected;
			for(var i in data) {
				var item = data[i];
				var option = $('<option>');
				item["name"]!=null&& option.html(item["name"]);
				item["value"]!=null&& option.attr("value",item["value"]);
				if(selected==null&& item["selected"]) {selected=item["value"];}
				if(selectedValue!=null&&item["value"]==selectedValue) {
					selected=item["value"];
				}
				option.appendTo(selectDom);
			}
			return selected;
		},
		getValues: function() {
			var result ={};
			this.data["key"]&&(result[this.data.key]=this.data["value"]);
			if(this.data["form"]&& this.data["form"].length>0) {
				for(var i in this.data["form"]) {
					var item =this.data.form[i];
					if(item["type"]==null || item["type"] === "readonly") {
						result[item.key]=this.dialogDom.find('[key="' + item.key + '"]').text();
					} else if(item["type"] ==="text") {
						result[item.key]=this.dialogDom.find('[key="' + item.key + '"]').val();
					} else if(item["type"] ==="select") {
						var temp =this.dialogDom.find('[key="' + item.key + '"]').val();
						result[item.key]= (temp==null||temp.length==0)?-1:temp;
					} else {
						result[item.key]=this.dialogDom.find('[key="' + item.key + '"]').val();
					}
				}
			}
			return result;
		},
		initButtons : function() {
			var footDom=$('<div class="modal-footer">');
			if(this.data["buttons"]&&this.data["buttons"].length>0) {
				for(var i in this.data["buttons"]) {
					var button = this.data.buttons[i];
					var btnDom=$('<a class="btn red" href="javascript:void(0);">Close</a>').appendTo(footDom);
					
					if(button["isClose"]==null||button.isClose) {
						btnDom.attr("data-dismiss","modal");
						btnDom.attr("aria-hidden","true");
					}
					if(button["css"]) {
						btnDom.addClass(button['css']);
					}
					if(button["name"]!=null) {
						btnDom.text(button["name"]);
					}
					btnDom.bind('click',$.hitch(this,function(){
									if(button["method"]) return button["method"](this.getValues());
					}));
				}
			}
			if(this.data["close"]==null||this.data['close']==true) {
				$('<a class="btn red" href="javascript:void(0);" data-dismiss="modal" aria-hidden="true">Close</a>').appendTo(footDom);
			}
			if(footDom.length>0)footDom.appendTo(this.dialogDom);
		},
		init: function() {
			if(this.dialogDom && this.dialogDom.length>0) {
				this.dialogDom.empty();
			} else {
				this.dialogDom = $('<div id="dialog_modal_tds" class="modal hide fade" tabindex="-1" role="dialog"  aria-hidden="true">').appendTo($('body'));
			}
			if(this.data["key"]) {
				this.dialogDom.attr("key",this.data["key"]);
				this.dialogDom.data("data",this.data);
			}
			this.initDialogHeader();
			this.initDialogBody();
			this.initButtons();
			this.handleChosenCss();
		},
		show : function (option) {
			var options = $.extend({}, $.fn.modal.defaults,  typeof option == 'object' && option);
			var data =new $.fn.modal.Constructor(this.dialogDom, options);
			if(options.show) data.show();
		},
		handleChosenCss: function () {
	        if (!jQuery().chosen) {
	            return;
	        }
	        $(".chosen").each(function () {
	            $(this).chosen({
	                allow_single_deselect: $(this).attr("data-with-diselect") === "1" ? true : false
	            });
	        });
	    }
		
}
$(function(){
	ds = (typeof ds !== "undefined")?ds:{};
	ds.showDialog =function(data) {
		var dialog = new DialogModal(data);
		dialog.init();
		dialog.show();
	}
});