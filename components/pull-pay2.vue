<template>
	<view class="pull-pay">
		<view class="mask" :class="{'show':isShow}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="pull-pay-cnt" :class="{'show':isShow}">
			<view class="pull-pay-hd" @touchmove.stop.prevent catchtouchmove="true">
				<text class="pull-pay-cancel yticon icon-zuojiantou-up" @tap="hide"></text> 请输入支付密码
			</view>
			<view class="pull-pay-view">
				<view class="pull-pay-cont" >
					<input type="text" maxlength="1" v-for="(o, i) in list" v-model="o.val" :key="i" :focus="o.fs" :class="{'focus': o.fs}" @focus="onFocus(i)" @blur="onBlur(i)" @input="onInput($event, i)"/>
				</view>
				<view class="pull-pay-text">忘记密码？找回并完成支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				// 验证码的个数（现在是6个）
				list: [
					{val: '', fs: true},  // 初始发时使第一个输入框架得到焦点
					{val: '', fs: false}, 
					{val: '', fs: false},
					{val: '', fs: false},
					{val: '', fs: false},
					{val: '', fs: false}
				],
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
			},
			payConfirm(){
				this.$emit("ok",this.payVal);
				this.hide()
			},
			// 当输入框的内容改变时的操作
			onInput(e, i) {
				// 输入完成时，跳到下一个输入框(得到焦点)
				if (i < (this.list.length - 1) && e.target.value) {
					// 如果下一个输入框有值，则不跳
					if(!this.list[i + 1].val) this.onFocus(i + 1, true);
				};
				// 删除时，跳到上一个输入框
				if(i && !e.target.value) {
					// if(!this.list[i - 1].val)
					this.onFocus(i - 1, true);
				};
			},
			// 得到焦点 激活下边框样式
			onFocus(i, t) {
				// this.list[i].val = '';	// 清除输入框中的内容
				
				// if(!this.list[i].val || this.list[i].val == ''){
				// 	console.log(123);
				// 	return false;
				// }
				// console.log(456)
				this.list[i].fs = true;
			},
			// 失去焦点 去除下边框样式
			onBlur(i) {
				this.list[i].fs = false;
			},
		},
		mounted() {
		
		}
	}
</script>

<style lang="scss">
	.pull-pay{
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
		.pull-pay-cnt {
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  width: 100%;
		  transition: all 0.3s ease;
		  transform: translateY(100%);
		  z-index: 3000;
		}
		.pull-pay-cnt.show {
		  transform: translateY(0);
		}
		.pull-pay-hd {

		  padding: 0 30upx;
		  height: 88upx;
		  line-height: 88upx;
		  background-color: #fff;
		  position: relative;
		  text-align: center;
		  font-size: 32upx;
		  border-bottom:1px solid #ccc;
		  .pull-pay-cancel{
		  	font-size: 30upx;
			position: absolute;
			left: 30upx;
		  }
		}
		.pull-pay-view {
		  width: 100%;
		  // height: 476upx;
		  overflow: hidden;
		  background-color: #f7f7f7;
		  z-index: 666;
		  padding-bottom:30upx;
		  .pull-pay-cont{
			 display: flex; 
			 flex-direction: row;  
			 justify-content: space-between; 
			 padding: 30upx 0 50upx; 
			 width: 360upx;
			 margin: 0 auto;
			 input{ 
				 width: 40upx; 
				 height: 40upx; 
				 line-height: 40upx; 
				 border: none; 
				 border-bottom: 4upx solid #b2bfbd; 
				 text-align: center; 
				 color: #4c4e60; 
				 font-size: 46upx;
				 &.focus{ 
					 border-color: #4c79fa;
					}
			}
		  }
			.pull-pay-text{
				color:#2d8cf0;
				text-align:center;
				font-size:30upx;
			}  
		}
	}
</style>
