var filters={
	filterPhone:function(value){
		//显示手机号码中间4位*号[telphone-133****1234]
		if(value !== undefined){
			var start = value.substring(0,3),
				end = value.substring(7,11);
			return start+'****'+end;
		}
	}
}

export default filters;