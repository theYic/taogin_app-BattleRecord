import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { host } from 'lib/config';
import { ResponseData } from 'lib/IResponse';
@Injectable()
export class ApiService {
	constructor(private http: Http) { }
	/**
	 * api路徑
	 */
	private shishi = host.gateway;
	/**
	 * 是否顯示login頁面 ，default value=true
	 */
	private showLogin: boolean = true;
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
	 * 銷毀使用者資料
	 */
	private destroyUserData() {
		sessionStorage.clear();
		console.log('destory user data');
	}

	/**
	*	設定 showLogin 值
	*/
	setShowLogin(_showLogin: boolean): void {
		this.showLogin = _showLogin;
	}
	/**
	 * api 
	 * @param _code gateway編號
	 * @param _data 參數
	 */
	postServer(_code: number, _data?: any):Observable<ResponseData> {
		let endpoint = this.shishi + _code;
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
		let options = new RequestOptions({ headers: headers });
		let body = this.formatData({
			cmd: JSON.stringify({
				cmd: _code,
				data: _data 
			})
		});
		return this.http
		.post(endpoint, body, options)
		.map((res: Response) => {
			let body: ResponseData = eval('(' + res["_body"] + ')');
			// if (body.msg == 'logout'&&body.status) {
			// 	alert(body.msg);
			// 	this.destroyUserData();//logout
			// 	this.goPage(['main']);
			// 	this.setShowLogin(true);
			// }
			return body || {};
		})
		.catch( (error: any) => Observable.throw(error.json().error || 'Server error') );
	}
	/**
	 * 測試用api function
	 * @param _code gateway編號
	 * @param _data 參數
	 */
	getFakeData(_code: number, _data?: any):Observable<ResponseData> {
		return this.http
		.get('./file/fake/' + _code + '.json')
		.map( res => {
			let test:ResponseData ={'status':true,'msg':"",'data':res.json()};
			if (test.msg == 'logout'&&test.status) {
				alert(test.msg);
				this.destroyUserData();//logout
				this.setShowLogin(true);
			}
			return test || { };
		})
		.catch( (error: any) => Observable.throw(error.json().error || 'Server error') );
	}

}