import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'deposit-serial',
    templateUrl: 'deposit-serial.component.html'
})
export class DepositSerialComponent implements OnInit {
    private selectItem : string="Online";
    private deposit : boolean= true;
    constructor() { }

    ngOnInit() { }

    changeSelectItem(_item: string):void{
        this.selectItem=_item;
    }
}