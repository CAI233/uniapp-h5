import Vue from 'vue';

let style = `.pull-layer .pull-layer-plane-close {
  background: none;
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
}
.pull-layer .pull-layer-plane-content .pull-layer-box {
  background:#2db7f5;
  color: #ffffff;
  padding: 10px;
  min-width: 36%;
  max-width: 64%;
  font-size: 14px;
  border-radius: 5px;
  text-align:center;
}
.pull-layer .pull-layer-plane-content .pull-layer-box .warning{
	background:#ff9900;
}
.pull-layer .pull-layer-plane-content .pull-layer-box .error{
	background:#ed4014;
}
.pull-layer .pull-layer-plane-content .pull-layer-box .success{
	background:#19be6b;
}
`;
let isActive = false;
function pullToast(msg,durtion,type){
	if(!msg || msg == ''){
		return false;
	}
	let el = '';
	isActive = true;
	let baseExtend = Vue.extend({
		render(h){
			return h('view',{style:''},[
				h('style',{type:'text/css'},style),
				h('view',{class:'pull-layer pull-layer-plane'+(isActive? ' active' : '')},[
					h('view',{class:'pull-layer-plane-close'}),
					h('view',{class:'pull-layer-plane-content flex-row'},[
						h('view',{class:'pull-layer-box '+type},msg)
					])
				])
			])
		}
	})
	let newBaseExtend = new baseExtend();
	let vm = newBaseExtend.$mount();
	el = vm.$el;
	document.body.appendChild(el) // 把生成的提示的dom插入body中
	let set = setTimeout(_=> {
		clearTimeout(set);
		document.body.removeChild(el);
		isActive = false;
		newBaseExtend.$destroy()
		},durtion || 1500)
}

export {pullToast};