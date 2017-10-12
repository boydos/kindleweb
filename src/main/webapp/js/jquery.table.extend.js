/**
 * Author by tongdongsheng　2016
 * config ={
 * 
 *  fenye : true,
 *  search : {
 *    enable: true,
 *    text:"搜索"
 *  },
 *  server :{
 *     enable: true,
 *     url: "",
 *     params : {}
 *  },
 * 	operation : {
 * 		show : true,
 *   	name : "操作",
 *   	key : ""
 *  },
 *  
 *  checkbox : {
 *  	show : true,
 *  	allcheck: ture,
 *  	css : "",
 *  	type : "radio"|| "checkbox",
 *  	require: [ { key :"", equal: true ,values : [1,2,3]}]
 *  }
 *  
 *  replaceKeys : [
 *  	{ displayKey: key1 , values : [{ value: value1, equal : true ,display : "$valvalue"}]}
 *  ],
 *  
 *  relationKeys : [ 
 *  	{ displayKey: key1 , requireKey: key2 , values : [{ value: value1, equal:true ,display:"$valvalue"}]}
 *  ],
 *  
 *  buttons : [
 *      { displayKey: key1 , name:"", css : "" ,method : "", comment:"",require : { key :"", equal: true, values : [1,2,3]}}
 *  ]
 *  
 * }
 * 
 * 
 * @param parentDomId
 * @param options
 * @returns
 */
