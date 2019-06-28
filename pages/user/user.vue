<template>
	<view class="container">
		<!-- <view class="left-bottom-sign"></view> -->
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<!-- <view class="right-top-sign"></view> -->
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<button class="confirm-btn" @tap="outBtn">清除</button>
		</view>
		<view class="wrapper">
			<button class="confirm-btn" @tap="toggleTab()">选择弹窗</button>
		</view>
		<graphic-verify :width="300" :height="200"></graphic-verify>
		<!-- <pull-radio  @ok="submit" @cancel="cancel" ref="pullRadio" themeColor="#f00" ></pull-radio> -->
		<!-- <pull-check  @ok="submit" @cancel="cancel" ref="pullCheck" themeColor="#f00" ></pull-check> -->
		<!-- <pull-date  @ok="submit" @cancel="cancel" ref="pullDate" themeColor="#f00" ></pull-date> -->
		<!-- <pull-list v-if="SellerList.length > 0" :defaultVal="SellerNo" @ok="submit" @cancel="cancel" ref="pullList" themeColor="#f00" :selectList="SellerList"></pull-list> -->
		<!-- <pull-area :defaultVal="'海南省,海口市,市辖区'" @ok="submit" @cancel="cancel" ref="pullArea" themeColor="#f00" ></pull-area> -->
		<!-- <pull-pay @ok="submit" @cancel="cancel" ref="pullPay" themeColor="#f00" ></pull-pay> -->
		<!-- <wm-poster Width="250" imgSrc="https://sclmweb.saselomo.com//QRcode/MakeQRcode3?rMid=yxT+EFEy9oYMkfGfGWop4IUhYmHJLwcrpF8moKbtWOTaPJTOXW1lfZwa/MOzvPq+3cBh4IclWTo=" QrSrc="https://sclmweb.saselomo.com//QRcode/MakeQRcode3?rMid=yxT+EFEy9oYMkfGfGWop4IUhYmHJLwcrpF8moKbtWOTaPJTOXW1lfZwa/MOzvPq+3cBh4IclWTo=" Title="标题文本" PriceTxt="价格显示" OriginalTxt="划线价显示"></wm-poster> -->
	</view>
</template>

<script>
	// import pullRadio from '@/components/pull-radio.vue';//单选
	// import pullCheck from '@/components/pull-check.vue';//选择
	// import pullDate from '@/components/pull-date.vue';//日期区间选择
	// import pullList from '@/components/pull-list.vue';//单列选择
	// import pullArea from '@/components/pull-area.vue';//地区三级联动
	// import pullPay from '@/components/pull-pay.vue';//支付密码
	// import wmPoster from '@/components/wm-poster.vue';//二维码canvas
	import {pullLoading} from '@/components/pull-layer/pull-layer.js';
	import graphicVerify from '@/components/graphic-verify.vue'
	export default{
		data(){
			return {
				SellerNo:'800001',
				isShow:false,
				SellerList: [
					{"SellerNo": "800001","SellerName": "1234656护肤",}, 
					{"SellerNo": "800002","SellerName": "1234656彩妆",}, 
					{"SellerNo": "800003","SellerName": "1234656养面膜",}, 
					{"SellerNo": "800016","SellerName": "1234656健康",}, 
					{"SellerNo": "800018","SellerName": "1234656全品牌",},
					{"SellerNo": "8000012","SellerName": "1234656123护肤",}, 
					{"SellerNo": "8000022","SellerName": "1234656123彩妆",}, 
					{"SellerNo": "8000032","SellerName": "1234656123养面膜",}, 
					{"SellerNo": "8000162","SellerName": "1234656123健康",}, 
					{"SellerNo": "8000182","SellerName": "1234656123全品牌",},
					]
			}
		},
		components:{
			// pullRadio
			// pullCheck
			// pullDate,
			// pullList
			// pullArea
			// pullPay
			// wmPoster
			graphicVerify
		},
		onLoad() {
			// pullToast
		},
		methods: {
			toggleTab(){//显示底部弹窗
				// this.$refs.pullRadio.show();
				// this.$refs.pullCheck.show();
				// this.$refs.pullDate.show();
				// this.$refs.pullList.show();
				// this.$refs.pullArea.show();
				// this.$refs.pullPay.show();
				// pullModal({id:'1111'},this.submit);
				pullLoading('加载中···');
				// console.log(pullToast);
			},
			onScroll(e){
				console.log(e);
			},
			submit(val,call){
				console.log(val);
				call();
			},
			cancel(val){
				// console.log(val);
			},
			outBtn(){//清除
				uni.showModal({
					title: '清除launchFlag值',
					content: '确定要清除launchFlag值，进行重启测试？',
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							// 清除缓存
							uni.clearStorage();
							// 两秒后重启
							// #ifdef APP-PLUS
							uni.showToast({
								icon: 'none',
								duration:3000,
								title: '清除成功2秒后重启'
							});
							setTimeout(function() {
								uni.hideToast();
								plus.runtime.restart();
							}, 2000);
							// #endif
							// 两秒后跳转
							// #ifdef H5 || MP-WEIXIN
							uni.showToast({
								icon: 'none',
								duration:3000,
								title: '清除成功2秒后刷新'
							});
							setTimeout(function() {
								uni.reLaunch({
									url: '/pages/index/guide'
								});
							}, 2000);
							
							// #endif
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
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
		overflow: hidden;
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

	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
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
</style>
