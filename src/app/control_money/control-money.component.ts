import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'control-money',
    templateUrl: 'control-money.component.html'
})
export class ControlMoneyComponent implements OnInit {
    private selectItem : string="Online";
    private deposit : boolean= true;
    constructor() { }

    ngOnInit() { }

    changeSelectItem(_item: string):void{
        this.selectItem=_item;
    }
}