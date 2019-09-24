import Vue from 'vue'

import store from './store'
import App from './App'
import $http from './api/http.js'
//本地打包  https://www.jianshu.com/p/e41d80c0cbc2
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store;
Vue.prototype.$api = {msg,prePage};
Vue.prototype.$http = $http;

const app = new Vue({
    ...App
})
app.$mount()
