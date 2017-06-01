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

    }

    ngOnDestroy(){
    }
}