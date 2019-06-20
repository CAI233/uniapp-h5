<template>
	<view class="pull-date">
		<view class="mask" :class="{'show':isShow}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="pull-date-cnt" :class="{'show':isShow}">
			<view class="pull-date-view">
				<view class="picker-box-c">
					<view class="picker-header">
						<view class="picker-month-prev" @click="preMon"> << </view>
						<view class="picker-year-prev" @click="preYear"> < </view>
						<view class="picker-year">{{year}}年 {{month}}月</view>
						<view class="picker-year-next" @click="nextYear"> > </view>
						<view class="picker-month-next" @click="nextMon"> >> </view>
					</view>
					<view class="picker-content">
						<view class="picker-week">
							<view class="picker-weekday">日</view>
							<view class="picker-weekday">一</view>
							<view class="picker-weekday">二</view>
							<view class="picker-weekday">三</view>
							<view class="picker-weekday">四</view>
							<view class="picker-weekday">五</view>
							<view class="picker-weekday">六</view>
						</view>
						<view class="picker-con">
							
							<view class="picker-day" v-for="(pick,index) in picker" :key="index" 
								:class="{'noMonthBg':pick.isBg,'checked':pick.isCheck,'inTime':pick.isBl,'onDaye':pick.showday}"
							@click="checkDate(pick.year,pick.month,pick.dateNum,pick)"><view class="picker-text">{{pick.dateNum}}</view></view>
						</view>
					</view>
					<!-- <view class="confim" @click="confimDate">确定</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				year: '',
                month: '',
                startEnv: '', //开始日期
                endEnv: '',  //结束日期
                today: '',
                picker: []
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
				this.$emit("cancel",'222');
			},
			qcScan(bool){
				
				this.$emit("ok",'111');
			},
			createCalendar (year, month) {
                this.picker = []
                let picks = []
                let currentMonth = ''
                if(new Date().getFullYear() == year && new Date().getMonth() + 1 == month) {
                    currentMonth = true
                } else {
                    currentMonth = false
                }
                let monthStartDate = this.getFirstDay(year, month) //每个月的第一天

                var lastMonthRestDay = new Date(year, month - 1, 0).getDate(); //获取上一月的最后一天日期
                //求上个月剩余多少天显示在本月
                for (var i = 0; i < monthStartDate; i++) {
                    picks.push({
                        dateNum: lastMonthRestDay,
                        outfocus: true,
						isBg:true,//是否是当月
						month:month-1 == 0 ? 12 : month-1,
						year:month-1 == 0 ? year-1 : year,
						isCheck:false,
                    });
                    lastMonthRestDay--
                }
                picks = picks.reverse();
                let indexMoth = this.getMonthLen(year, month)
                //本月天数
                for (var i = 1; i <= indexMoth; i++) {
                    let showday = ''
                    if (currentMonth) {
                        if (this.today === i) {
                            showday = true;
                        } else {
                            showday = false;
                        }
                    }
					picks.push({
					    dateNum: i,
					    outfocus: true,
					    showday: showday,
						isBg:false,//是否是当月
						month:month,
						year:year,
						isCheck:false,
					});
                }
                let nextMonLen = 42 - picks.length
                //下月天数显示在本月
                for (var i = 1; i <= nextMonLen; i++) {
                    picks.push({
                        dateNum: i,
                        outfocus: true,
						isBg:true,//是否是当月
						month:month+1 == 13 ? 1 : month+1,
						year:month+1 == 13 ? year+1 : year,
						isCheck:false,
                    })
                }
				if(this.startEnv || this.endEnv){
					let startDate = this.startEnv ? this.getDate(this.startEnv) : null;
					let endDate = this.endEnv ? this.getDate(this.endEnv) : null;
					picks.map((item) => {
						let item_date = item.year+ '/' + (item.month < 10 ? '0'+item.month : item.month) + '/' + (item.dateNum < 10 ? '0'+item.dateNum : item.dateNum);
						if(startDate && item.year == startDate.year && item.month == startDate.month && item.dateNum == startDate.dateNum){
							item.isCheck = true;
						}
						if(endDate && item.year == endDate.year && item.month == endDate.month && item.dateNum == endDate.dateNum){
							item.isCheck = true;
						}
						if(Date.parse(new Date(item_date)) > Date.parse(new Date(this.startEnv)) && Date.parse(new Date(item_date)) < Date.parse(new Date(this.endEnv))){
							item['isBl'] = true;
						}else{
							item['isBl'] = false;
						}
					})
				}
				
                this.picker = picks
            },
			preYear(){
				this.year -= 1;
				this.createCalendar(this.year, this.month);
			},
			nextYear(){
				this.year += 1;
				this.createCalendar(this.year, this.month);
			},
            preMon () {//上一月
                this.month -= 1;
                if (this.month < 1) {
                    this.year -= 1;
                    this.month = 12;
                }
                this.createCalendar(this.year, this.month);
            },
            nextMon () {//下一月
                this.month += 1;
                if (this.month > 12) {
                    this.year = parseInt(this.year) + 1;
                    this.month = 1;
                }
                this.createCalendar(this.year, this.month);
            },
			checkDate(dateYear,dateMonth,dateday,obj){
				// console.log(dateYear+'====='+(dateMonth < 10 ? '0'+dateMonth : dateMonth)+'====='+(dateday < 10 ? '0'+dateday : dateday));
				let check_date = dateYear+ '/' + (dateMonth < 10 ? '0'+dateMonth : dateMonth) + '/' + (dateday < 10 ? '0'+dateday : dateday);
				if(this.startEnv && this.endEnv){
					this.startEnv = '';
					this.endEnv = '';
					this.picker.map(item => {item.isCheck = false;item.isBl = false;});
				}
				if((!this.startEnv || this.startEnv == '') && (!this.endEnv || this.endEnv == '')){
					this.startEnv = check_date;
					obj.isCheck = true;
					return false
				}
				if(this.startEnv){
					this.endEnv = check_date;
					obj.isCheck = true;
				}
				if(this.startEnv && this.endEnv){
					this.dateCompare(this.startEnv,this.endEnv);
				}	
			},
			dateCompare(date1,date2){
				let dateStr1 = Date.parse(new Date(date1));
				let dateStr2 = Date.parse(new Date(date2));
				if(dateStr1 < dateStr2){
					this.startEnv = date1;
					this.endEnv = date2;
				}else{
					this.startEnv = date2;
					this.endEnv = date1;
				}
				this.picker.map(item => {
					let item_date = item.year+ '/' + (item.month < 10 ? '0'+item.month : item.month) + '/' + (item.dateNum < 10 ? '0'+item.dateNum : item.dateNum);
					if(Date.parse(new Date(item_date)) > Date.parse(new Date(this.startEnv)) && Date.parse(new Date(item_date)) < Date.parse(new Date(this.endEnv))){
						item['isBl'] = true;
					}else{
						item['isBl'] = false;
					}
				});
			},
			getDate(dateStr){//把选中日期切换回year month day
				let dateArr = dateStr.split("/");
				let year = parseInt(dateArr[0]);
				let month = parseInt(dateArr[1]);
				let day = parseInt(dateArr[2]);
				let obj = {
					year:year,
					month:month,
					dateNum:day
				}
				return obj;
			},
			showDateBg(){
				
			},
            //获得每个月的天数
            getMonthLen: function (year, month) {
                let nextMonth = new Date(year, month, 1);
                nextMonth.setHours(nextMonth.getHours() - 1);
                return nextMonth.getDate();
            },
            //获得每个月第一天星期几   0：星期日，1：星期一
            getFirstDay: function (year, month) {
                let firstDay = new Date(year, month - 1, 1);
                return firstDay.getDay();
            },
