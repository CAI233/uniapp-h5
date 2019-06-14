<template>
	<view class="pull-radio">
		<view class="mask" :class="{'show':isShow}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="pull-radio-cnt" :class="{'show':isShow}">
			<view class="pull-radio-view">
				<view class="bottom-btn submit" @tap="submit">确定</view>
				<view class="bottom-btn" @tap="hide">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result:[],
				data:{},
				checkArr:[],
				checkValue:[],
				pickVal:[],
				isShow:false,
			};
		},
		computed:{
			
		},
		props:{
			
		},

		methods:{
			maskTap(){
				this.isShow = false;
			},
			show(){
				this.isShow = true;
			},
			hide(){
				this.isShow = false;
				this.$emit("cancel",'222');
			},
			submit(){
				this.$emit("ok",'111');
			},
		},
		mounted() {
		
		}
	}
</script>

<style lang="scss">
	.pull-radio{
		position: relative;
		z-index: 999999;
		.mask {
		  position: fixed;
		  z-index: 1000;
		  top: 0;
		  right: 0;
		  left: 0;
		  bottom: 0;
		  background: rgba(0, 0, 0, 0.6);
		  visibility: hidden;
		  opacity: 0;
		  transition: all 0.3s ease;
		}
		.mask.show{
			visibility: visible;
			opacity: 1;
		}
		.pull-radio-cnt {
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  width: 100%;
		  transition: all 0.3s ease;
		  transform: translateY(100%);
		  z-index: 3000;
		}
		.pull-radio-cnt.show {
		  transform: translateY(0);
		}

		.pull-radio-view {
		  width: 100%;
		  padding:30upx 0;
		  // height: 476upx;
		  overflow: hidden;
		  background-color: transprant;
		  z-index: 666;
		}
		.bottom-btn{
			margin: 0 30upx;
			text-align: center;
			background: #fff;
			padding: 20upx 0;
			border-radius: 10upx;
		}
		.bottom-btn.submit{
			background:#fa436a;
			color:#fff;
			margin-bottom:30upx;
		}
	}
</style>
