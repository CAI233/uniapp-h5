<template>
	<view class="choose-lis">
		<view class="choose-lis-cont">
			<view class="choose-list">
				<view class="choose-list-title" @tap="showList"><text class="title-text">全部</text></view>
			</view>
			<view class="choose-list-cont" :show="isShow" :class="{'show':isShow}">
				<view class="choose-list-cont-li" v-for="(item,index) in dataArr" :key="index"><text class="list-cont-li">{{item}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				dataArr: ['综合排序', '价格降序', '价格升序']
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
			showList(){
				this.isShow = !this.isShow;
			}
		},
		mounted() {
			console.log(111);
		}
	}
</script>

<style lang="scss">
	.choose-lis{
		.choose-lis-cont{
			// &::after{
			// 	display:block;
			// 	content:'';
			// 	clear:both;
			// }
			position:relative;
			.choose-list-cont{
				// float: left;
				position:absolute;
				left:0;
				background:#fff;
				width: 100%;
				padding: 0 15px;
				box-shadow: 1px 1px 1px #ccc;
				opacity:0;
				height:0;
				z-index:-1;
				&.show{
					opacity: 1;
					height:auto;
					transition: all 0.5s;
					z-index:9;
				}
			}
		}
	}
</style>
