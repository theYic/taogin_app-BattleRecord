import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { host } from 'lib/config';
import { Router } from '@angular/router';

@Injectable()
export class GlobalService {

	constructor(private router: Router) { }

	/**
	 * 是否顯示login頁面 ，default value=true
	 */
	private showLogin: boolean = true;
	/**
	 * 下注完成來源
	 */
	private betSource = new Subject<Object>();
	/**
	 * bettingSource 可觀察串流
	 */
	bet$ = this.betSource.asObservable();




	/**
	 * 銷毀使用者資料
	 */
	private destroyUserData() {
		sessionStorage.clear();
		//host.username = '';
		//host.password = '';
		console.log('destory user data');
	}
    /**
	 * 跳轉頁面
	 * <參數>args(array)[0:頁面, 1:彩種(shishi,fenghuang會用到)]
	 */
	goPage(args: string[]) {
		this.router.navigate(args);
	}
	/**
	*	設定 showLogin 值
	*/
	setShowLogin(_showLogin: boolean): void {
		this.showLogin = _showLogin;
	}
	/**
	*取得 showLogin 值
  	*/
	getShowLogin(): boolean {
		return this.showLogin;
	}

	/**
	 * 確認api 回傳 做導向 Router
	 * @param status 狀態
	 * @param msg 錯誤訊息
	 */
	status(_status: boolean = true, _msg: string) {
		if (_status) {

		} else {
			
			if (_msg == 'logout') {
				alert(_msg);
				this.destroyUserData();//logout
				this.goPage(['main']);
				this.setShowLogin(true);
			}
		}
	}
	/**
	 * 設定餘額
	 */
	betplusData(data: Object) {
		this.betSource.next(data);
	}
}