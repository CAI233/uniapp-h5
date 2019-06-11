
// module.exports = {
// 	check : function (data, rule){
// 		for(var i = 0; i < rule.length; i++){
// 			if (!rule[i].checkType){return true;}
// 			if (!rule[i].name) {return true;}
// 			if (!rule[i].errorMsg) {return true;}
// 			if (!data[rule[i].name]) {this.error = rule[i].errorMsg; return false;}
// 			switch (rule[i].checkType){
// 				case 'string':
// 					var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
// 					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
// 				break;
// 				case 'int':
// 					var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
// 					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
// 					break;
// 				break;
// 				case 'between':
// 					if (!this.isNumber(data[rule[i].name])){
// 						this.error = rule[i].errorMsg;
// 						return false;
// 					}
// 					var minMax = rule[i].checkRule.split(',');
// 					minMax[0] = Number(minMax[0]);
// 					minMax[1] = Number(minMax[1]);
// 					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
// 						this.error = rule[i].errorMsg;
// 						return false;
// 					}
// 				break;
// 				case 'betweenD':
// 					var reg = /^-?[1-9][0-9]?$/;
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 					var minMax = rule[i].checkRule.split(',');
// 					minMax[0] = Number(minMax[0]);
// 					minMax[1] = Number(minMax[1]);
// 					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
// 						this.error = rule[i].errorMsg;
// 						return false;
// 					}
// 				break;
// 				case 'betweenF': 
// 					var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
// 					if (!reg.test(data[rule[i].name])){this.error = rule[i].errorMsg; return false;}
// 					var minMax = rule[i].checkRule.split(',');
// 					minMax[0] = Number(minMax[0]);
// 					minMax[1] = Number(minMax[1]);
// 					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
// 						this.error = rule[i].errorMsg;
// 						return false;
// 					}
// 				break;
// 				case 'same':
// 					if (data[rule[i].name] != rule[i].checkRule) { this.error = rule[i].errorMsg; return false;}
// 				break;
// 				case 'notsame':
// 					if (data[rule[i].name] == rule[i].checkRule) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'email':
// 					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'phoneno':
// 					var reg = /^1[0-9]{10,10}$/;
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'zipcode':
// 					var reg = /^[0-9]{6}$/;
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'reg':
// 					var reg = new RegExp(rule[i].checkRule);
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'in':
// 					if(rule[i].checkRule.indexOf(data[rule[i].name]) == -1){
// 						this.error = rule[i].errorMsg; return false;
// 					}
// 				break;
// 				case 'notnull':
// 					if(data[rule[i].name] == null || data[rule[i].name].length < 1){this.error = rule[i].errorMsg; return false;}
// 				break;
// 			}
// 		}
// 		return true;
// 	},
// 	isNumber : function (checkVal){
// 		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
// 		return reg.test(checkVal);
// 	}
// }
function graceToast(title,time,shade){
	uni.showToast({
		title: title,
		duration:time,
		mask:shade,
		icon:'none'
	});
}
function graceShowLoading(title){
	console.log(title);
	uni.showLoading({
		title: title,
		mask:true
	});
}
function graceHideLoading(){
	uni.hideLoading();
}
function graceModel(model,obj){
	if(obj.checkRule){//有限制长度
		let typeArr = obj.checkRule.split(",");
		if(typeArr.length == 1){//单独一个限制  必须满足最小值
			if(model[obj.name].length < typeArr[0]){
				graceToast(obj.errorMsg,1500,true);
				return false;
			}
		}else{//两个限制，区间 
			if(model[obj.name].length < typeArr[0]){
				graceToast(obj.errorMsg,1500,true);
				return false;
			}
			if(model[obj.name].length > typeArr[1]){
				graceToast(obj.errorMsg,1500,true);
				return false;
			}

		}
	}
}
function graceRules (obj,rule){
	for(var i = 0; i < rule.length; i++){
		switch(rule[i].checkType){//按类型校验
			case 'notnull':
					if(obj[rule[i].name].length <1){
						graceToast(rule[i].errorMsg,1500,true);
						return false;
					}
					console.log(graceModel(obj,rule[i]));
					graceModel(obj,rule[i]);
				break;
			case 'string':
				console.log('string');
				break;
		}
	}
	return true;
}


export {graceRules,graceToast,graceShowLoading,graceHideLoading} 