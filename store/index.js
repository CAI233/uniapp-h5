import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: uni.getStorageSync('userInfo') || {},
		token:uni.getStorageSync('token') || '',
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		setToken(state, provider){
			state.token = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'token',  
			    data: provider  
			}) 
		},
		loginOut(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.token = '';
			uni.removeStorage({  
                key: 'userInfo' ,
				key:'token'
            })
			console.log('123')
			uni.reLaunch({
				url: '../pages/login/login'
			});
		}
	},
	actions: {
	
	}
})

export default store
