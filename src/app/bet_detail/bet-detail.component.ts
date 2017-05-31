import { Component, OnInit } from '@angular/core';
import { ApiService } from 'service';
import { host } from 'lib/config';
@Component({
    selector: 'bet-detail-page',
    templateUrl: 'bet-detail.component.html'
})
//下注明細
export class BetDetailComponent implements OnInit {
    constructor(private api: ApiService) { }

    /**
     * 650回傳參數
     */
    private data: Array<any>;
    /**
     * 總下注金額
     */
    private allGold: number = 0;
    /**
     * 總獲利金額
     */
    private estimateGold: number = 0;


    /**
     * 處理總金額
     * @param _data 資料陣列
     */
    calculationGold(_data: Array<any>) {
        for (let value of _data) {
            this.allGold += value.gold;
            this.estimateGold += value.gold * (value.profit / 100) + value.water;
        }
    }

    /**
     * 下注狀況 650 api
     * @param _data 資料參數
     */
    getDetailsData(_data: any) {
        this.api.getFakeData(650, _data).subscribe(res => {
            this.data = res.data;
            this.calculationGold(this.data);
        });
    }

    /**
     * 執行
     */
    ngOnInit() {
        /**
         * {
                uid: number  //使用者憑證
                lang: string  //語系
            }
        */
        let parameter = { uid: sessionStorage.getItem('uid'), lang: host.lan };
        this.getDetailsData(parameter);
    }

}