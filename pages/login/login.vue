<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<!-- <view class="welcome">欢迎回来！</view> -->
			<view class="input-content">
				<view class="input-item">
					<input type="text" :value="SellerName" placeholder="请选择对应渠道"  data-key="SellerNo" disabled @tap="toggleTab()"/>
				</view>
				<view class="input-item">
					<input type="text" :value="UserPhone" placeholder="请输入手机号/微信号" maxlength="20" data-key="UserPhone" @input="inputChange" />
				</view>
				<view class="input-item">
					<input type="text" value="" placeholder="请输入密码" placeholder-class="input-empty"  maxlength="20"
						password data-key="PassWord" @input="inputChange" @confirm="toLogin"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<!-- <button class="confirm-btn" @click="getLogin">获取信息</button> -->
			<view class="forget-section">
				<text @click="toRevPass">忘记密码?</text>
			</view>
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
		<pull-up step="1" v-if="SellerList.length > 0" :defaultVal="SellerNo" :current="true" @confirm="onConfirm" ref="picker" themeColor="#f00" :selectList="SellerList"></pull-up>
	</view>
</template>

<script>
	import {mapState,mapMutations } from 'vuex';
	import pullUp from '@/components/pull-up.vue';
	import rules from '@/common/rules.js';
	import {graceRules,graceShowLoading,graceHideLoading} from '@/common/graceRules.js';
	
	export default{
		data(){
			return {
				// userInfo:{},
				SellerNo:'',
				SellerName:'',
				UserPhone: '',
				PassWord: '',
				logining: false,
				SellerList:[]
			}
		},
		components:{
			pullUp
		},
		onLoad(){
			this.loadExecution();	
			
		},
		computed:{
			...mapState(['userInfo']),
		},
		methods: {
			...mapMutations(['login','setToken']),
			// 获取品牌渠道信息
			async getSellerList() {
				let _this = this;
				let SellerList = (await this.$http.GET('API/GetSellerList')).data;
				
				if(SellerList.length > 0){
					_this.SellerName = SellerList[0].SellerName;
					_this.SellerNo = SellerList[0].SellerNo;
					
				}
				// _this.$emit("SellerList",SellerList);
				_this.SellerList.push(...SellerList);
			},
			toggleTab(){//显示底部弹窗
				this.$refs.picker.show();
			},
			onConfirm(val){//获取选择的数据
				let _this = this;
				_this.SellerName = val.SellerName;
				_this.SellerNo = val.SellerNo;
			},
			inputChange(e){//小程序上使用
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			toRegist(){
				this.$api.msg('去注册');
			},
			toRevPass(){
				this.$api.msg('去修改密码');
			},
			async toLogin(){//点击注册
				// this.logining = true;
				const {SellerNo,SellerName,UserPhone, PassWord} = this;
				/* 数据验证模块*/
			 // 	if(!graceRules(sendData,rules.loginRule)){
				// 	return false;
				// };
				// graceShowLoading('加载中···');
				let param = {
				  PassWord:PassWord,
				  UserPhone:UserPhone,
				  SellerNo:SellerNo,
				  SellerName:SellerName,
				  OpenId:''
				};
				if(!graceRules(param,rules.loginRule)){
					return false;
				}
				graceShowLoading('登陆中···');
				param.PassWord = (await this.$http.POST('API/PostEn',{Content:this.PassWord})).details;//加密
				let res = await this.$http.POST('API/SetLogin',param);
				graceHideLoading();
				let userInfo = {...res.data.userInfo};
				userInfo.isRecRebate = res.data.isRecRebate;
				userInfo.IsOnlyGrand = res.data.IsOnlyGrand;
				userInfo.IsOrder = res.data.IsOrder;
				userInfo.IsPay = res.data.IsPay;
				this.login(userInfo);//缓存个人信息
				this.setToken(res.details)//缓存token
				uni.switchTab ({
					url: '/pages/index/index'
				})
			},
			loadExecution(){
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
				    const value = uni.getStorageSync('launchFlag');
					// console.log(value);
				    if (!value){
				        uni.reLaunch({
				        	url: '/pages/index/guide'
				        });
				    }else{
						if(this.token){
							console.log(this.userInfo);
							uni.switchTab ({
								url: '/pages/index/index'
							})
						}else{
							this.getSellerList();
						}
					}
				} catch(e) { 
					// error 
					uni.reLaunch({
						url: '/pages/index/guide'
					});
				}
			}
		},
		

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: #752121;
		position:relative;
		/* left: -16upx; */
		text-align: center;
		margin-bottom:70upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 60upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
