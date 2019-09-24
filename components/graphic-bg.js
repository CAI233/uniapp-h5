import Vue from 'vue';

let el = '';
let ctx = '';
let clearColor = 'rgba(0, 0, 0, .1)';
let drops = [];
let max = 30;
let width = window.innerWidth;
let height = window.innerHeight;
let imgUrl = '';
function initDraw(){
	drops = [];
	
	let baseExtend = Vue.extend({
		render(h){
			return h('canvas',{domProps:{width:width,height:height,id:'graphic-canvas'}})
		},
		data() {
		  return {
		  }
		}
	})
	let newBaseExtend = new baseExtend();
	let vm = newBaseExtend.$mount();
	let el = vm.$el;
	
	ctx = el.getContext('2d');
	
	setup();
	anim();
	document.body.appendChild(el) // 把生成的提示的dom插入body中
	// imgUrl = ctx.canvas.toDataURL("image/png");
}
function random(min, max) {
    return Math.random() * (max - min) + min;
}

function beginDraw() {};

beginDraw.prototype = {
	init: function() {
		this.x = random(0, width);
		this.y = 0;
		this.color = 'hsl(180, 100%, 50%)';
		this.w = 2;
		this.h = 1;
		this.vy = random(4, 5);
		this.vw = 3;
		this.vh = 1;
		this.size = 2;
		this.hit = random(height * .8, height * .9);
		this.a = 1;
		this.va = .96;
	},
	draw: function() {
		if (this.y > this.hit) {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y - this.h / 2);

			ctx.bezierCurveTo(
				this.x + this.w / 2, this.y - this.h / 2,
				this.x + this.w / 2, this.y + this.h / 2,
				this.x, this.y + this.h / 2);

			ctx.bezierCurveTo(
				this.x - this.w / 2, this.y + this.h / 2,
				this.x - this.w / 2, this.y - this.h / 2,
				this.x, this.y - this.h / 2);

			ctx.strokeStyle = 'hsla(180, 100%, 50%, '+this.a+')';
			ctx.stroke();
			ctx.closePath();
			
		} else {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.size, this.size * 5);
		}
		this.update();
	},
	update: function() {
		if(this.y < this.hit){
			this.y += this.vy;
		} else {
			if(this.a > .03){
				this.w += this.vw;
				this.h += this.vh;
				if(this.w > 100){
					this.a *= this.va;
					this.vw *= .98;
					this.vh *= .98;
				}
			} else {
				this.init();
			}
		}
	}
}

function setup(){
	for(var i = 0; i < max; i++){
		(function(j){
			setTimeout(function(){
				var beginDraws = new beginDraw();
				beginDraws.init();
				drops.push(beginDraws);
			}, j * 200)
		}(i));
	}
}


function anim() {
	ctx.fillStyle = clearColor;
	ctx.fillRect(0,0,width,height);
	for(var i in drops){
		drops[i].draw();
		// imgUrl = ctx.canvas.toDataURL("image/png");
		// console.log(imgUrl);
	}
	requestAnimationFrame(anim);
}
window.addEventListener("resize", resize);

function resize(){
	width = window.innerWidth;
	height = window.innerHeight;
	initDraw();
}
export {initDraw};