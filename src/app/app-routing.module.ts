//Module
import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
//Service
import { AuthGuard } from 'service';
//Component
import { MainPageComponent } from './main_page/main-page.component';
import { GameTableComponent } from './game_table/game-table.component';
import { BetDetailComponent } from './bet_detail/bet-detail.component';
import { BetHistoryComponent } from './bet_history/bet-history.component';
import { GameResultComponent } from './game_result/game-result.component';
import { BulletinBoardComponent } from './bulletin_board/bulletin-board.component';
import { MemberCenterComponent } from './member_center/member-center.component';
import { ControlMoneyComponent } from './control_money/control-money.component';


const routes: Routes = [
	{
		path: '',				//default
		redirectTo: '/main',
		pathMatch: 'full'
	},
	{
		path: 'main',			//廣告
		component: MainPageComponent,
	},
	{
		path: 'gametable',			//賽事
		component: GameTableComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'betdetail',			//下注明細
		component: BetDetailComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'bethistory',			// 歷史帳務
		component: BetHistoryComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'gameresult',			//賽事結果
		component: GameResultComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'bulletinboard',			//公告
		component: BulletinBoardComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'membercenter',			//公告
		component: MemberCenterComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'controlmoney',			//公告
		component: ControlMoneyComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule { }