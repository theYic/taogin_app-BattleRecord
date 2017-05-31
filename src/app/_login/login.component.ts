import { Component, OnInit } from '@angular/core';
import { GlobalService, ApiService } from 'service';
@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
/**
 * 主頁header 呼叫  登入 登出 的form
 */
export class LoginComponent implements OnInit {
    /**
	 * 帳號
	 */
    private username: string = '';
	/**
	 * 密碼
	 */
    private password: string = '';
    /**
     *  isRemember: html checkbox
     */
    private isRemember: boolean = false;
    /**
     *帳戶餘額
     */
    private surplus: string = "";


    constructor(private globals: GlobalService, private api: ApiService) { }

    ngOnInit() {
        this.doRememberUserData();
        /**
         * showLogin = false 代表是已登入 只是刷新頁面
         */
        if (!this.globals.getShowLogin()) {
            // this.username = sessionStorage.getItem('username');
            // this.password = sessionStorage.getItem('password');
            this.login();
        }
        //console.timeEnd('loadtime');
    }
    /**
     * 登入 :
     *       1.驗證帳號密碼
     *       2.存入Storage
     *       3.取得會員資料
     */
    login() {
        // if (!this.username || !this.password) {
        //     alert('请输入完整的帐号密码');
        //     return;
        // }
        this.api.getFakeData(999, { un: this.username, pw: this.password }).subscribe(res => {
            let data = res.data;
            if (data[0] == "-1" || parseInt(data.uid) < 1) {
                alert('请输入完整的帐号密码');
                return;
            }
            sessionStorage.setItem('uid', data.uid);
            this.globals.setShowLogin(false);
            // sessionStorage.setItem('username', this.username);
            // sessionStorage.setItem('password', this.password);
            if (this.isRemember) {
                localStorage.setItem('username', this.username);
                localStorage.setItem('password', this.password);
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
            this.changePage('gametable');
            this.getMemberData(data.uid);

            this.changePage('controlmoney');
        });

    }
    /**
     * 透過 gateway 960 取得會員資料
     * @param _uid
     */
    getMemberData(_uid:string):void{
        this.api.getFakeData(960, { uid: _uid }).subscribe(res => {
            let data = res.data;
            this.surplus = data.surplus;
        });
    }
    /**
     * 判斷 之前是否有記住帳密
     */
    doRememberUserData():void {
        let remUser = localStorage.getItem('username');
        let remPw = localStorage.getItem('password');
        if (remUser && remPw) {
            this.isRemember = true;
            this.username = remUser;
            this.password = remPw;
        }
    }
    /**
     *  登出
     */
    logout() {
        if (!this.isRemember) {
            this.username = "";
            this.password = "";
        }
        this.globals.setShowLogin(true);
        this.changePage('main');
        sessionStorage.removeItem('uid');
    }

    changePage(name: string) {
	    this.globals.goPage([name]);
	}
}