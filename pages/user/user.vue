<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<button class="confirm-btn" @tap="outBtn">清除</button>
		</view>
		<view class="wrapper">
			<button class="confirm-btn" @tap="toggleTab()">选择弹窗</button>
		</view>
		<!-- <pull-radio  @ok="submit" @cancel="cancel" ref="pullRadio" themeColor="#f00" ></pull-radio> -->
		<!-- <pull-check  @ok="submit" @cancel="cancel" ref="pullCheck" themeColor="#f00" ></pull-check> -->
		<pull-date  @ok="submit" @cancel="cancel" ref="pullDate" themeColor="#f00" ></pull-date>
	</view>
</template>

<script>
	// import pullRadio from '@/components/pull-radio.vue';
	// import pullCheck from '@/components/pull-check.vue';
	import pullDate from '@/components/pull-date.vue';
	export default{
		data(){
			return {
				isShow:false
			}
		},
		components:{
			// pullRadio
			// pullCheck
			pullDate
		},
		onLoad() {
	
		},
		methods: {
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
			},
			toggleTab(){//显示底部弹窗
				// this.$refs.pullRadio.show();
				// this.$refs.pullCheck.show();
				this.$refs.pullDate.show();
			},
			submit(val){
				console.log(val);
			},
			cancel(val){
				console.log(val);
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
