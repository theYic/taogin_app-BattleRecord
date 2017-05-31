import { Component, OnInit, OnDestroy} from '@angular/core';
import { ApiService } from 'service';
import { Observable, Subscription } from 'rxjs';
@Component({
    selector: 'header-toolbar',
    templateUrl: 'header.component.html'
})
/**
 * 主頁面上的 header
 */
export class HeaderComponent implements OnInit, OnDestroy {
    /**
     * 現在時間
     */
    public nowTime : string = "";
    /**
     * 當前語言 顯示的名稱
     */
    public selectLang : string = "";
    /**
     * 當前語言 顯示的 css 國旗
     */
    public selectLangClass = {};
    constructor(public api: ApiService) { }

    ngOnInit() {
        this.doReload();
        this.NowLang();
        this.nowTime = new Date().toString().slice(0,new Date().toString().indexOf("("));
        Observable.interval(1000).subscribe( () => this.nowTime = new Date().toString().slice(0,new Date().toString().indexOf("(")));
        // switch (this.selectLang) {
        //     case "English":
        //         this.nowTime = new Date().toString().replace("台北標準時間", "Beijing");
        //         Observable.interval(1000).subscribe( () => this.nowTime = new Date().toString().replace("台北標準時間", "Beijing") );
        //         break;
        //     case "简体中文":
        //         this.nowTime = new Date().toString().replace("台北標準時間", "北京标准时间");
        //         Observable.interval(1000).subscribe( () => this.nowTime = new Date().toString().replace("台北標準時間", "北京标准时间") );
        //         break;
        //     case "繁體中文":
        //         this.nowTime = new Date().toString().replace("台北標準時間", "北京標準時間");
        //         Observable.interval(1000).subscribe( () => this.nowTime = new Date().toString().replace("台北標準時間", "北京標準時間") );
        //         break;

        //     default:
        //         break;
        // }


    }
    /**
     * 判斷是否重新整理
     */
     doReload(){
        if(!sessionStorage.getItem('uid'))  return;
     }
    /**
     * 改變當前語言的值 存在 sessionStorage 內
     * @param _setlang
     */
    changeLanguage(_setlang : string){
        if(sessionStorage.getItem("lang")==_setlang){
            return;
        }
        sessionStorage.setItem("lang",_setlang);
        location.reload();
    }
    /**
     * 取得當前語言的 物件
     */
    NowLang(){
        switch(sessionStorage.getItem("lang")){
            case 'zh-tw' :
                this.selectLang = "繁體中文";
                this.selectLangClass = { lg_tw : true };
                break;
            case 'zh-cn' :
                this.selectLang = "简体中文";
                this.selectLangClass = { lg_cn : true };
                break;
            case 'en-us' :
                this.selectLang = "English";
                this.selectLangClass = { lg_en : true };
                break;
        }
    }

    ngOnDestroy(){
    }
}