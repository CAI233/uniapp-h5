<template>
	<view class="content">
		<swiper class="swiper" :autoplay="autoplay" :duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/guide1.jpg" mode="aspectFit"></image></view>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/guide2.jpg" mode="aspectFit"></image></view>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/guide3.jpg" mode="aspectFit"></image></view>
				</view>
				<view class="experience" @tap="launchFlag()">{{experience}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		onLoad(){
			// console.log(uni.getStorageSync('launchFlag'))
			
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
						key: 'launchFlag',
						data: true,
				});
				uni.reLaunch({
					url: '/pages/login/login'
				});
				
			}
		}
	}
</script>
<style>
	page,
	.content{
		
		/* width: 100%;
		height: 100%; */
		/* #ifdef MP-WEIXIN */
		width: 100vw;
		height: 100vh;
		/* #endif */
		/* background-size: 100% auto ; */
		padding: 0;
		background-color: rgba(0,0,0,1);
	}
	.swiper{
		/* width: 100%;
		height: 100%; */
		/* #ifdef MP-WEIXIN */
		width: 100vw;
		height: 100vh;
		/* #endif */
		background: #FFFFFF;
	}
	.swiper-item {
		/* width: 100%;
		height: 100%; */
		/* #ifdef MP-WEIXIN */
		width: 100vw;
		height: 100vh;
		/* #endif */
		text-align: center;
		position: relative;
		/* display: flex;
		justify-content: center;
		align-items:flex-end;
		flex-direction:column-reverse */
	}
	.swiper-item-img{
		/* width: 100%;
		height: 100%; */
		/* #ifdef MP-WEIXIN */
		width: 100vw;
		height: 100vh;
		/* #endif */
		margin: 0 auto;
	}
	.swiper-item-img image{
		/* width: 80%; */
		/* width:100%;
		height:100%; */
		/* #ifdef MP-WEIXIN */
		width: 100vw;
		height: 100vh;
		/* #endif */
	}
	.uniapp-img{
		/* height: 20%; */
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items:center;
		overflow: hidden;
	}
	.uniapp-img image{
		/* width: 40%; */
		width:100%;
		height:100%;
	}
	
	.jump-over,.experience{
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #fff;
		border: 1px solid #fff;
		z-index: 999;
	}
	.jump-over{
		right: 45upx;
		top: 125upx;
	}
	.experience{
		right: 50%;
		margin-right: -105upx;
		bottom: 20%;
	}
</style>
