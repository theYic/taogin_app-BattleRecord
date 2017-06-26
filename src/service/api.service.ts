import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { configData } from 'lib/config';
import { ResponseData } from 'lib/IResponse';
@Injectable()
export class ApiService {
	/*
	錯誤代碼列表
	公用obj
	 */
	public errdata :any ={};
	public langPackage : any = {};
	public postData : any;
	constructor(private http: Http) {
		//只會回傳單一參數
		this.postData = location.search.slice(1).split('=');
		this.postData = ['battleRecord'];
	}
	/**
	 * api路徑
	 */
	private APIpath = configData.gateway;
	/**
	 *轉序列化，去除多餘符號
	 * @param data 序列化值
	 */
	private formatData(_data: any) {
		let returnData = '';
		let count = 0;
		for (let i in _data) {
			if (count == 0) {
				returnData += i + '=' + _data[i];
			} else {
				returnData += '&' + i + '=' + _data[i];
			}
			count = count + 1;
		}
		return returnData;
	}
	/**
	 * api 
	 * @param _code gateway編號
	 * @param _data 參數
	 */
	postServer(_code: number, _data?: any): Observable<ResponseData> {
		let endpoint = this.APIpath+'?'+_code;//路徑
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
		let options = new RequestOptions({ headers: headers });//協定
		let body = this.formatData({
			cmd: JSON.stringify({
				cmd: _code,
				parame: _data //parame
			})//傳值
		});
		return this.http
			.post(endpoint, body, options)
			.retry(2)
			.timeout(30000)
			.map((res: Response) => {
				let body: ResponseData = eval('(' + res["_body"] + ')');
				body['cmd'] = _code;
				if (!body['err']) { this.errReturn(_code,body['err_msg']); } //如果錯誤true
				return body || {};
			})
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}
	// /**
	//  * 測試用api function
	//  * @param _code gateway編號
	//  * @param _data 參數
	//  */
	// getFakeData(_code: number, _data?: any): Observable<ResponseData> {
	// 	return this.http
	// 		.get('./file/fake/' + _code + '.json')
	// 		.map(res => {
	// 			let test: ResponseData = { 'err': true, 'err_msg': 0, 'ret': res.json() };
	// 			if (test['err_msg'] == 700 && !test['err']) {
	// 				alert(test['err_msg']);
	// 				sessionStorage.removeItem('uid');
    //         		sessionStorage.removeItem('username');
	// 			}
	// 			return test || {};
	// 		})
	// 		.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	// }
	/**
	 * 處理錯誤對照表
	 * @param _code 代碼
	 */
	errReturn(_code: number,_err_msg:any) {
		if(this.errdata[_err_msg] == null) {
			alert(_err_msg);
			return;
		}
		// console.log(_code,_err_msg,this.errdata[_err_msg]);
		//跑馬燈 資料為空 直接return
		if(_code == 810){
			return;
		}
		alert(this.errdata[_err_msg]);
		//       700驗證過期 &&   990 登出
		if (_err_msg == 700 && _code != 990 ) {
		
			sessionStorage.removeItem('uid');
			sessionStorage.removeItem('username');
			return;
		}
		//     310 下注 || 130 賠率表
		if(_code == 310 || 130){
			return;
		}
		console.log('err:'+_code);
		console.log(this.errdata[_err_msg]);
	}
	// checkLang(){
	// 	if(sessionStorage.getItem("lang") == undefined){
	// 		if(location.search.indexOf("?") == -1){
	// 			try{
	// 				sessionStorage.setItem("lang",configData.lang);
	// 			}catch(e){
	// 				alert(1+"\n"+location.href + "?" + configData.lang);
	// 				document.location.href = location.href + "?" + configData.lang;
	// 				location.reload();
	// 				alert("AAAAAAAAAAAAAAAA");
	// 				// document.location.href = 'index.html?' + configData.lang;
	// 			}
	// 			alert("tototototo");
	// 		}else{
	// 			alert(2+"\n"+this.getUrlKey()[0]);
	// 			this.globals.setNowLang(this.getUrlKey()[0]) ;
	// 		}	
	// 	}else{
	// 		alert(3+"\n"+sessionStorage.getItem("lang"));
	// 		this.globals.setNowLang(sessionStorage.getItem("lang"));
	// 	}
	// }
	/**
	 * pipe 有個 getLangPipe 是給 html tag 用的
	 * 此function 是給ts 用的
	 */
	getLang(_value) : string{
        let langPackage = this.langPackage;
        if(langPackage == undefined || langPackage[_value] == undefined || sessionStorage.getItem("lang") == "en-us") {
            return _value;
        }
        return langPackage[_value];
    }
}