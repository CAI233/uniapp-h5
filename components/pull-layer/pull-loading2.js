import Vue from 'vue';
let style = `.pull-layer .pull-layer-plane-close {
  background: rgba(255,255,255,0.9);
}
.pull-layer .pull-layer-plane-content {
  justify-content: center;
  align-items: center;
  background: none;
  min-height: 100%;
  opacity: 0;
  transition: all 0.5s;
  background:none;
}
.pull-layer.active .pull-layer-plane-content {
  opacity: 1;
}
.pull-layer.active .pull-layer-plane-content .pull-layer-loading{
	background:#fff;
}`;
let el = '';
let newBaseExtend = '';
let num = 0;

function pullLoading2(t,w,c){//t:文本 w:宽  c:颜色
	let baseExtend = Vue.extend({
		//https://www.jianshu.com/p/b931abe383e3   //方法介绍 Vue.extend
		render(h){
			return h('view',{style:'style'},[
				h('style',{domProps:{type:'text/css'}},style),
				h('view',{class:'pull-layer pull-layer-plane active'},[
					h('view',{class:'pull-layer-plane-close'}),
					h('view',{class:'pull-layer-plane-content flex-row'},[
						h('canvas',{domProps:{width:this.width,height:this.height,id:'pull-layer-plane-canvas'},class:'pull-layer-loading'})
					])
				])
			])
		},
		data() {
          return {
			width:w || 300,
			height:w || 300,
			ctx:'',
			size:'',
			text:t || '',
            oW:w,
			oH:w,
            r:w/2,//半径
            lineWidth:2,//线宽
            cR : 0,
			bR : 0,
            axisLength: 0, // Sin 图形长度
            unit : 0, // 波浪宽
            range:0.3, //浪辐
            nowrange:0,
            xoffset :0, // x 轴偏移量
            dataNums:50,//数据量
            sp : 0, // 周期偏移量
            nowdata:0,
            waveupsp : 0.002, // 水波上涨速度
          }
        },
		mounted() {
			this.cR = w/2 - 8 * this.lineWidth;
			this.bR = this.r - 8 * this.lineWidth;
			this.axisLength= 2 * w/2 - 16 * this.lineWidth;// Sin 图形长度
			this.unit = this.axisLength / 8;// 波浪宽
			this.nowrange=this.range;
			this.xoffset =8 * this.lineWidth; // x 轴偏移量
		}
	})
	newBaseExtend = new baseExtend();
	let vm = newBaseExtend.$mount();
	el = vm.$el;
	console.log(el);
	let canvas = el.querySelector("#pull-layer-plane-canvas");
	document.body.appendChild(el) // 把生成的提示的dom插入body中
	initCanvas(canvas,newBaseExtend);
}
// function reLoad(){
// 	let reBaseExtend = {...newBaseExtend};
// 	newBaseExtend.oW=reBaseExtend.oW,
// 	newBaseExtend.oH=newBaseExtend.oH,
// 	newBaseExtend.r=newBaseExtend.r,
// 	newBaseExtend.lineWidth=newBaseExtend.lineWidth;
// 	newBaseExtend.cR =newBaseExtend.cR;
// 	newBaseExtend.bR = newBaseExtend.bR;
// 	newBaseExtend.axisLength= newBaseExtend.axisLength;
// 	newBaseExtend.unit =newBaseExtend.unit;
// 	newBaseExtend.range=newBaseExtend.range;
// 	newBaseExtend.nowrange=newBaseExtend.nowrange;
// 	newBaseExtend.xoffset =newBaseExtend.xoffset;
// 	newBaseExtend.dataNums=newBaseExtend.dataNums;
// 	newBaseExtend.sp = newBaseExtend.sp;
// 	newBaseExtend.nowdata=newBaseExtend.nowdata;
// 	newBaseExtend.waveupsp = newBaseExtend.waveupsp;
// }
function init(){
	document.body.removeChild(el);
	newBaseExtend.$destroy();
}
// 开始画canvas
function initCanvas(canvas,opts){
	newBaseExtend.ctx = canvas.getContext('2d');

	newBaseExtend.ctx.globalCompositeOperation = 'destination-over';
	newBaseExtend.ctx.beginPath();
	newBaseExtend.ctx.lineWidth = newBaseExtend.lineWidth;
	newBaseExtend.ctx.arc(newBaseExtend.r, newBaseExtend.r, newBaseExtend.bR, 0, 2 * Math.PI, 1);

	newBaseExtend.ctx.beginPath();
	newBaseExtend.ctx.save();
	newBaseExtend.ctx.arc(newBaseExtend.r, newBaseExtend.r, newBaseExtend.r - 16 * newBaseExtend.lineWidth, 0, 2 * Math.PI, 1);
	newBaseExtend.ctx.restore()
	newBaseExtend.ctx.clip();

	newBaseExtend.ctx.fillStyle = "#1c86d1";
	render();
	// setInterval(_=> {
	// 	render();
	// },20)
}
function strokeCanvas(ctx,obj){
	ctx.beginPath();
	ctx.save();
	let Stack = []; // 记录起始点和终点坐标
	for (let i = obj.xoffset; i <= obj.xoffset + obj.axisLength; i += 20 / obj.axisLength) {
		let x = obj.sp + (obj.xoffset + i) / obj.unit;
		let y = Math.sin(x) * obj.nowrange;

		let dx = i;

		let dy = 2 * obj.cR * (1 - obj.nowdata) + (obj.r - obj.cR) - (obj.unit * y);
		ctx.lineTo(dx, dy);
		Stack.push([dx, dy])
	}
	// 获取初始点和结束点
	let startP = Stack[0]
	let endP = Stack[Stack.length - 1]
	ctx.lineTo(obj.xoffset + obj.axisLength, obj.oW);
	ctx.lineTo(obj.xoffset, obj.oW);
	ctx.lineTo(startP[0], startP[1]);
	ctx.fillStyle = "#1c86d1";
	ctx.fill()
	ctx.restore();
	if(16 * newBaseExtend.lineWidth >= startP[1]){
		console.log(123);
	}
	newBaseExtend.sp += 0.07;
	// requestAnimationFrame(strokeCanvas(ctx,obj))
}
function render() {
	newBaseExtend.ctx.clearRect(0, 0, newBaseExtend.oW, newBaseExtend.oH);
	if (newBaseExtend.dataNums >= 0.85) {
		if (newBaseExtend.nowrange > newBaseExtend.range / 4) {
			var t = newBaseExtend.range * 0.01;
			newBaseExtend.nowrange -= t;
		}
	} else if (newBaseExtend.dataNums <= 0.1) {
		if (newBaseExtend.nowrange < newBaseExtend.range * 1.5) {
			var t = newBaseExtend.range * 0.01;
			newBaseExtend.nowrange += t;
		}
	} else {
		if (newBaseExtend.nowrange <= newBaseExtend.range) {
			var t = newBaseExtend.range * 0.01;
			newBaseExtend.nowrange += t;
		}

		if (newBaseExtend.nowrange >= newBaseExtend.range) {
			var t = newBaseExtend.range * 0.01;
			newBaseExtend.nowrange -= t;
		}
	}

	if ((newBaseExtend.dataNums - newBaseExtend.nowdata) > 0) {
		newBaseExtend.nowdata += newBaseExtend.waveupsp;
	}
	if ((newBaseExtend.dataNums - newBaseExtend.nowdata) < 0) {
		newBaseExtend.nowdata -= newBaseExtend.waveupsp
	}
	newBaseExtend.sp += 0.09;
	// console.log(newBaseExtend.dataNums)
	strokeCanvas(newBaseExtend.ctx,newBaseExtend);
	requestAnimationFrame(render)
}

export {pullLoading2};