import { Component, OnInit } from '@angular/core';
import { ApiService, GlobalService } from 'service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'selector',
    templateUrl: 'game-table.component.html'
})
export class GameTableComponent implements OnInit {
    constructor(private api: ApiService, private global: GlobalService) { }
    /**使用者憑證 */
    private uid :number;
    /**球種 */
    private gtype :string = 'FT';
    /**賽事列表切換按鈕 */
    private switchButton: any;
    /**賠率表(賽事) 訂閱 */
    private gameInfoSub :Subscription;
    /**更新倒數計時器 */
    private updateCounter :any = null;
    /**設定更新倒數時間 */
    private updateTime :number = 60;
    /**賽事列表 (單球種) */
    gamelist: any = [];
    /**賽事列表 (單球種)(日期) */
    gamelist_date: any = [];
    /**賽事列表 (單球種)(聯盟) */
    gamelist_lid: any = {};
    /**現在倒數時間 */
    updateTiming :number;
    /**賠率表(賽事) */
    gameInfo: any;
    /**被選到的賽事 */
    gmaeItem: any;

    ngOnInit() {
        this.getGameList();
    }

    /**
     * 取得賽事列表 (單球種) 120
     */
    getGameList() {
        let req = { uid: this.uid, gtype: this.gtype };
        //賽事列表訂閱
        this.api.getFakeData(120, req).subscribe((res) => {
            //檢查 gateway 狀態是否錯誤
            this.global.status(res.status, res.msg);
            //日期陣列(分類日期用)
            let datelist = [];
            //聯盟陣列(分類聯盟用)
            let leaguelist = [];
            //格式化資料時間戳、賽事列表日期、聯盟陣列置入
            this.gamelist = res.data.map((item) => {
                //格式化資料時間戳
                let gdate    = new Date(item.time);
                let _month   = ("0" + (gdate.getMonth() + 1)).slice(-2);
                let _date    = ("0" + gdate.getDate()).slice(-2);
                let _hours   = gdate.getHours();
                let _minutes = gdate.getMinutes();
                let _gdate = _month + '-' + _date;
                let _gtime = _hours + ':' + _minutes;
                //置入格式化後的時間到this.gamelist (template賽事列表使用)
                item._gdate = _gdate;
                item._gtime = _gtime;
                //賽事列表日期、聯盟陣列置入
                datelist.push(_gdate);
                leaguelist.push(item.lid);
                return item;
            })
            //移除日期陣列的重複
            this.gamelist_date = datelist.filter((item, index, arr) => {
                return arr.indexOf(item) === index;
            })
            //計算賽事列表聯盟次數，並置入
            leaguelist.map((item) => {
                if(typeof(this.gamelist_lid[item]) === 'undefined') {
                    this.gamelist_lid[item] = 1;
                }else {
                    this.gamelist_lid[item]++;
                }
            });
            //★接下來顯示在 html，然後用 pipe 由 lid 過濾所有的賽事
        })
    }

    /**
     * 取得賽事賠率表 gateway 100
     * @param item 被選擇到賽事的item
     */
    getGameInfo(item) {
        let req = { uid: this.uid, gtype: this.gtype, gid: item.gid };
        //賽事賠率表訂閱
        this.gameInfoSub = this.api.getFakeData(100, req).subscribe((res) => {
            //驗證 api gateway 是否有誤
            this.global.status(res.status, res.msg);
            //template賽事資訊使用
            this.gmaeItem = item;
            this.gameInfo = res.data.ptype;

            //點擊賽事重設更新倒數時間、通過 null 才能執行更新計時器 (只有在"第一次點擊賽事"及"更新倒數計時器完成"後，才會是 null)
            this.updateTiming = this.updateTime;
            if(this.updateCounter == null) {
                this.updateInterval();
            }
        })
    }
    /**
     * 更新倒數計時器
     */
    updateInterval() {
        this.updateCounter = setInterval(()=>{
            this.updateTiming--;
            //若倒數完畢執行更新
            if(this.updateTiming == 0) {
                this.updateGameInfo();
            }
        }, 1000);
    }
    /**
     * 更新賽事賠率表 (更新倒數計時 or 點擊更新 驅動)
     */
    updateGameInfo() {
        //結束更新倒數計時器
        clearInterval(this.updateCounter);
        //重設更新倒數時間
        this.updateTiming = this.updateTime;
        //通過 null 才能再次執行計時器
        this.updateCounter = null;
        //取消賽賠率表訂閱後，再呼叫取得賽事賠率表
        this.gameInfoSub.unsubscribe();
        this.getGameInfo(this.gmaeItem);
    }
    /**
     * 賽事列表切換按鈕
     * @param btnPort 按鈕種類根據
     */
    switchList(btnPort: string) {
        //"按鈕"與"按鈕根據"相同，收回"按鈕"的設定 (關閉展開)
        if(btnPort == this.switchButton) {
            this.switchButton = '';
            return;
        }
        //設定按鈕
        this.switchButton = btnPort;
    }
}