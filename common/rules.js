export default {
	/* 用户登录 */
	loginRule: [{
		name: "UserPhone",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请输入手机号/微信号"
	},{
		name: "password",
		checkType: "notnull",
		checkRule: "6,20",
		errorMsg: "密码不能少于6位"
	}]
}