function TableJs ( parentDomId , config, options) {
	this.parentDomId = parentDomId;
	this.parentDom = $("#" + parentDomId);
	this.config = config;
	this.head = [];
	this.data = [];
	this.opts = {
			"sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
			"sPaginationType": "bootstrap",
			"bRetrieve": true,
			'bStateSave': true, 
			"sPaginationType":"full_numbers",
			"aLengthMenu" : [[5,10,25,50,100],[5,10,25,50,100]],
			/*"iDisplayLength" :5,*/
			"oLanguage": {
				"sLengthMenu": "每页 _MENU_ 条记录",
				"sZeroRecords": "没有检索到数据",
				"sInfo": "第 _START_ 到第  _END_ 条；总共有 _TOTAL_ 条<br>",
				"sInfoFiltered" : "",
				"sSearch":"搜索：",
				"sZeroRecords" :"没有查询到数据",
				"oPaginate": {
					"sFirst":"首页",
					"sLast":"尾页",
					"sNext":"下一页",
					"sPrevious":"前一页"
				 }
			},
			"bFilter": true,
			"bSort": true,
			"bDestroy":true,
			"sInfoEmtpy": "没有数据",
	        "sProcessing": "正在加载数据...",
			"bDefaultSort": true/*,
			 sort: [ [0,'desc'] ]*/
	    };
	this.noPagingOptions = {
			"bPaginate": false,
			"oLanguage": {
				"sInfo": "总共有 _TOTAL_ 条<br>",
				"sInfoFiltered" : "",
				"sZeroRecords" :"没有查询到数据",
				"sSearch":"搜索："
					
			}
		};
	$.extend( this.opts, options);
	
	this.sortType = "asc";
	this.sortCol = 0;
	
	this.columnDispalyMap = {};
}
TableJs.prototype =  {
	pushHead : function ( name , key) {
		this.head.push( { name : name, key: key});
	},
	getChineseStrLen : function ( str ) {
		 if( str ==null ) return 0;
		 return str.replace(/[^\x00-\xff]/g, '__').length;
	},
	setColumnDisplayLen : function ( key,len ) {
		this.columnDispalyMap[key] =  len;
	},
	subStrChinese : function ( str , len) {
		str=str==null?"":(str +"");
		if( len ==null || len < 0 ) {
			return str;
		}
		var realLength = this.getChineseStrLen(str);
		var endLength= len/2
		for( var i = endLength; i< len; i++) {
			if(this.getChineseStrLen( str.substring(0, i) ) >= len ) {
		    		endLength = i;
		    		break;
		    }
		}
		if ( realLength > len ) {
		    	if(this.getChineseStrLen( str.substring(endLength-2,endLength) ) >=3) {
		    		str = str.substring(0,endLength-2) + "...";
		    	} else {
		    		str = str.substring(0,endLength-3) + "...";
		    	}
		}
		return str;
	},
	emptyHead : function () {
		this.head = [];
	},
	setDisplayLength : function ( i ){
		var len = 5;
		if( i == null && i<=5 ) return;
		else if( i<=10 ) {
			len = 10;
		} else if( i<=25) {
			len = 25;
		} else if( i<=50) {
			len = 50;
		} else {
			len = 100;
		}
		$.extend( this.opts, {"iDisplayLength" : len});
	},
	setData : function ( data ) {
			this.data = data;
			this.fullData =null;
	},
	filter : function ( data) {
    	// if Clear need to return all the data.
		if( this.FilterValues== null ||this.FilterValues.length ==0 ) return data;

    	var remove = this.FilterRemove == null? true: this.FilterRemove;
    	
    	var values = this.FilterValues;
    	var tempData= [];
    	$.each( data ||[], function( index, item){
    		var search = false;
    		$.each( values, function( jdex, jtem) {
    			var allequal = true;
    			var hasequal = false;
        		$.each(jtem, function(key, value) {
    				if( item[key] == value ) {
    					hasequal = true;
    				} else {
    					allequal = false;
    				}
    			});
        		if( allequal && hasequal) {
        			search = true;
        		}
        	});
    		if( !remove && search ){
    			tempData.push( item);
    		} else if( !search && remove) {
    			tempData.push( item);
    		}
    	});
    	return tempData;
    	
    },
	setFilter : function( values, remove) {
	    	this.FilterValues = values||[];
	    	this.FilterRemove = remove;
	},
	setSortType : function ( type , i) {
		if( type) {
			this.sortType = type;
		}
		if( i != null) {
			this.sortCol = i;
		}
	},
	setConfig : function ( config ){
		this.config = config;
	},
/*	// configure decipher
 */
	isShowOperation : function () {
		return this.config != null && this.config.operation != null && this.config.operation.show != null ? this.config.operation.show : false;
	},
	isShowCheckBox : function () {
		return this.config != null && this.config.checkbox != null && this.config.checkbox.show != null ? this.config.checkbox.show : false;
	},
	isAllCheck : function () {
		if( this.getCheckBoxType() != "radio"){
			return this.config != null && this.config.checkbox != null && this.config.checkbox.allcheck != null ? this.config.checkbox.allcheck : false;
		} else{
			return false;
		}
	},
	isFenYe : function () {
		return this.config != null && this.config.fenye != null ? this.config.fenye : false;
	},
	isSearch : function () {
		return this.config != null && this.config.search != null && this.config.search.enable!=null?this.config.search.enable : true;
	},
	isUseServerAjax : function () {
		return this.config!=null && this.config.server !=null && this.config.server.url!=null? (this.config.server.enable!=null?this.config.server.enable:true):false;
	},
	getSearchText : function () {
		return this.config != null && this.config.search != null && this.config.search.text!=null ? this.config.search.text : "搜索";
	},
	//-- server ajax url
	getServerUrl : function () {
		return this.config!=null && this.config.server !=null ? this.config.server.url:null;
	},
	getServerParams :function () {
		return this.config!=null && this.config.server!=null && this.config.server.params !=null?this.config.server.params:{};
	},
	//-- checkbox
	getCheckBoxType : function () {
		return this.config != null && this.config.checkbox != null && this.config.checkbox.type != null ? this.config.checkbox.type : "radio";
	},
	getCheckBoxCss : function () {
		return this.config != null && this.config.checkbox != null && this.config.checkbox.css != null ? this.config.checkbox.css : "";
	},
	getCheckBoxRequire : function () {
		return this.config != null && this.config.checkbox != null && this.config.checkbox.require != null ? this.config.checkbox.require : [];
	},
	//---operation---
	getOperationKey : function () {
		return this.config != null && this.config.operation != null && this.config.operation.key != null ? this.config.operation.key : "operation_key";
	},
	getOperationName : function () {
		return this.config != null && this.config.operation != null && this.config.operation.name != null ? this.config.operation.name : "Operation";
	},
	//---- replacekeys ----
	getReplaceKeys : function () {
		return this.config != null && this.config.replaceKeys != null ? this.config.replaceKeys : [];
	},
	//---- relationKeys --- 
	getRelationkeys : function () {
		return this.config != null && this.config.relationKeys != null ? this.config.relationKeys : [];
	},
	//----- buttons ----
	getButtons : function () {
		return this.config != null && this.config.buttons != null ? this.config.buttons : [];
	},
	//---- createTable ----
	initTable : function () {
		this.parentDom.empty();
		this.table = $('<table class="table table-striped table-bordered bootstrap-datatable datatable responsive" ></table>');
		this.table.appendTo( this.parentDom);
		this.generateTableHeaderWithOutServer(this.table);
	},
	getTable : function () {
		return this.table;
	},
	emptyTable : function (){
		if( this.table != null) {
			this.table.remove();
		}
		this.table= null;
		
	},
	findDisplayLength : function () {
		// Get existing page number from cookie
		var existingDisplayLength = $.cookie(this.parentDomId + "_iDisplayPage");
		return existingDisplayLength?Number(existingDisplayLength):this.opts['iDisplayLength'];
	},
	
	firstInitTable : function () {
		if(this.isShowCheckBox()) {
			$.extend(this.opts, {"aoColumnDefs": [ { "bSortable": false, "aTargets": [ 0 ] }]});
		}
		$.extend( this.opts, this.isFenYe()?{} : this.noPagingOptions );

		if( !this.opts.bDefaultSort ) {
			$.extend(this.opts, {"aaSorting": []});
		}
		this.initTable();
		if(this.isUseServerAjax()) {
			this.configServerAjax();
		} else {
			this.generateTableBodyWithOutServer( this.table);
		}
		
		this.opts['iDisplayLength'] = this.findDisplayLength();
		this.opts['bFilter'] = this.isSearch();
		!!this.opts['oLanguage']&&(this.opts['oLanguage']['sSearch']=this.getSearchText());
		this.table.dataTable( this.opts);
		// Remember the page number
		var existingDisplayLengthSelect = this.parentDom.find('select');

		// Store current value, initially there may be no existing value
		$.cookie(this.parentDomId + "_iDisplayPage", existingDisplayLengthSelect.val(), {expires: 365});

		// Monitor value change
		existingDisplayLengthSelect.on('change', $.hitch(this, function(evt){
			var target = $(evt.currentTarget);
			$.cookie(this.parentDomId + "_iDisplayPage", target.val(), {expires: 365});
		}));
		if( this.opts.bSort && this.opts.bDefaultSort) {
			if( this.opts.sort) {
				this.table.fnSort( this.opts.sort);
			} else if( this.isShowCheckBox() ) {
				this.table.fnSort( [[ this.sortCol + 1,this.sortType || "asc"]]);
			} else {
				this.table.fnSort( [[this.sortCol ,this.sortType|| "asc"]]);
			}
		}
		if( this.isAllCheck() ){
			this.bindCheckAllCheckEvent();
		}
		this.bindBtnEvent();
	},
	reDrawTable : function () {
		this.table.fnClearTable(true);
		var _this = this;
		$.each( this.data|| [], function ( index, item) {
			_this.insertRow(item);
		});
/*			this.table.fnDraw();*/
	},
	createTable : function ( force ) {
		var init = false;
		if( force ) this.emptyTable();
		if( this.table == null) {
			this.firstInitTable();
		} else {
			this.reDrawTable();
		}
		
		// Select Display Length
		var existingDisplayLengthSelect = this.parentDom.find('select');
		existingDisplayLengthSelect.val( this.findDisplayLength() );
		
		if( this.isFenYe()) {
			this.table.find("thead tr th").each( function(){
				$(this).removeAttr("style");
			});
		}
		
	},
	generateTableHeaderWithOutServer : function ( table ) {
		var thead=$("<thead></thead>").appendTo(table);
   		var headtr=$("<tr></tr>").appendTo(thead);
   		if( this.isShowCheckBox() ) {
   			var temp =  $("<th style='width:15px;'></th>");
   			if( this.isAllCheck() ) {
   				var checkbox = $( this.getCheckBoxAllStr());
   				checkbox.appendTo( temp);
   			}
   			headtr.append( temp);
   		}
   		$.each( this.head ||[], function ( index, item){
   			var temp = $("<th></th>");
   			temp.text( item["name"]!= null? item["name"] : "");
   			headtr.append( temp);
   		});
   		
		if(this.isShowOperation()) {
			var name = this.getOperationName();
			var temp = $("<th></th>");
   			temp.text( name != null? name : "");
			headtr.append( temp );
		}
		return thead;
	},
	/**
	 * Generate Table To Display;
	 * @param table
	 */
	generateTableBodyWithOutServer : function ( table ) {
		var operationKey = this.getOperationKey();
		var showOperation = this.isShowOperation();
		var tbody = $("<tbody></tbody>");
		tbody.appendTo( table );
		var _this = this;
		$.each( this.data|| [], function ( index, item) {
			bodytr = $("<tr></tr>");
			bodytr.data("data", item);
			tempData = _this.changeItemToTempData(item, index);
			$.each( tempData, function( jdex, jtem){
				temp = $("<td>"+(jtem["value"] != null ? jtem["value"] : "")+"</td>");
				temp.appendTo( bodytr );
			});
			bodytr.appendTo( tbody );
			
		});
	},
	/**
	 * Get Row Data Array,Contain CheckBox And Buttons;
	 * @param item
	 * @returns {Array}
	 */
	changeItemToColumnData : function ( item ) {
		var columnsData = [];
		var tempData = this.changeItemToTempData(item);
		$.each( tempData||[], function ( index, jtem) {
			columnsData.push(jtem["value"] != null ? jtem["value"] : "");
		});
		return columnsData;
	},
	/**
	 * Change item To Need Display Value; Contain CheckBox And Buttons And Other Relations
	 * @param item
	 * @param index , can be null;
	 * @returns {Array} [{ key: "",value:"display"}]
	 */
	changeItemToTempData : function (item, index) {
		var bodytr,require;
		var tempData,tempValues;
		var btnString ;
		var temp,equal, search;
		var ok;
		var _this = this;
		var reg = new RegExp('\\$val',"g");
		var regDis = new RegExp('\\$dis',"g");
		var operationKey = this.getOperationKey();
		var showOperation = this.isShowOperation();
		tempData = [];
		//generate checkBox value;
		if( _this.isShowCheckBox()) {
			ok = true;
			$.each(_this.getCheckBoxRequire(), function( jdex, jtem) {
				tempValues = jtem["values"] || [];
				equal = jtem["equal"] == null ? true : jtem["equal"];
				ok =false;
				search = false;
				$.each( tempValues , function(kdex, ktem){
					if( !search ) {
						search =item[jtem["key"]] == ktem;
					}
				});
				if( search && equal){ ok = true}
				else if( !search && !equal) {
					ok =true;
				} else{
					ok= false;
				};
			});
			if( ok ) {
				tempData.push({key:"checkBox_byds",value:_this.getCheckBoxStr( _this.getCheckBoxType(), _this.getCheckBoxCss(), index)});
			}else {
				tempData.push({key:"checkBox_byds",value:""});
			}
		}
		
		$.each(_this.head ||[], function( jdex, jtem){
			var str = _this.subStrChinese(item[ jtem["key"]], _this.columnDispalyMap[jtem["key"]]);
			tempData.push({ key:jtem["key"], value : str });
		});
		if( showOperation) {
			tempData.push({ key: operationKey, value:""});
		}
		// replace;
		$.each( tempData , function( jdex, jtem){
			$.each( _this.getReplaceKeys(), function( kdex, ktem) {
				
				if( jtem["key"] == ktem["displayKey"]) {
					tempValues = ktem["values"] || [];
					temp = jtem["value"];
					$.each( tempValues , function( mdex, mtem){
						equal = mtem["equal"] == null ? true : mtem["equal"];
						if( equal ) {
							if(item[jtem["key"]] == mtem["value"]) {
								temp = mtem["display"].replace(reg, item[jtem["key"]]).replace(regDis, temp);
							}
						} else {
							if(item[jtem["key"]] != mtem["value"]) {
								temp= mtem["display"].replace(reg, item[jtem["key"]]).replace(regDis, temp);
							}
						}
						
					})
					jtem["value"] = temp;
				}
			});
		});
		// relation;
		$.each( tempData , function( jdex, jtem){
			$.each( _this.getRelationkeys(), function( kdex, ktem) {
				if( jtem["key"] == ktem["displayKey"]) {
					var value = item[ktem["requireKey"]];
					tempValues = ktem["values"] || [];
					temp = jtem["value"];
					$.each( tempValues , function( mdex, mtem){
						equal = mtem["equal"] == null ? true : mtem["equal"];
						if( equal ) {
							if(value == mtem["value"]) {
								temp = mtem["display"].replace(reg, item[jtem["key"]]).replace(regDis, temp);
							}
						} else {
							if(value != mtem["value"]) {
								temp= mtem["display"].replace(reg, item[jtem["key"]]).replace(regDis, temp);;
							}
						}
					});
					jtem["value"] = temp;
				}
			});
		});
		//buttons;
		$.each( tempData , function( jdex, jtem){
			
			$.each( _this.getButtons(), function( kdex, ktem) {
				if( jtem["key"] == ktem["displayKey"]) {
					require = ktem["require"] ||[];
					btnString = _this.getBtnStr( ktem["name"].replace(reg, item[jtem["key"]]).replace(regDis, jtem["value"]), ktem["css"], kdex);
					$.each( require , function( ndex, ntem){
						tempValues = ntem["values"] || [];
						
						equal = ntem["equal"] == null ? true : ntem["equal"];
						ok= false;
						search = false;
						$.each( tempValues , function( mdex, mtem){
							if(!search ) {
								search = item[ntem["key"]] == mtem;
							}
						});
						if( search && equal){ ok = true}
						else if( !search && !equal) {
							ok =true;
						} else{
							ok= false;
						};
						if( ok ) {
								if(jtem["value"] != null) jtem["value"] += btnString;
								else  jtem["value"] = btnString;
						}
					});
				}
			});
		});
		return tempData;
	},
	
	//---- get btn/checkbox :Html String ---
	getBtnStr : function ( name, css, index) {
		return ' <a class="btn operation_'+ (index!=null? index:0)+' '+ (css||"")+'" href="javascript:void(0);">'+(name ||'')+'</a> ';
	},
	getCheckBoxAllStr : function () {
		return '<input class="checkBoxAllCSS boxItem" type="checkbox" />';
	},
	getCheckBoxStr : function (type, css, index) {
		return ' <input name="checkBoxName" class="checkBoxItemCSS boxItem_'+(index!=null? index:0)+' '+ (css||"")+'" type="'+ (type||"radio")+'" />';
	},
	//----bind Event;
	bindBtnEvent : function () {
		var _this = this;
		$.each( this.getButtons() , function( jdex, jtem){
			_this.bindClickEvent(jtem["css"], jdex, $.hitch(_this,jtem["method"]));
		});
	},
	bindCheckAllCheckEvent : function () {
		  // bind all checkbox
		this.parentDom.undelegate(".checkBoxAllCSS","click");
		$(".checkBoxAllCSS").unbind("click");
		this.parentDom.delegate(".checkBoxAllCSS","click", function () {
	        var checked=$(this).is(":checked");
	        $(".checkBoxItemCSS").prop("checked",checked);
	    });
	    // bind  item checkbox evt
	    $(".checkBoxItemCSS").unbind("click");
	    this.parentDom.undelegate(".checkBoxItemCSS","click");
	    this.parentDom.delegate(".checkBoxItemCSS","click", function () {
	        var isAllCheck=true;
	        $(".checkBoxItemCSS").each(function () {
	            if(!$(this).is(":checked")){
	                isAllCheck=false;
	            }
	        });
	        $(".checkBoxAllCSS").prop("checked",isAllCheck);
	    });
	},
	bindClickEvent : function ( css, index, method) {
		if( css == null) css="";
        var arrs = css.split(' ');
        var cssSelect = '.operation_'+ (index!=null? index:0);
        for( var k in arrs) {
           if(jQuery.trim(arrs[k]) != '')cssSelect +='.'+( jQuery.trim(arrs[k]));
         }
		this.parentDom.undelegate(cssSelect,"click" );
		if( method != null) {
			this.parentDom.delegate(cssSelect, "click",method);
		}
	},
	//get value by dom= $(evt.target);
	getValuesOn : function( dom ) {
		return this.getRow(dom).data("data");
	},
	//get value checked 
	getValues : function( checkedOnly ) {
		checkedOnly = checkedOnly || false; // default include all

		var result = [];

		if( this.isShowCheckBox() ) {
			// Has radio button or check box
			var checkboxes = this.parentDom.find(".checkBoxItemCSS");
			for(var i = 0, iLen = checkboxes.length; i<iLen; i++) {
				var checkbox = checkboxes[i];
				var checked = checkbox.checked;
				if(checkedOnly && !checked) {
					continue;
				}
				var data = this.getRow(checkbox).data("data");
				data["checked"] = checked;				
				result.push(data);
			}
			
		} else {
			// Do not have any of the radio button or check box.
			// Get all data fro the table.
			// It will ignore the "checkedOnly", because there is no check box at all
			var rows = this.parentDom.find('tr');
			for(var i= 0, iLen = rows.length; i<iLen; i++) {
				var row = rows[i];
				var data = $(row).data("data");
				if(!!data) {
					result.push(data);
				}
			}
		}
		
		return result;
	},
	/**
	 * Get row contains the element
	 * @param element
	 * @returns {*|jQuery}
	 */
	getRow: function(element) {
		return $(element).closest('tr');
	},
	/**
	 * Get Next Row after current row, which contains the element
	 * @param element
	 * @returns {*}
	 */
	getNextRow: function(element) {
		var currentRow = this.getRow(element);
		return currentRow.next();
	},
	/**
	 * Get Previous Row before current row, which contains the element
	 * @param element
	 * @returns {*}
	 */
	getPreviousRow: function(element) {
		var currentRow = this.getRow(element);
		return currentRow.prev();
	},
	/**
	 * Move row up
	 * @param element
	 */
	moveRowUp: function(element) {
		var currentRow = this.getRow(element);
		var previousRow = this.getPreviousRow(element);
		if(previousRow && previousRow.length>0) {
			currentRow.insertBefore(previousRow);
			return {
				up: currentRow,
				down: previousRow
			};
		} else {
			return {
				currentRow: currentRow.data("data")
			};
		}
	},
	/**
	 * Move row down
	 * @param element
	 */
	moveRowDown: function(element) {
		var currentRow = this.getRow(element);
		var nextRow = this.getNextRow(element);
		if(nextRow && nextRow.length>0) {
			currentRow.insertAfter(nextRow);

			return {
				up: nextRow,
				down: currentRow
			};
		} else {
			return {
				currentRow:  currentRow.data("data")
			};
		}
	},
	/**
	 * Delete table row item.
	 */
	deleteRow: function(element) {
		var table = this.table;

		var row =   this.getRow(element);
		//row.remove();
		table.fnDeleteRow(row.index(), null, true);
	},
	
	insertRow : function ( item) {
		//Change Row Data To Need Array
		var columnsData = this.changeItemToColumnData(item);
		var table = this.table;
		//add new row to table, return is AoData`s index
		var newline =table.fnAddData( columnsData , true/* Redraw */);
		//Get newRow
		var newTr = table.fnSettings().aoData[newline[0]].nTr;
		//Store New Data
		$(newTr).data("data",item);
	},
	/**
	 * Get Row index From DataTable`s AoData;
	 * @param row
	 * @returns
	 */
	getRowIndexFromAoData :function( row ) {
		var table = this.table;
		// Default index
		var index = row.index();
		// DataTable`s AoData
		var data = table.fnSettings().aoData;
		$.each( data || [], function( i, item) {
			//Find By Row Data 
			if( $(item["nTr"]).data('data') == row.data('data') ) {
				index=i;
			}
		});
		return index;
	},
	updateRow : function( element ,data ) {
		var table = this.table;
		//Get Update Row
		var row = this.getRow(element);
		//Get Row Data
		var item = row.data("data");
		//Update Row Data
		$.extend( item, data);
		//Change Row Data To Need Array
		var columnsData = this.changeItemToColumnData(item);
		//Update DataTable;
		table.fnUpdate(columnsData, this.getRowIndexFromAoData(row));
		row.data("data",item);
	},
	// show table;
	show : function ( force) {
		this.fullData = this.fullData||this.data;
		this.data = this.filter( this.fullData );
		this.createTable( force );
	},
	// get values;
	getServerConfigKeys : function () {
		var tempkey=[];
        // check if has checkbox;
        if(this.isShowCheckBox()) {
			tempkey.push({"mDataProp":"checkBox_byds"});
		}
		// config keys
        if(this.head!=null&& this.head.length>0){
            for(var i=0;i<this.head.length;i++){
                var item=this.head[i];
                tempkey.push({"mDataProp":item.key});
            }
        }
        if(this.isShowOperation()) {
			tempkey.push({"mDataProp":this.getOperationKey()});
		}
		return tempkey;
	},
	configServerAjax : function () {
		var tableHelper = new TableJsServerAjaxHelper(this);
		var _option = {
           /*            "bFilter": false,*/
           "bSort":  false,
           "bPaginate":true,
           "bStateSave":false,
           "bDestroy" : true,
           "bFilter": false,
           "sInfoEmtpy": "没有数据",
           "sProcessing": "正在加载数据...",
           "bProcessing": true,
           "bServerSide": true,
           "sAjaxSource": this.getServerUrl(),
           "aoColumns":this.getServerConfigKeys(),
           "fnServerData":tableHelper.getRetrieveData(),
           "fnRowCallback":tableHelper.getRowCallBack()
       };
       this.opts= $.extend(_option,this.opts);
	}
	
}

