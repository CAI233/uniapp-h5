<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import {mapState } from 'vuex';
	export default {
		data() {
			return {
				title: 'Hello word'
			}
		},
		computed:{
			...mapState(['userInfo']),
		},
		onLoad() {
			this.getBannerList();
		},
		methods: {
			async getBannerList(){
				let _this = this;
				let res = await _this.$http.ReqGet('API/GetBanner/6');
				console.log(res);
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
