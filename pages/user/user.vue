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
		<!-- #ifdef APP-PLUS -->
			<view class="example">
				<view class="example-title">从左侧滑出</view>
				<button @click="showDrawer">显示抽屉</button>
			</view>
		<!-- #endif -->
		
		<pull-list ref="pullList" :dataList="nowList" :lisIndex="0"></pull-list>
	</view>
</template>

<script>
	import pullList from '../../components/pull-list.vue'
	export default{
		data(){
			return {
				nowList:[
					{SellerName:'测试sa名称',SellerNo:'1002324'},
					{SellerName:'测试sfsdf名称',SellerNo:'100232324'},
					{SellerName:'测试名xcvxssd称',SellerNo:'100sdf2324'},
					{SellerName:'测试xvxv名称',SellerNo:'100sfs2324'},
					{SellerName:'测试名sdfsd称',SellerNo:'1002ada324'},
					{SellerName:'测sfs试名称',SellerNo:'1002sdfs324'},
					{SellerName:'测试sdfs名称',SellerNo:'100ada2324'},
					{SellerName:'测试sf名称',SellerNo:'1002adas324'},
					{SellerName:'测试sfsdf名称',SellerNo:'1002ada324'}
					]
			}
		},
		components:{
			pullList
		},
		onReady: function (e) {

		},
		onLoad() {
			// pullToast
			// this.getToken();
		    // initDraw();
			// #ifdef APP-PLUS
				// 监听 drawer 消息
				uni.$on('drawer-page', (data) => {
					uni.showToast({
						title: '点击了第' + data + '项',
						icon:"none"
					});
				})
			// #endif
			
		},
		onUnload() {
			// #ifdef APP-PLUS
				uni.$off('drawer-page');
			// #endif
		},
		methods: {
			// #ifdef APP-PLUS
				showDrawer() {
					uni.getSubNVueById('drawer').show('slide-in-left', 200);
				},
			// #endif
			toggleTab(){//显示底部弹窗
				this.$refs.pullList.show();	
				// this.$refs.anRef.show();
				// pullLoading2('加载···',300);
			},
			getUrl(val){
				this.srcImg = val
			},
			async getToken(){
				// let aa = document.createElement("iframe");
				// aa.src = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=48WK8Rz3GPAgeYiEdnLvd2q7&client_secret=VB4L7BKIM6gjhrLvRVfkHykN4vyq7VwF';
				// document.body.appendChild(aa);
				// uni.request({
				// 	url: aa.src, //仅为示例，并非真实接口地址。
				// 	data: {},
				// 	header: {
				// 		'content-type':'application/x-www-form-urlencoded',
				// 		'custom-header': 'hello' ,//自定义请求头信息
				// 		'Access-Control-Allow-Origin':'https://aip.baidubce.com/',
				// 		'Access-Control-Allow-Methods':'*',
				// 		'Access-Control-Allow-Headers':'x-requested-with,content-type'
				// 	},
				// 	success: (res) => {
				// 		console.log(res);
				// 		
				// 	}
				// });
				// let option = await this.$http.outGet('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=48WK8Rz3GPAgeYiEdnLvd2q7&client_secret=VB4L7BKIM6gjhrLvRVfkHykN4vyq7VwF');
				// console.log(option)
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
	.example {
		padding: 0 10px 10px
	}
	.example-title {
		font-size: 14px;
		line-height: 14px;
		color: #777;
		margin: 40px 2upx;
		position: relative
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