function TableJsServerAjaxHelper(context) {
	this.baseContext = context;
	this.data = [];
}
TableJsServerAjaxHelper.prototype = {
		getContext :function(){
			return this.baseContext;
		},
		setData : function ( data) {
			this.data = !!data?data:[];
		},
		getData : function () {
			return this.data;
		},
		getRowCallBack : function() {
			var helper = this;
			return function(nRow, aData, iDisplayIndex) {
				$(nRow).data("data",aData["bydsold-item"]);
				return nRow;
	       };
		},
		//-- change server ajax json data to Array
		requestJsonDataToArray : function(jsonData,aoData,aoColumns){ //function to change Json data
	        var tableData={};
	        var datalen=jsonData.total===null?0:jsonData.total;
	        tableData.iTotalDisplayRecords = datalen;
	        tableData.iTotalRecords = datalen;
	        tableData.aaData = this.changeJsonToAaData( aoColumns, jsonData["data"]);
	        for(var k=0;k<aoData.length;k++){
	       		if(aoData[k].name==="sEcho"){
	            	tableData.sEcho=aoData[k].value;
	       		}
	        }
	        //console.info('tableData',tableData);
	        return tableData;
	    },
	    getRetrieveData : function() {
	    	var helper = this;
	        return function (sSource, aoData, fnCallback) {
	            //console.info(aoData,"retrieveData");
	            var aoColumns = this.dataTableSettings[0].aoColumns;
	            var params =helper.getContext().getServerParams() ||{};
	            $.ajax({
	            	"type" : "post",
	            	"url" : sSource,
	            	"dataType" : "json",
	            	"data" : $.extend(params,helper.getAoDataPageInfo(aoData,aoColumns)), // 以json格式传递
	            	"success": function (data) {
	            		helper.setData(data);
	            		var tableData=helper.requestJsonDataToArray(data,aoData,aoColumns);
	            		fnCallback(tableData);
	                 },
	                 "error" : function (data) {
	                	console.info("retrieveData error");
	                 }
	            });
	        }
	 	},
	 	changeJsonToAData :function (item,index) {
	 		var tempData=this.getContext().changeItemToTempData(item,index);
	    	var aData ={};
	    	aData["bydsold-item"]=item;
	    	$.each(tempData||[],function(index,jtem){
	    		aData[jtem["key"]]=jtem["value"];
	    	});
	    	return aData;
	 	},
	    changeJsonToAaData : function ( aoColumns,list ) {
		    var aaData = [];
		    if(list===null) list = [];
			for( var i =0; i<aoColumns.length; i++) {
				$.each(list,function(index,item){
					if(!item[aoColumns[i].mDataProp]) {
						item[aoColumns[i].mDataProp] ="";
					}
				});
			}
		    for(var i=0; i<list.length; i++) {
				aaData.push(this.changeJsonToAData(list[i],i));
		    }
			return aaData;
		},
		getAoDataPageInfo : function (aoData,aoColumns) {
			var start , count ,search,sortkey,sortvalue;
            $.each(aoData, function (index,item) {
	            if( item.name === "iDisplayStart") {
					start = item.value;
				} else if( item.name === "iDisplayLength") {
					count = item.value;
				} else if( item.name === "sSearch") {
					search = item.value;
				} else if (item.name =="iSortCol_0") {
					if(aoColumns!=null && item.value <aoColumns.length)sortkey =aoColumns[item.value]["mDataProp"];
				} else if (item.name == "sSortDir_0") {
					sortvalue = item.value;
				}
	      
	        });
			return {"start":start,"count":count,"search":search,"sortkey":sortkey,"sortby":sortvalue};
		}
}
function TableJsConfigHelper() {
	this.config = {};
	this.replace = [];
	this.relation = [];
	this.btns = [];
	this.checkboxsRequires = [];
}
TableJsConfigHelper.prototype = {
		setFenYe : function ( fenye ){
			this.config["fenye"] = fenye;
		},
		setOperation: function ( key ,show, name) {
			var temp = this.config["operation"] || {};
			if( key != null) temp["key"] = key;
			if( name != null) temp["name"] = name;
			if( show != null) temp["show"] = show;
			this.config["operation"]= temp;
		},
		setServerUrl : function(url) {
			var server = this.config['server']||{};
			if(url !=null) server["url"] = url;
			this.config['server'] =server;
		},
		setServerParams : function (params) {
			var server = this.config['server']||{};
			if(params !=null) server["params"] = params;
			this.config['server'] =server;
		},
		setServerEnable :function(enable) {
			var server = this.config['server']||{};
			if(enable !=null) server["enable"] = enable;
			this.config['server'] =server;
		},
		setSearchEnable : function (enable) {
			var search = this.config['search']||{};
			if(enable !=null) search["enable"] = enable;
			this.config['search'] =search;
		},
		setSearchText : function (text) {
			var search = this.config['search']||{};
			if(text !=null) search["text"] = text;
			this.config['search'] =search;
		},
		pushCKValue : function (key ,values , equal){
			this.checkboxsRequires.push({ key: key, equal : equal,values:values||[]});
		},
		setCheckBox : function( show, type, allcheck, css) {
			var temp = this.config["checkbox"] || {};
			if( show != null) temp["show"] = show;
			if( type != null) temp["type"] = type;
			if( allcheck != null) temp["allcheck"] = allcheck;
			if( css != null) temp["css"] = css;
			this.config["checkbox"]= temp;
		},
		emptyReplace : function () {
			this.replace= [];
		},
		emptyRelation : function () {
			this.relation =[];
		},
		emptyBtn : function () {
			this.btns=[];
		},
		emptyCk : function () {
			this.checkboxsRequires=[];
		},
		pushReplace : function( displayKey , values) {
			this.replace.push({ displayKey : displayKey, values : values});
		},
		pushRelation : function(displayKey, requireKey, values) {
			this.relation.push( { displayKey : displayKey, requireKey : requireKey , values : values});
		},
		pushBtn: function( displayKey, name , method , css , require ) {
			this.btns.push({ displayKey: displayKey, name : name , css : css , method : method, require : require });
		},
		getConfig : function () {
			this.config["replaceKeys"] = this.replace ;
			this.config["relationKeys"]= this.relation;
			this.config["buttons"] = this.btns;
			this.config["checkbox"] = this.config["checkbox"]||{};
			this.config["checkbox"]["require"]= this.checkboxsRequires;
			return this.config;
		}
}
function TableJsValueHelper () {
	this.data = [];
}
TableJsValueHelper.prototype =  {
		emptyData : function (){
			this.data = [];
		},
		pushValue : function ( value, display, equal){
			this.data.push({ value : value, display: display, equal: equal});
		},
		getData : function () {
			return this.data;
		}
}

