<template>
	<view class="pull-area">
		<view class="mask" :class="{'show':isShow}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="pull-area-cnt" :class="{'show':isShow}">
			<view class="pull-area-hd" @touchmove.stop.prevent catchtouchmove="true">
			  <view class="pull-area-btn" @tap="hide">取消</view>
			  <view>{{this.nPre+'/'+this.nCity+'/'+this.nCounty}}</view>
			  <view class="pull-area-btn" :style="{'color':themeColor}" @tap="submit">确定</view>
			</view>
			<view class="pull-area-view" @touchmove="lisMove" @touchstart="lisStart" @touchend="lisEnd">
				<view class="pull-area-cn" v-for="(items,indexs) in areaArray" :key="'s'+indexs">
					<view class="pull-area-cont" :style="'transform: translateY('+items.roll+'px);-ms-transform: translateY('+items.roll+'px);-moz-transform: translateY('+items.roll+'px);-webkit-transform: translateY('+items.roll+'px);-o-transform: translateY('+items.roll+'px);'">
						<view class="item" :class="item.areaName == items.place ? 'active' : ''" v-for="(item,index) in items.list" :key="index">{{item.areaName}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import areaList from "@/components/area.js";
	export default {
		data() {
			return {
				isShow:false,
				start:0,
				startLate:0,
				move:0,
				lisM:0,
				isMove:false,
				
				areaArray:[],
				nPre : '',
				nCity : '',
				nCounty : '',
				pageIndex:0
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
				let clientW = document.body.clientWidth;
				let startX = e.changedTouches[0].pageX;
				this.pageIndex = Math.floor(startX*3/clientW);//根据点击页面位置判断是滚动省市区
				this.start = e.changedTouches[0].pageY;
				this.startLate = this.areaArray[this.pageIndex].roll;
				this.isMove = true;
			},
			lisMove(e){
				this.move = e.changedTouches[0].pageY;
				if(!this.isMove) return false;
				this.lisM = this.move - this.start;
				let lisM = this.lisM;
				// if(lisM <0){
				// 	lisM = Math.abs(lisM) < 40 ? lisM : -40
				// }else{
				// 	lisM = Math.abs(lisM) < 40 ? lisM : 40
				// }
				lisM = Math.round(lisM/80)*40;
				console.log(lisM)
				let nowScoll = this.areaArray[this.pageIndex];
				let len = nowScoll.list.length;
				if(nowScoll.lisIndex == 0 && lisM >0) return false;
				if(nowScoll.lisIndex == 1-len && lisM <0) return false;
				if(nowScoll.list.length < 2) return false;//当市或区长度小于2时，不准滑动 
				//上 就是往下走
				// nowScoll.roll = Math.round(lisM/40)*40 + this.startLate ;
				nowScoll.roll = lisM + this.startLate ;
				nowScoll.lisIndex = nowScoll.roll/40 - 2;
				nowScoll.place = nowScoll.list[Math.abs(nowScoll.lisIndex)].areaName;	
			},
			lisEnd(e){
				let nowScoll = this.areaArray[this.pageIndex];	
				if(nowScoll.roll == this.startLate) return false;
				switch(this.pageIndex){
					case 0:
						this.nPre = nowScoll.place;
						this.getArea(this.nPre,'','');//更新地区
						break;
					case 1:
						this.nCity = nowScoll.place;
						this.getArea(this.nPre,this.nCity,'');//更新地区
						break;
					case 2:
						this.nCounty = nowScoll.place;
						this.getArea(this.nPre,this.nCity,this.nCounty);//更新地区
						break;
				}
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
			getArea(pre,city,county){
				this.nPre = pre;
				this.nCity = city;
				this.nCounty = county
				this.areaArray = [];
				this.nPre = pre ? pre : areaList[0].areaName;
				areaList.map((item,index) =>{
					if(item.areaName == this.nPre){
						let cityList = item.children;
						this.areaArray.push({roll:(2-index)*40,place:this.nPre,lisIndex:index,list:areaList});//省
						this.nCity = city ? city : cityList[0].areaName;
						cityList.map((items,indexs) =>{
							if(items.areaName == this.nCity){ 
								let countyList = items.children;
								this.areaArray.push({roll:(2-indexs)*40,place:this.nCity,lisIndex:indexs,list:cityList});//市
								this.nCounty = county ? county : countyList[0].areaName;
								countyList.map((itemss,indexss) =>{
									if(itemss.areaName == this.nCounty){
										this.areaArray.push({roll:(2-indexss)*40,place:this.nCounty,lisIndex:indexss,list:countyList});//区
									}
								})
							}
						})
					}
				});
			}
		},
		mounted() {
			console.log(this.defaultVal);
			let defaultArr = this.defaultVal.length >0 ? this.defaultVal.split(",") : [];
			if(defaultArr.length > 0){
				this.getArea(defaultArr[0],defaultArr[1],defaultArr[2]);
			}else{
				this.getArea();
			}
			
		}
	}
</script>

<style lang="scss">
	.pull-area{
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
		.pull-area-cnt {
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  width: 100%;
		  transition: all 0.3s ease;
		  transform: translateY(100%);
		  z-index: 3000;
		}
		.pull-area-cnt.show {
		  transform: translateY(0);
		}
		.pull-area-hd {
		  display: flex;
		  align-items: center;
		  padding: 0 30upx;
		  height: 88upx;
		  background-color: #fff;
		  position: relative;
		  text-align: center;
		  font-size: 32upx;
		  justify-content: space-between;
		  .pull-area-btn{
		  	font-size: 30upx;
		  }
		}
		
		.pull-area-hd:after {
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
			  box-sizing: border-box;
		  }
		}
		.pull-area-view {
		  display: flex;
		  .pull-area-cn{
			  flex:1;
			  height: 476upx;
			  overflow: hidden;
			  background-color: #fff;
			  z-index: 666;
			  position: relative;
		  }
		  .pull-area-cont{
			  transition:all 0.5s;
			  width: 100%;
		  }
		}
	}
</style>
