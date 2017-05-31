//報表週期
export function reportPeriod () {
	let date = new Date();
	//今天
	let todayString     = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('/');
	//明天
	date.setDate(date.getDate() + 1);
	let tomorrowString  = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('/');
	//昨天
	date.setDate(date.getDate() - 2);
	let yesterdayString = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('/');
	//本周首日
	date = new Date();
	date.setDate(date.getDate() - date.getDay());
	let thisWDay1String = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('/');
	//本周末日
	date = new Date();
	date.setDate(date.getDate() - date.getDay() + 6);
	let thisWDay6String = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].join('/');
	let _LWDay1 = convertDate((new Date(thisWDay1String).getTime()) - 7 * 24 * 60 * 60 * 1000); //上周第一天
	let _LWDay6 = convertDate((new Date(thisWDay6String).getTime()) - 7 * 24 * 60 * 60 * 1000); //上周最后天
	return {
		today    : todayString,
		yesterday: yesterdayString,
		tomorrow : tomorrowString,
		thisWeek1: thisWDay1String,
		thisWeek6: thisWDay6String,
		lastWeek1: _LWDay1,
		lastWeek6: _LWDay6
	};
}
//轉換日期
export function convertDate(_input): string {
	let d = new Date(_input);
	return [ d.getFullYear(), d.getMonth() + 1, d.getDate() ].join('/');
}
export function gettime(){
	let now = new Date(); 									//當前日期  
	let nowDayOfWeek = now.getDay(); 						//今天本周的第幾天 
	let nowDay = now.getDate(); 							//當前日   
	let nowMonth = now.getMonth(); 							//當前月   
	let nowYear = now.getFullYear(); 							//當前年
	nowYear += (nowYear < 2000) ? 1900 : 0; // 
    let formatDate =function (date) {   
        let myyear = date.getFullYear();   
        let mymonth = date.getMonth() + 1;   
        let myweekday = date.getDate();   
        if (mymonth < 10) {   
            mymonth = "0" + mymonth;   
        }   
        if (myweekday < 10) {   
            myweekday = "0" + myweekday;   
        }   
        return (myyear + "-" + mymonth + "-" + myweekday);   
    }
    //獲得本周的開端日期
    let weekStartDate = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek+1));   


    //獲得本周的停止日期 
    let weekEndDate = formatDate(new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek+1)));   

    //獲得上周的開端日期
    let LestweekStartDate =formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7+1)) ;   
  
    //獲得上周的停止日期 
    let LestweekEndDate =formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1+1)) ;   

    return{
        thisweekStart:weekStartDate,
        thisweekEnd:weekEndDate,
        lestweekStart:LestweekStartDate,
        lestweekEndDate:LestweekEndDate
    };
  
}