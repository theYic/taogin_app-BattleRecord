import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'deposit-wechat',
    templateUrl: 'deposit-wechat.component.html'
})
export class DepositWechatComponent implements OnInit {
    private selectItem : string="Online";
    private deposit : boolean= true;
    constructor() { }

    ngOnInit() { }

    changeSelectItem(_item: string):void{
        this.selectItem=_item;
    }
}