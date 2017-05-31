import { Pipe, PipeTransform } from '@angular/core';

/**
 * 處理 賽事列表 及 賽事列表日期 的對應 (game-list-component.html)
 */
@Pipe({name: 'classifyTime'})
export class ClassifyTimePipe implements PipeTransform {
    transform(value: any, time: string): any {
        let res = value.filter((item) => {
            return item._gdate == time;     //如果日期相同才納入陣列
        });
        return res;
    }
}

/**
 * 賠率表(賽事)增添 玩法 欄位，並轉成陣列 (game-table-component.html)
 */
@Pipe({name: 'iterateOdds'})
export class IterateOdds implements PipeTransform {
    transform(value: any): any {
        let res = Object.keys(value).map(item => {
            value[item].ptype = item;       //增加玩法的欄位
            return value[item];
        });
        return res;
    }
}
