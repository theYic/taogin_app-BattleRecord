import { Component, OnInit } from '@angular/core';
import { GlobalService, ApiService } from 'service';
import { Observable } from 'rxjs';
import { host } from 'lib/config';
@Component({
    selector: 'header-toolbar',
    templateUrl: 'header.component.html'
})
/**
 * 主頁面上的 header
 */
export class HeaderComponent implements OnInit {
    private nowTime:string = "";
    private marqueeData: String = "";
    constructor(private globals: GlobalService, private api: ApiService) { }

    ngOnInit() {
        this.doReload();
        this.nowTime = new Date().toString();
        Observable.create(function(observer) {
            setInterval(() => {
                observer.next(new Date());
            }, 1000)
        })
        .subscribe((value) =>{
         this.nowTime=value;
        //  console.log(this.nowTime);
        });
    //      new Observable(observer => {
    //       setInterval(() => {
    //             observer.next(new Date());
    //         }, 1000)
    //   }).subscribe((value) =>{
    //     //  this.nowTime=value;
    //      console.log(value);
    //     });


    }
     doReload(){
        if(!sessionStorage.getItem('uid')) {
            return;
        }
        this.globals.setShowLogin(false);
        this.getMarquee();
     }
     /**
      * 取得跑馬燈顯示的資料
      */
     getMarquee():void{
        this.api.getFakeData(810, { uid:sessionStorage.getItem('uid') ,lang: host.lan }).subscribe(res => {
            this.globals.status(res.status, res.msg);
            let data = res.data;
            res.data.map((item) => {
                this.marqueeData += item.content+"\t";
            });

        });
     }
    changePage(name: string) {
	    this.globals.goPage([name]);
	}
}