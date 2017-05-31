import { Component, OnInit } from '@angular/core';
import { GlobalService, ApiService } from 'service';

@Component({
    selector: 'deposit-default',
    templateUrl: 'deposit-default.component.html'
})
export class DepositDefaultComponent implements OnInit {
    constructor(private globals: GlobalService, private api: ApiService) { }

    ngOnInit() { }

    /**
     * 透過 gateway 960 取得會員資料
     * @param _uid
     */
    getBankData(_uid:string):void{
        this.api.getFakeData(910, { uid: sessionStorage.getItem('uid') }).subscribe(res => {
            let data = res.data;
        });
    }

    Submit():void{
        
    }
}