import { Component, OnInit, OnDestroy} from '@angular/core';
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

    constructor() { }

    ngOnInit() {
        this.nowTime = new Date().toString().slice(0,new Date().toString().indexOf("("));
        Observable.interval(1000).subscribe( () => this.nowTime = new Date().toString().slice(0,new Date().toString().indexOf("(")));
    }
    ngOnDestroy(){
    }
}