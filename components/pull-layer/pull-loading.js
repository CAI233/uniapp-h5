import Vue from 'vue';
let style = `.pull-layer .pull-layer-plane-close {
  background: rgba(0,0,0,0.4);
}
.pull-layer .pull-layer-plane-content {
  justify-content: center;
  align-items: center;
  background: none;
  min-height: 100%;
  opacity: 0;
  transition: all 0.5s;
}
.pull-layer.active .pull-layer-plane-content {
  opacity: 1;
}`;
let isActive = false;
let el = '';
let newBaseExtend = '';
function pullLoading(){
	isActive = true;
	let baseExtend = Vue.extend({
		//https://www.jianshu.com/p/b931abe383e3   //方法介绍 Vue.extend
		render(h){
			return h('view',{style:''},[
				h('style',{type:'text/css'}),
				h('view',{class:'pull-layer pull-layer-plane'+(isActive? ' active' : '')},[
					h('view',{class:'pull-layer-plane-close'}),
					h('view',{class:'pull-layer-plane-content flex-row'},[
						h('canvas',{domProps:{width:200,height:200,id:'pull-layer-plane-canvas'},class:'pull-layer-loading'})
					])
				])
			])
		},
		data() {
          return {
			ctx:'',
			size:'',
            options:{
				radius: 50,
				lineWidth: 3,
				strokeStyle: '#aacaf1',
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
	newBaseExtend.ctx.arc(newBaseExtend.size / 2, newBaseExtend.size / 2, newBaseExtend.options.radius - newBaseExtend.options.lineWidth / 2, (newBaseExtend.options.degreeStart < newBaseExtend.options.degreeEnd ? newBaseExtend.options.degreeStart : newBaseExtend.options.degreeEnd) * Math.PI / 180, (newBaseExtend.options.degreeStart < newBaseExtend.options.degreeEnd ? newBaseExtend.options.degreeEnd : newBaseExtend.options.degreeStart) * Math.PI / 180, false);
	newBaseExtend.ctx.stroke();
	newBaseExtend.ctx.beginPath();
	newBaseExtend.ctx.font = "bold 50px";
	newBaseExtend.ctx.fillStyle = newBaseExtend.options.strokeStyle;
	newBaseExtend.ctx.textAlign = 'center';
	newBaseExtend.ctx.fillText('加载中···', 100,100,newBaseExtend.size);
}

export {pullLoading};