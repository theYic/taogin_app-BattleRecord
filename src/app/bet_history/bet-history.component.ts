import { Component, OnInit } from '@angular/core';
import { ApiService } from 'service';
import { host } from 'lib/config';
import { gettime } from 'lib/functions';
@Component({
    selector: 'bet-history-page',
    templateUrl: 'bet-history.component.html'
})
//历史帐务
export class BetHistoryComponent implements OnInit {
    constructor(private api: ApiService) { }
    /**
     * 單周資料
     */

    private data: Array<any>;
    /**
     * 上週資料
     */
    private lestData: Array<any>;
    /**
     * 總下注金額
     */
    private allGold: number = 0;
    /**
     * 实货量(不含退水)
     */
    private allWin_nw: number = 0;
    /**
     * 總投资结果(含退水)
     */
    private allWin: number = 0;
    /**
     * 上周總下注金額
     */
    private lestallGold: number = 0;
    /**
     * 上周实货量(不含退水)
     */
    private lestallWin_nw: number = 0;
    /**
     * 上周總投资结果(含退水)
     */

    private lestallWin: number = 0;
    /**
     * functions/gettime 處理 回傳
     *  thisweekStart:本周開始
        thisweekEnd:本周結束
        lestweekStart:上周開始
        lestweekEndDate:上周結束
     */
    private timefn: any = gettime();

    /**
     * 處理總金額
     * @param _data 資料陣列
     * @param _status: 1-單周查詢 2-上週資料
     */
    calculationGold(_data: Array<any>, _status: number) {

        if (_status == 1) {
            this.allGold = 0; this.allWin_nw = 0; this.allWin = 0;
            for (let value in _data) {
                this.allGold += _data[value].gold;
                this.allWin_nw += _data[value].win_nw;
                this.allWin += _data[value].win;
            }
        } else {
            this.lestallGold = 0; this.lestallWin_nw = 0; this.lestallWin = 0;
            for (let value in _data) {
                this.lestallGold += _data[value].gold;
                this.lestallWin_nw += _data[value].win_nw;
                this.lestallWin += _data[value].win;
            }
        }

    }
    private bb: any;
    ccc(_c) {
        console.log(_c);
        if (_c == this.bb) {
            this.bb = '';
            return;
        }
        this.bb = _c;

    }
    /**
     * 點選查詢
     * @param _time1 開始時間
     * @param _time2 結束時間
     */
    search(_time1: string, _time2: string) {
        this.getAccountData(_time1, _time2, 1);
        this.lestData = [];
    }
    /**
     * 雙周查詢
     */
    biweekly() {
        this.getAccountData(this.timefn.thisweekStart, this.timefn.thisweekEnd, 1);
        this.getAccountData(this.timefn.lestweekStart, this.timefn.lestweekEndDate, 2);
    }
    /**
     * 撞護歷史(大綱) 610api
     * @param _stime 開始時間
     * @param _etime 結束時間
     * @param _status 狀態 1單周 2上週
     */
    getAccountData(_stime: string, _etime: string, _status: number) {
        let parameter = {
            uid: sessionStorage.getItem('uid'), lang: host.lan, gtype: 'FT',
            sdate: _stime, edate: _etime
        };
        this.api.getFakeData(610, parameter).subscribe(res => {
            if (_status == 1) {
                this.data = res.data;
                this.calculationGold(res.data, _status);
            } else {
                this.lestData = res.data;
                this.calculationGold(res.data, _status);
            }

        });

    }
    /**
     * 一進來，執行本周上周資料api
     */
    ngOnInit() {
        this.getAccountData(this.timefn.thisweekStart, this.timefn.thisweekEnd, 1);
        this.getAccountData(this.timefn.lestweekStart, this.timefn.lestweekEndDate, 2);
        console.log(this.timefn, this.timefn.thisweekStart);

    }
}