<template>
	<view ref="canvas_id">
		<!-- <canvas ref="GVerify" :width="width" :height="height"></canvas> -->
	</view>
</template>

<script>
	import Vue from 'vue';
	let el = '';
	let newBaseExtend = '';
	export default {
		props: {
			src: {
				type: String,
				default: 'empty'
			},
			width:{
				type:Number,
				default:200
			},
			height:{
				type:Number,
				default:100
			},
			type:{
				type:String,
				default:"blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
			},
			num:{//默认4位验证码
				type:Number,
				default:4
			}
		},
	
		data() {
			return {
				letterArr:[],
				code:''
			}
		},
		methods:{
			init(){//创建canvas
				let baseExtend = Vue.extend({
					//https://www.jianshu.com/p/b931abe383e3   //方法介绍 Vue.extend
					render(h){
						return h('canvas',{domProps:{width:this.width,height:this.height,id:'graphic-canvas'},class:'canvas-id-',on:{click:()=>{
                                console.log('确定');
								let that = this;
								// console.log(that);
								loadImg()
								// that.drawImg(el);
                            }}})
					},
					data() {
					  return {
						
					  }
					}
				})
				newBaseExtend = new baseExtend();
				let vm = newBaseExtend.$mount();
				el = vm.$el;
				let canvasId = this.$refs.canvas_id.$el;
				canvasId.appendChild(el);
				console.log(el);
				// let canvas = this.$refs.GVerify.$el;
				// console.log(canvas);
				this.drawImg(el);
			},
			drawImg(el){
				let ctx = el.getContext('2d');
				
				ctx.fillStyle = this.randomColor(180, 240);
				ctx.fillRect(0, 0, this.width, this.height);
				this.getLetter(this.type);//获取图形码集合
				this.drawNum(ctx,this.num);
			},
			drawNum(ctx,num){
				for(var i = 1; i <= num; i++) {
					var txt = this.letterArr[this.randomNum(0, this.letterArr.length)];
					this.code += txt;
					
					ctx.font = this.randomNum(this.height/2, this.height)/2 + 'px Arial'; //随机生成字体大小
					console.log(this.randomNum(this.height/2, this.height))
					ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色        
					ctx.shadowOffsetX = this.randomNum(-3, 3);
					ctx.shadowOffsetY = this.randomNum(-3, 3);
					ctx.shadowBlur = this.randomNum(-3, 3);
					ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
					var x = this.width / 5 * i;
					var y = this.height / 2;
					var deg = this.randomNum(-30, 30);
					/**设置旋转角度和坐标原点**/
					ctx.translate(x, y);
					ctx.rotate(deg * Math.PI / 180);
					// ctx.lineCap = "round";
					// ctx.textBaseline = "middle";
					ctx.textAlign = 'center';
					ctx.fillText(txt, 0, 0);
					/**恢复旋转角度和坐标原点**/
					ctx.rotate(-deg * Math.PI / 180);
					ctx.translate(-x, -y);
				}
			},
			getLetter(ty){
				let num = '0,1,2,3,4,5,6,7,8,9';
				let abc = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
				let arr = []
				switch(ty){
					case 'number':
						arr = [...num.split(",")];
						break;
					case 'letter':
						arr = [...abc.split(",")];
						break;
					default:
						arr = [...num.split(","),...abc.split(",")];
				}
				this.letterArr = arr;
			},
			randomNum(min,max){
				return Math.floor(Math.random() * (max - min) + min);
			},
			randomColor(min,max){
				let r = this.randomNum(min, max);
				let g = this.randomNum(min, max);
				let b = this.randomNum(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			}
		},
		mounted(){
			this.init();
		},
		computed: {
			
		}
	}
	function loadImg(){
		let el = newBaseExtend.$el;
		// newBaseExtend.drawImg(el);
		console.log(newBaseExtend);
	}
</script>
	
<style>
</style>
