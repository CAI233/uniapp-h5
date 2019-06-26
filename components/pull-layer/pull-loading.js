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
let isActive = false;
let el = '';
let newBaseExtend = '';
function pullLoading(t,w,c){//t:文本 w:宽  c:颜色
	isActive = true;
	let baseExtend = Vue.extend({
		//https://www.jianshu.com/p/b931abe383e3   //方法介绍 Vue.extend
		render(h){
			return h('view',{style:'style'},[
				h('style',{domProps:{type:'text/css'}},style),
				h('view',{class:'pull-layer pull-layer-plane'+(isActive? ' active' : '')},[
					h('view',{class:'pull-layer-plane-close'}),
					h('view',{class:'pull-layer-plane-content flex-row'},[
						h('canvas',{domProps:{width:this.width,height:this.height,id:'pull-layer-plane-canvas'},class:'pull-layer-loading'})
					])
				])
			])
		},
		data() {
          return {
			width:w || 150,
			height:w || 150,
			ctx:'',
			size:'',
			text:t || '',
            options:{
				radius: (w || 150)/2 - 15,
				lineWidth: 6,
				strokeStyle: c || '#aacaf1',
				degreeStart: -90,
				degreeEnd: 270,
				stepStart: 12,
				stepEnd: 9
			}
          }
        }
	})
	newBaseExtend = new baseExtend();
	let vm = newBaseExtend.$mount();
	el = vm.$el;
	let canvas = el.querySelector("#pull-layer-plane-canvas");
	console.log(canvas);
	document.body.appendChild(el) // 把生成的提示的dom插入body中
	// initCanvas(canvas,newBaseExtend.options);
	setInterval(_=> {
		initCanvas(canvas,newBaseExtend.options);
	},20)
}
function init(){
	document.body.removeChild(el);
	isActive = false;
	newBaseExtend.$destroy();
}
// 开始画canvas
function initCanvas(canvas,opts){
	newBaseExtend.ctx = canvas.getContext('2d');
	newBaseExtend.size = Math.min(canvas.clientWidth, canvas.clientHeight);
	newBaseExtend.options.radius = opts.radius;
	newBaseExtend.options.lineWidth = opts.lineWidth;
	newBaseExtend.options.strokeStyle = opts.strokeStyle;
	newBaseExtend.options.degreeStart = opts.degreeStart;
	newBaseExtend.options.degreeEnd = opts.degreeEnd;
	newBaseExtend.options.stepStart = opts.stepStart;
	newBaseExtend.options.stepEnd = opts.stepEnd;
	strokeCanvas();
}
function strokeCanvas(){
	newBaseExtend.options.degreeStart = newBaseExtend.options.degreeStart + newBaseExtend.options.stepStart;
	newBaseExtend.options.degreeEnd = newBaseExtend.options.degreeEnd + newBaseExtend.options.stepEnd;
	if (newBaseExtend.options.degreeStart - 360 > newBaseExtend.options.degreeEnd) {
	  newBaseExtend.options.degreeStart -= 720;
	}
	newBaseExtend.ctx.clearRect(0, 0, newBaseExtend.size, newBaseExtend.size);
	newBaseExtend.ctx.lineWidth = newBaseExtend.options.lineWidth;
	newBaseExtend.ctx.beginPath();
	newBaseExtend.ctx.strokeStyle = newBaseExtend.options.strokeStyle;
	newBaseExtend.ctx.arc(newBaseExtend.size / 2, newBaseExtend.size / 2, newBaseExtend.options.radius + newBaseExtend.options.lineWidth / 2, (newBaseExtend.options.degreeStart < newBaseExtend.options.degreeEnd ? newBaseExtend.options.degreeStart : newBaseExtend.options.degreeEnd) * Math.PI / 180, (newBaseExtend.options.degreeStart < newBaseExtend.options.degreeEnd ? newBaseExtend.options.degreeEnd : newBaseExtend.options.degreeStart) * Math.PI / 180, false);
	// newBaseExtend.ctx.setLineCap('round');
	newBaseExtend.ctx.lineCap = "round";
	newBaseExtend.ctx.stroke();
	newBaseExtend.ctx.beginPath();
	newBaseExtend.ctx.font = "18px Arial";
	newBaseExtend.ctx.fillStyle = newBaseExtend.options.strokeStyle;
	newBaseExtend.ctx.textAlign = 'center';
	newBaseExtend.ctx.textBaseline = "middle";
	newBaseExtend.ctx.fillText(newBaseExtend.text, newBaseExtend.width/2,newBaseExtend.height/2,newBaseExtend.size);
}

export {pullLoading};