function TableJsKeyValueHelper () {
	this.data = [];
}
TableJsKeyValueHelper.prototype =  {
		emptyData : function (){
			this.data = [];
		},
		pushValue : function ( key, value, equal){
			this.data.push({ key : key, values: value, equal : equal});
		},
		getData : function () {
			return this.data;
		}
}
$.hitch = function(context, func) {
    var args = Array.prototype.slice.call(arguments, 
            2/*Remove context, and func*/);
    
    return function() {
        return func.apply(context, 
                Array.prototype.concat.apply(args, arguments));
    };
};
$.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
    return {
        "iStart": oSettings._iDisplayStart,
        "iEnd": oSettings.fnDisplayEnd(),
        "iLength": oSettings._iDisplayLength,
        "iTotal": oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage": Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages": Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
};
$.extend($.fn.dataTableExt.oPagination, {
    "bootstrap": {
        "fnInit": function (oSettings, nPaging, fnDraw) {
            var oLang = oSettings.oLanguage.oPaginate;
            var fnClickHandler = function (e) {
                e.preventDefault();
                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                    fnDraw(oSettings);
                }
            };

            $(nPaging).addClass('pagination').append(
                    '<ul class="pagination">' +
                    '<li class="prev disabled"><a href="#">&larr; ' + oLang.sPrevious + '</a></li>' +
                    '<li class="next disabled"><a href="#">' + oLang.sNext + ' &rarr; </a></li>' +
                    '</ul>'
            );
            var els = $('a', nPaging);
            $(els[0]).bind('click.DT', { action: "previous" }, fnClickHandler);
            $(els[1]).bind('click.DT', { action: "next" }, fnClickHandler);
        },

        "fnUpdate": function (oSettings, fnDraw) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

            if (oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            }
            else if (oPaging.iPage <= iHalf) {
                iStart = 1;
                iEnd = iListLength;
            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }

            for (i = 0, iLen = an.length; i < iLen; i++) {
                // remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // add the new list items and their event handlers
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                        .insertBefore($('li:last', an[i])[0])
                        .bind('click', function (e) {
                            e.preventDefault();
                            oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                            fnDraw(oSettings);
                        });
                }

                // add / remove disabled classes from the static elements
                if (oPaging.iPage === 0) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
            }
        }
    }
});