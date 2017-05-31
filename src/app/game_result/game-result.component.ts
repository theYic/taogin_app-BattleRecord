import { Component, OnInit } from '@angular/core';
import { ApiService } from 'service';
import { host } from 'lib/config';

@Component({
    selector: 'game-result-page',
    templateUrl: 'game-result.component.html'
})
//賽事結果
export class GameResultComponent implements OnInit {
    constructor(private api: ApiService) { }
    /**
     * 資料比數
     */
    private dataLength: number;
    /**
     * 680回傳參數
     */
    private data: Array<any>;
    /**
     * 現在時間 yyyy-mm-dd toISOString(ie9)
     */
    private ntime:any=new Date().toISOString().substring(0, 10);

    /**
     * 收尋日期
     * @param _time 時間 格式yyyy-MM-dd
     */
    search(_time:string){
        console.log(_time);
    }
    /**
     * 賽事结果 680 api
     * @param _date 需求
     */
    getResultData(_data:any){
        this.api.getFakeData(680, _data).subscribe(res => {
            this.data = res.data;
            this.dataLength=this.data.length;

        });
    }


    /**
     * 一骰進入執行 預設今天
     */
    ngOnInit() { 
        console.log(this.ntime);
        /**
         * {
            uid:  number   //使用者憑證
            date:  string  //日期
            gtype:  string  //球種
            lang: string  //語系
            }
         */
        let parameter= { uid: sessionStorage.getItem('uid'), lang: host.lan ,  date:  this.ntime,gtype:  'FT' };
        this.getResultData(parameter);
    }
}