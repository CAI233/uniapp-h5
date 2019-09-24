<template>
	<view class="pull-list">
		<view class="mask" :class="{'show':isShow}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="pull-list-cnt" :class="{'show':isShow}">
			<view class="pull-list-hd" @touchmove.stop.prevent catchtouchmove="true">
			  <view class="pull-list-btn" @tap="hide">取消</view>
			  <!-- <view>{{lisY}}</view> -->
			  <view class="pull-list-btn" :style="{'color':themeColor}" @tap="submit">确定</view>
			</view>
			<view class="pull-list-view" @touchmove="lisMove" @touchstart="lisStart" @touchend="lisEnd">
				<!-- :style="'transform:translateY('+lisY+'px);transform-origin: center;'" -->
				<!-- :style="'margin-top:'+lisY+'px;'"  -->
				
				<view class="pull-list-cont" :style="[{transform: coverTransform,transition: coverTransition}]">
					<view class="item" :class="(index == numIndex) ? 'active' : ''" v-for="(item,index) in dataList" :key="index">{{item.SellerName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let startY = 0, moveY = 0, pageAtTop = true;
	export default {
		data() {
			return {
				isShow:false,
				baseSize:80,//每格高度
				lisY:0,//Y轴偏移
				moveDistance:0,//移动距离
				numIndex:0,
				coverTransform:'translateY(0px)',
				coverTransition:'0s',
				moving: false
			}
		},
		computed:{
			
		},
		props:{
			themeColor:{
				type:String,
				default(){
					return "#f00"
				}
			},
			dataList:{
				type:Array,
				default(){
					return [];
				}
			},
			lisIndex:{
				type:Number,
				default(){
					return 0
				}
			}
			
		},
		methods:{
			lisStart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			lisMove(e){
				moveY = e.touches[0].clientY;
				this.moveDistance = moveY - startY;
				let lisY = parseInt(this.lisY)+parseInt(this.moveDistance);

				this.numIndex = Math.abs(Math.round(lisY/this.baseSize*2)-2);
				this.moving = true;
				this.coverTransform = 'translateY('+lisY+'px)';
				
			},
			lisEnd(e){
				let lisY = parseInt(this.lisY) + parseInt(this.moveDistance);
				// 
				this.lisY = Math.round(lisY/this.baseSize*2)*this.baseSize/2;
				if(this.lisY >= this.baseSize){
					this.numIndex = 0;//到顶
					this.lisY = this.baseSize;
				}
				if(this.lisY <= (-this.dataList.length+3)*this.baseSize/2){
					this.numIndex = this.dataList.length -1;//到底
					this.lisY = (-this.dataList.length+3)*this.baseSize/2;
				}
				this.coverTransition = 'transform 0.3s cubic-bezier(0.25,0.1,0.25,1)';
				this.coverTransform = 'translateY('+this.lisY+'px)';
			},
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
				this.isShow = false;
				
			},
		},
		mounted() {
			this.numIndex = this.lisIndex;
			this.lisY = this.baseSize - this.lisIndex* this.baseSize/2;
			this.coverTransform = 'translateY('+this.lisY+'px)';
			// this.dSellerNo = this.defaultVal;
			// this.dataList.map((item,index) => {
			// 	if(item.SellerNo == this.defaultVal){
			// 		this.dSellerName = item.SellerName;
			// 		this.lisIndex = index
			// 	}
			// });
			// this.lisY =  80 - this.lisIndex*40;
		}
	}
</script>

<style lang="scss">
	.pull-list{
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
		.pull-list-cnt {
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  width: 100%;
		  transition: all 0.3s ease;
		  transform: translateY(100%);
		  z-index: 3000;
		}
		.pull-list-cnt.show {
		  transform: translateY(0);
		}
		.pull-list-hd {
		  display: flex;
		  align-items: center;
		  padding: 0 30upx;
		  height: 88upx;
		  background-color: #fff;
		  position: relative;
		  text-align: center;
		  font-size: 32upx;
		  justify-content: space-between;
		  .pull-list-btn{
		  	font-size: 30upx;
		  }
		}
		
		.pull-list-hd:after {
		  content: ' ';
		  position: absolute;
		  left: 0;
		  bottom: 0;
		  right: 0;
		  height: 1px;
		  border-bottom: 1px solid #e5e5e5;
		  color: #e5e5e5;
		  transform-origin: 0 100%;
		  transform: scaleY(0.5);
		}
		.item {
		  text-align: center;
		  width: 100%;
		  height: 40px;
		  line-height: 40px;
		  text-overflow: ellipsis;
		  white-space: nowrap;
		  font-size: 30upx;
		  color:#ccc;
		  &.active{
			  color:#101010;
			  // border-top:1px solid #ccc;
			  // border-bottom:1px solid #ccc;
			  box-sizing: border-box;
		  }
		}
		.pull-list-view {
		  width: 100%;
		  height: 476upx;
		  overflow: hidden;
		  background-color: #fff;
		  z-index: 666;
		  position: relative;
		  .pull-list-cont{
			  transition:all 0.2s;
			  width: 100%;
		  }
		}
	}
</style>