//             confimDate () {
//                 this.$emit('showTimePicker')
//                 this.$emit('confirm', this.startEnv, this.endEnv)
//             },
            hideDatePicker () {
                this.$emit('hideDatePicker')
            }
		},
		mounted() {
			let date = new Date()
			this.year = date.getFullYear()
			this.month = date.getMonth() + 1
			this.today = date.getDate()
			this.createCalendar(this.year, this.month)
		}
	}
</script>

<style lang="scss">
	.pull-date{
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
		.pull-date-cnt {
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  width: 100%;
		  transition: all 0.3s ease;
		  transform: translateY(100%);
		  z-index: 3000;
		}
		.pull-date-cnt.show {
		  transform: translateY(0);
		}

		.pull-date-view {
		  width: 100%;
		  padding:30upx 0;
		  overflow: hidden;
		  background: #fff;
		  z-index: 666;
		  .picker-box-c{
			  .picker-header{
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-pack: justify;
				-ms-flex-pack: justify;
				justify-content: space-between;
				padding: 0 20px;
			  }
			  .picker-content{
				  .picker-week{
					::after{
						content:"";
						display:block;
						clear:both;
					}
					.picker-weekday{
						float:left;
						width:percentage(100/7/100);
						text-align: center;
						line-height: 2;
					}
				  }
				  .picker-con{
					::after{
						content:"";
						display:block;
						clear:both;
					}
					.picker-day{
						float:left;
						width:percentage(100/7/100);
						text-align: center;
						line-height: 2;
						.picker-text{
							// margin:10%;
						}
					}
					
					.noMonthBg{
						// background: #e2e2e2;
						color:#e2e2e2;
					}
					.checked{
						.picker-text{
							background: #009788;
							color:#fff;
						}
						
					}
					.inTime{
						background:#ccc;
					}

				  }
			  }
		  }
		}
		
		// .bottom-btn{
		// 	margin: 0 30upx;
		// 	text-align: center;
		// 	background: #fff;
		// 	padding: 20upx 0;
		// 	border-radius: 10upx;
		// }
		// .bottom-btn.scan{
		// 	border-bottom:1px solid #ccc;
		// 	border-radius:10upx 10upx 0 0;
		// }
		// .bottom-btn.floor{
		// 	margin-bottom:30upx;
		// 	border-radius: 0 0 10upx 10upx;
		// }
	}
</style>
