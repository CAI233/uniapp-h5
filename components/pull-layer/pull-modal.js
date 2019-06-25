import Vue from 'vue';

let style = `.pull-layer-modal {
  justify-content: center;
  align-items: center;
}
.pull-layer-modal .pull-layer-plane-content {
  /* padding: 20upx; */
  border-radius: 5px;
  width: 72%;
  overflow: hidden;
  transition: all 0.3s;
  transform: scale(0);
	margin-bottom: 100upx;
}
.pull-layer-modal.active .pull-layer-plane-content {
  transform: scale(1);
}
.pull-layer-modal .pull-layer-btn{
  margin: 0;
  height: 44px;
  line-height: 44px;
  width: 100%;
  border-radius: 0;
  padding: 0;
  text-align: center;
  background:#fff;
  color:#101010;
  border:none;
}
.pull-layer-modal .pull-layer-btn-default{
	background:#fff;
	color:#101010;
	border-right:1px solid #ccc;
}
.pull-layer-modal .pull-layer-btn-primary{
	background:#007aff;
	color:#fff;
}
.pull-layer-modal .pull-layer-modal-title {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  padding: 0 15px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}
.pull-layer-modal .pull-layer-modal-content {
  min-height: 50px;
  font-size: 14px;
  color: #666;
  padding:15px;
  box-sizing: border-box;
}`;
let isActive = false;
let el = '';
let newBaseExtend = '';
function pullModal(obj,call){
	isActive = true;
	let baseExtend = Vue.extend({
		render(h){
			return h('view',{class:'pull-layer'},[
				h('style',{type:'text/css',domProps:{type:'text/css'}},style),
				h('view',{class:'pull-layer-modal pull-layer-plane flex-row'+(isActive? ' active' : '')},[
					h('view',{class:'pull-layer-plane-close',on:{click:()=>{
						init();
					}}}),
					h('view',{class:'pull-layer-plane-content'},[
						h('view',{class:'pull-layer-modal-box'},[
							h('view',{class:'pull-layer-modal-title hide-text-1'},'标题'),
							h('view',{class:'pull-layer-modal-content',style:{display:'block'}},'主体内容'),
							h('view',{class:'flex-row',style:{borderTop:'1px solid #ccc'}},[
								h('button',{class:'pull-layer-btn pull-layer-btn-default',domProps:{type:'default'},on:{click:()=>{
                                init();
                            }}},'取消s'),
								h('button',{class:'pull-layer-btn pull-layer-btn-primary',domProps:{type:'primary'},on:{click:()=>{
                                console.log('确定');
								call(obj,init);
                            }}},'确定')
							])
						])
					])
				])
			])
		}
	})
	newBaseExtend = new baseExtend();
	let vm = newBaseExtend.$mount();
	el = vm.$el;
	document.body.appendChild(el) // 把生成的提示的dom插入body中
}
function init(){
	document.body.removeChild(el);
	isActive = false;
	newBaseExtend.$destroy();
}

export {pullModal};