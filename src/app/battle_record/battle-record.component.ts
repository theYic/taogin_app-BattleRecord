import { Component, OnInit, OnDestroy} from '@angular/core';
import { ApiService } from 'service';
import { Observable, Subscription } from 'rxjs';
@Component({
    selector: 'battle-record',
    templateUrl: 'battle-record.component.html'
})
/**
 * 主頁面上的 header
 */
export class BattleRecordComponent implements OnInit, OnDestroy {
    /**
     * 現在時間
     */
    public battleData : string = "";
    /**
     * 當前語言 顯示的名稱
     */
    public selectLang : string = "";
    constructor(public api: ApiService) { }

    ngOnInit() {
        this.getBattleRecord();
    }
    getBattleRecord(){
        // let tempData = "http://big59-web.sog88.net/app/openWin/?battleRecord=406695421?zh-cn?FT?344283";
        let tempData = location.href;
        let temp = tempData.substring(tempData.indexOf("=")+1).split("?");
        // console.log(temp);
        this.doBattleRecord(temp);
    }
        doBattleRecord(data : any) : any{
        let para = { uid : data[0], lang : data[1], gtype : data[2], gid : data[3]};
        this.battleData = "";
        this.api.postServer(681, para ).subscribe(res => {
            if(!res['err']){
                console.log("對戰紀錄回傳訊息",res);
                return;
            }
            this.battleData = res['ret'];
            // console.log(this.battleData);
        });
    }
    ngOnDestroy(){
    }
}