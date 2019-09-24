<template>
	<view ref="canvas_id" >
		<!-- <canvas ref="GVerify" :width="width" :height="height"></canvas> -->
		<!-- <can-vas @revLoad="getImg" :width="width" :height="height"></can-vas> -->
		 <canvas style="width: 300px; height: 200px;" canvas-id="firstCanvas"></canvas>
	</view>
</template>

<script>
	import Vue from 'vue';
	let el = '';
	let ctx = '';
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
		components: {
			canVas:{
				render(h){
					//如果组件是其他组件的子组件，需为插槽指定名称  slot: 'name-of-slot',
					return h('canvas',{ref:'graphic_canvasRef',domProps:{},attrs:{id:'graphic_canvas',width:this.width,height:this.height},class:'canvas-id-c',style:{border:'1px solid red'},on:{click:()=>{
						this.$emit('revLoad')
					}}})
				},
			}
		},
		data() {
			return {
				letterArr:[],
				code:'',
			}
		},
		onReady:function(e){
			console.log(111);
			this.drawNew();
		},
		mounted(){
			console.log(222);
			// this.load();
			// this.init();
		},
		methods:{
			init(){//创建canvas
				let that = this;
				let baseExtend = Vue.extend({
					//https://www.jianshu.com/p/b931abe383e3   //方法介绍 Vue.extend
					render(h){
						return h('canvas',{domProps:{width:that.width,height:that.height,id:'graphic_canvas'},class:'canvas-id-',on:{click:()=>{
                                // that.drawImg(el,that);
								console.log(234);
								this.$emit('getImg',123)
                            }}})
					},
					data() {
					  return {
						
					  }
					}
				})
				let newBaseExtend = new baseExtend();
				let vm = newBaseExtend.$mount();
				el = vm.$el;
				let canvasId = that.$refs.canvas_id.$el;
				canvasId.appendChild(el);
				ctx = el.getContext('2d');
				that.drawImg(el,that);
			},
			load(){
				let nowEl = document.body.querySelector("#graphic_canvas");
				ctx = nowEl.getContext('2d');
				this.drawImg(nowEl);
			},
			getImg(){
				this.load();
			},
			drawImg(el){
				ctx.clearRect(0,0,this.width,this.height);
				ctx.fillStyle = this.randomColor(180, 240);
				
				ctx.fillRect(0, 0, this.width, this.height);
				this.getLetter(this.type);//获取图形码集合
				this.drawNum(this.num);
				//console.log(this.code);
			},
			drawNew(){
				var context = uni.createCanvasContext('firstCanvas')
					
				context.setStrokeStyle("#00ff00")
				context.setLineWidth(5)
				context.rect(0, 0, 200, 200)
				context.stroke()
				context.setStrokeStyle("#ff0000")
				context.setLineWidth(2)
				context.moveTo(160, 100)
				context.arc(100, 100, 60, 0, 2 * Math.PI, true)
				context.moveTo(140, 100)
				context.arc(100, 100, 40, 0, Math.PI, false)
				context.moveTo(85, 80)
				context.arc(80, 80, 5, 0, 2 * Math.PI, true)
				context.moveTo(125, 80)
				context.arc(120, 80, 5, 0, 2 * Math.PI, true)
				context.stroke()
				context.draw()
			},
			drawNum(num){
				this.code = '';
				for(var i = 1; i <= num; i++) {
					var txt = this.letterArr[this.randomNum(0, this.letterArr.length)];
					this.code += txt;
					
					ctx.font = this.randomNum(this.height/2, this.height)/2 + 'px Arial'; //随机生成字体大小
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
					ctx.textBaseline = "middle";
					ctx.textAlign = 'center';
					ctx.fillText(txt, 0, 0);
					/**恢复旋转角度和坐标原点**/
					ctx.rotate(-deg * Math.PI / 180);
					ctx.translate(-x, -y);
				}
				this.getImgUrl();
			},
			getImgUrl(){
				let imgUrl = ctx.canvas.toDataURL("image/png");
				this.$emit("outUlr",imgUrl);
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
		computed: {
			
		}
	}
	
</script>
	
<style>
</style>
