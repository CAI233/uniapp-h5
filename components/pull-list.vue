<template>
	<view class="pull-list">
		<view class="mask" :class="{'show':isShow}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="pull-list-cnt" :class="{'show':isShow}">
			<view class="pull-list-hd" @touchmove.stop.prevent catchtouchmove="true">
			  <view class="pull-list-btn" @tap="hide">取消</view>
			  <view>222{{lisY}}</view>
			  <view class="pull-list-btn" :style="{'color':themeColor}" @tap="submit">确定</view>
			</view>
			<view class="pull-list-view" @touchmove="lisMove" @touchstart="lisStart" @touchend="lisEnd">
				<!-- :style="'transform:translateY('+lisY+'px);transform-origin: center;'" -->
				<!-- :style="'margin-top:'+lisY+'px;'"  -->
				
				<view class="pull-list-cont" :style="'transform: translateY('+lisY+'px);-ms-transform: translateY('+lisY+'px);-moz-transform: translateY('+lisY+'px);-webkit-transform: translateY('+lisY+'px);-o-transform: translateY('+lisY+'px);'">
					<view class="item" :class="item.SellerNo == dSellerNo ? 'active' : ''" v-for="(item,index) in selectList" :key="index">{{item.SellerName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				start:0,
				startLate:0,
				move:0,
				lisY:0,
				lisM:0,
				isMove:false,
				lisIndex:0,
				dSellerNo:'',
				step:1,//每次只能切换一个
			};
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
			selectList:{
				type:Array,
				default(){
					return [];
				}
			},
			defaultVal:{
				type:String,
				default(){
					return ""
				}
			},
		},

		methods:{
			lisStart(e){
				// console.log(e.changedTouches[0].pageY);
				this.start = e.changedTouches[0].pageY;
				this.startLate = this.lisY;
				this.isMove = true;
			},
			lisMove(e){
				this.move = e.changedTouches[0].pageY;
				if(!this.isMove) return false;
				// let lisM = this.move - this.start;
				this.lisM = this.move - this.start;
				let lisM = this.lisM;
				if(lisM <0){
					lisM = Math.abs(lisM) < 40 ? lisM : -40
				}else{
					lisM = Math.abs(lisM) < 40 ? lisM : 40
				}
				let len = this.selectList.length;
				if(this.lisIndex == 0 && lisM >0) return false;
				if(this.lisIndex == 1-len && lisM <0) return false;
				this.lisY = Math.round(lisM/40)*40 + this.startLate ;
			},
			lisEnd(e){
				if(!this.isMove) return false;
				if(this.lisY == this.startLate) return false;
				this.lisIndex = this.lisY/40 - 2;
				this.dSellerNo = this.selectList[Math.abs(this.lisIndex)].SellerNo;
				this.dSellerName = this.selectList[Math.abs(this.lisIndex)].SellerName;
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
				console.log(this.dSellerNo);
				console.log(this.dSellerName);
			},
		},
		mounted() {
			this.dSellerNo = this.defaultVal;
			this.selectList.map((item,index) => {
				if(item.SellerNo == this.defaultVal){
					this.dSellerName = item.SellerName;
					this.lisIndex = index
				}
			});
			this.lisY =  80 - this.lisIndex*40;
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
