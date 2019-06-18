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
							<view class="picker-day" v-for="pick in picker" 
								:class="{'outfocus': pick.outfocus, 
										'today': pick.showday, 
										'start': showStartEnvfun(pick.dateNum,pick.outfocus), 
										'end': showEndEnvfun(pick.dateNum,pick.outfocus), 
										'black': showBlack(pick.dateNum,pick.outfocus), 
										'half': showHalffun(pick.dateNum,pick.outfocus)}" 
								@click="checkDay(pick.dateNum,pick.outfocus)">
								{{pick.dateNum}}
							</view>
						</view>
					</view>
					<!-- <view class="confim" @click="confimDate">确定</view> -->
				</view>
				<!-- <view class="bottom-btn scan" @tap="qcScan(true)">拍摄</view>
				<view class="bottom-btn scan floor" @tap="qcScan(false)">从手机相册选择</view>
				<view class="bottom-btn" @tap="hide">取消</view> -->
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
                let monthStartDate = this.getFirstDay(year, month)

                var lastMonthRestDay = new Date(year, month - 1, 0).getDate()
                //求上个月剩余多少天显示在本月
                for (var i = 0; i < monthStartDate; i++) {
                    picks.push({
                        dateNum: lastMonthRestDay,
                        // outfocus: false
                        outfocus: true
                    });
                    lastMonthRestDay--
                }

                picks = picks.reverse()

                let indexMoth = this.getMonthLen(year, month)
                //本月天数
                for (var i = 1; i <= indexMoth; i++) {
                    let showday = ''
                    if (currentMonth) {
                        if (this.today === i) {
							console.log(this.today);
                            showday = true;
                        } else {
                            showday = false;
                        }

                    }
                    if (currentMonth && this.today > i) {
                        picks.push({
                            dateNum: i,
                            outfocus: true,
                            showday: showday
                        });
                    } else {
                        picks.push({
                            dateNum: i,
                            outfocus: false,
                            showday: showday
                        });
                    }
                }
                let nextMonLen = 42 - picks.length
                //下月天数显示在本月
                for (var i = 1; i <= nextMonLen; i++) {
                    picks.push({
                        dateNum: i,
                        // outfocus: false
                        outfocus: true
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
                // if (this.year == new Date().getFullYear() && this.month <= new Date().getMonth() + 1) {
                //     return;
                // }
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
            checkDay (dateNum, outfocus) {
				console.log(dateNum);
				console.log(outfocus);
                // if(!outfocus) {
                //     let check_day = this.year + '-' + this.month + '-' + dateNum;
                //     if (this.dateCompare(this.endEnv, check_day) == 0) { //开始后
                //         this.endEnv = check_day;
                //         this.showEndEnvfun(dateNum);
                //     } else if (this.dateCompare(this.endEnv, check_day) == 3) {  //点结束当天
                //         this.startEnv = check_day;
                //         this.showHalffun(dateNum)
                //     } else if (this.dateCompare(this.startEnv, check_day) == 3) {  //点开始当天
                //         this.endEnv = check_day;
                //         this.showHalffun(dateNum);
                //     } else if (this.dateCompare(this.startEnv, check_day) == 1) {
                //         this.startEnv = check_day;
                //         this.showStartEnvfun(dateNum);
                //     } else if (this.dateCompare(this.startEnv, check_day) == 0 && this.dateCompare(this.endEnv, check_day) == 1) {
                //         var disStartEnvLen = this.getDatePeriod(this.startEnv, check_day) - 1;
                //         var disSEndEnvLen = this.getDatePeriod(this.endEnv, check_day) - 1;
                //         if (disStartEnvLen > disSEndEnvLen) {
                //             this.endEnv = check_day;
                //             this.showEndEnvfun(dateNum);
                //         } else {
                //             this.startEnv = check_day;
                //             this.showStartEnvfun(dateNum);
                //         }
                //     }
                // }
            },
//             //两个日期之间间隔多少天
//             getDatePeriod: function (sDate1, sDate2) {
//                 var aDate, oDate1, oDate2, iDays;
// 
//                 aDate = sDate1.split("-");
//                 oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为12-18-2016格式
//                 aDate = sDate2.split("-");
//                 oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
// 
//                 iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
//                 return iDays;
//             },
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
//             //获得每个月的天数
//             getMonthLen: function (year, month) {
//                 let nextMonth = new Date(year, month, 1);
//                 nextMonth.setHours(nextMonth.getHours() - 1);
//                 return nextMonth.getDate();
//             },
//             //计算距离今天的后两天日期
//             getTwoDay: function (date) {
//                 let result = new Date((new Date(date)).getTime() + 2 * 24 * 60 * 60 * 1000);
//                 return result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + result.getDate();
//             },
//             //计算距离今天的后六天日期
//             getSixDay: function (date) {
//                 let result = new Date((new Date(date)).getTime() + 6 * 24 * 60 * 60 * 1000);
//                 return result.getFullYear() + "-" + (result.getMonth() + 1) + "-" + result.getDate();
//             },
//             confimDate () {
//                 this.$emit('showTimePicker')
//                 this.$emit('confirm', this.startEnv, this.endEnv)
//             },
//             //比较两日期的大小
            dateCompare (date1, date2) {
                var str1 = [];
                var str2 = [];
                str1 = date1.split('-');
                str2 = date2.split('-');
                if (parseInt(str1[0]) == parseInt(str2[0]) && parseInt(str1[1]) == parseInt(str2[1]) && parseInt(str1[2]) == parseInt(str2[2])) {
                    return 3;
                } else {
                    if (parseInt(str1[0]) > parseInt(str2[0])) {
                        return 1;
                    } else if (parseInt(str1[0]) < parseInt(str2[0])) {
                        return 0;
                    } else {
                    }
                    if (parseInt(str1[1]) > parseInt(str2[1])) {
                        return 1;
                    } else if (parseInt(str1[1]) < parseInt(str2[1])) {
                        return 0;
                    } else {
                    }
                    if (parseInt(str1[2]) > parseInt(str2[2])) {
                        return 1;
                    } else if (parseInt(str1[2]) < parseInt(str2[2])) {
                        return 0;
                    } else {
                    }
                    return 0;
                }
            },
            showStartEnvfun (dateNum, outfocus) {
				console.log('showStartEnvfun============'+dateNum+'===='+outfocus);
                if (!outfocus) {
                    if (this.startEnv == this.year + '-' + this.month + '-' + dateNum) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            showEndEnvfun (dateNum, outfocus) {
				console.log('showEndEnvfun============'+dateNum+'=========='+outfocus);
                if (!outfocus) {
                    if (this.endEnv == this.year + '-' + this.month + '-' + dateNum) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            showBlack (dateNum, outfocus) {//显示区间的颜色
                if (!outfocus) {
                    if (this.dateCompare(this.startEnv, this.year + '-' + this.month + '-' + dateNum) == 0 &&
                        this.dateCompare(this.year + '-' + this.month + '-' + dateNum, this.endEnv) == 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            showHalffun (dateNum, outfocus) {
                if (!outfocus) {
                    if (this.startEnv == this.year + '-' + this.month + '-' + dateNum && this.endEnv == this.year + '-' + this.month + '-' + dateNum) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            hideDatePicker () {
                this.$emit('hideDatePicker')
            }
		},
		mounted() {
			let date = new Date()
			this.year = date.getFullYear()
			this.month = date.getMonth() + 1
			this.today = date.getDate()
			// this.startEnv = this.getTwoDay(this.year + '-' + this.month + '-' + this.today)
			// this.endEnv = this.getSixDay(this.year + '-' + this.month + '-' + this.today)
			
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
					}
					.today {
						
					}
					.start {
						background: #009788;
						color:#fff;
					}
					.black {
						background: #e2e2e2;
					}
					.end {
						background: #009788;
						color:#fff;
					}
					.half {
						background: #009788;
						color:#fff;
					}
					.outfocus{
						color:#e3e3e3;
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
