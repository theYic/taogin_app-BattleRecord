import { Component, OnInit } from '@angular/core';
import { GlobalService, ApiService } from 'service';
import { host } from 'lib/config';

@Component({
    selector: 'bulletin-page',
    templateUrl: 'bulletin-board.component.html'
})
/**
 * 公告主頁面 
 */
export class BulletinBoardComponent implements OnInit {
    private billboardData: string = "";
    private judgeContent: string = "noData";
    constructor(private globals: GlobalService, private api: ApiService) { }
    ngOnInit() {
        this.getPublicData();
     }

    getPublicData(): void {
        this.api.getFakeData(810, { uid : sessionStorage.getItem('uid'), lang : host.lan }).subscribe(res => {

            this.globals.status(res.status, res.msg);
            let data=res.data;
            if(!data) {
                this.judgeContent="noData";
                return;
            }
            this.judgeContent="publicData";
            this.billboardData = data;

            // res.data.map((item) => {
            //     this.marqueeData+=item.content+"\t";
            // });

        });
     }
     getUserData(): void {
         this.judgeContent="noData";
     }

}