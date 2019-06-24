<template>
	<view class="pull-pay">
		<view class="mask" :class="{'show':isShow}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="pull-pay-cnt" :class="{'show':isShow}">
			<view class="pull-pay-hd" @touchmove.stop.prevent catchtouchmove="true">
				<text class="pull-pay-cancel yticon icon-zuojiantou-up" @tap="hide"></text> 请输入支付密码
			</view>
			<view class="pull-pay-view">
				<view class="pull-pay-cont" @tap="showKey">
					<view class="pull-pay-num" :class="{'active':index <= payVal.length -1}" v-for="(item,index) in payData" :key="index">{{item.val}}</view>
				</view>
				<view class="pull-pay-text">忘记密码？找回并完成支付{{payVal}}</view>
			</view>
			<view class="pull-pay-foot" v-show="isFocus">
				<view class="pull-pay-lis">
					<view class="pull-pay-list" :class="{'active':item.isCheck}" v-for="(item,index) in numData" :key="index" @tap="payNum(item.num)">{{item.num}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFocus:false,
				payVal:'',
				isShow:false,
				numData:[
					{num:'1',isCheck:false},
					{num:'2',isCheck:false},
					{num:'3',isCheck:false},
					{num:'4',isCheck:false},
					{num:'5',isCheck:false},
					{num:'6',isCheck:false},
					{num:'7',isCheck:false},
					{num:'8',isCheck:false},
					{num:'9',isCheck:false},
					{num:'',isCheck:false},
					{num:'0',isCheck:false},
					{num:'x',isCheck:false},
					],
				payData:[{val:''},{val:''},{val:''},{val:''},{val:''},{val:''}]
			};
		},
		computed:{
			
		},
		props:{
			
		},
		methods:{
			maskTap(){
				this.isShow = false;
				this.isFocus = false;
			},
			show(){
				this.isShow = true;
				this.isFocus = true;
			},
			hide(){
				this.isShow = false;
				this.isFocus = false;
				this.payVal = '';
				this.numData.map(item => item.isCheck = false);
				this.payData.map(item => item.val = '')
			},
			payCancel(){
				this.$emit("cancel",{
					result:''
				});
				this.hide();
			},
			payConfirm(){
				this.$emit("ok",this.payVal);
				this.hide()
			},
			showKey(){
				this.isFocus = !this.isFocus;
			},
			payNum(val){
				if(val == ''){
					return false;
				}
				this.numData.map(item => {
					if(item.num == val){
						item.isCheck = true;
					}else{
						item.isCheck = false;
					}
				})
				if(val == 'x'){
					this.revNum();
					return false;
				}
				this.payVal += val;
				if(this.payVal.length >=6){
					this.payConfirm();
					return false;
				}
			},
			revNum(){
				this.payVal = this.payVal.slice(0,this.payVal.length-1);
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
			 justify-content: center;
			 padding:40upx 30upx;
			 .pull-pay-num{
				 border: 1px solid #ccc;
				 text-align:center;
				 width:80upx;
				 height: 80upx;
				 line-height: 80upx;
				 &:nth-child(1){
					 border-radius:10upx 0 0 10upx;
				 }
				 &:nth-last-child(1){
					 border-radius:0 10upx 10upx 0;
				 }
				 &:not(:nth-last-of-type(1)){
					border-right:none;
				 }
			 }
			.active{
				position: relative;
				&::after{
					content:'';
					display:block;
					position:absolute;
					left:20upx;
					top:20upx;
					width:40upx;
					height:40upx;
					border-radius:50%;
					background:#101010;
				}
			}
		  }
			.pull-pay-text{
				color:#2d8cf0;
				text-align:center;
				font-size:30upx;
			}  
		}
		.pull-pay-foot{
			.pull-pay-lis{
				overflow:hidden;
				background:#fff;
				.pull-pay-list{
					float:left;
					width:percentage(100/3/100);
					height:90upx;
					line-height:90upx;
					font-size:36upx;
					text-align:center;
					box-sizing: border-box;
					&:nth-child(3n){
						border-left:1px solid #ccc;
						border-bottom:1px solid #ccc;
					}
					&:nth-child(3n+1){
						border-right:1px solid #ccc;
						border-bottom:1px solid #ccc;
					}
					&:nth-child(3n+2){
						border-bottom:1px solid #ccc;
					}
				}
				.active{
					// border:1px solid #2d8cf0 !important;
					color:#2d8cf0;
				}
			}
		}
	}
</style>
