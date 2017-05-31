//Modules
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
//service
import { ApiService, GlobalService, AuthGuard,MaxValidator, MinValidator} from 'service';
                                              //HTTP
//component
import { AppComponent } from './app.component';
import { MainPageComponent } from './main_page/main-page.component';
import { HeaderComponent } from './_header/header.component';
import { FooterComponent } from './_footer/footer.component';
import { LoginComponent } from './_login/login.component';
import { BetDetailComponent } from './bet_detail/bet-detail.component';
import { BetHistoryComponent } from './bet_history/bet-history.component'
import { BulletinBoardComponent } from './bulletin_board/bulletin-board.component';
import { GameTableComponent } from './game_table/game-table.component';
import { GameResultComponent } from './game_result/game-result.component';
import { MemberCenterComponent } from './member_center/member-center.component';
import { ControlMoneyComponent } from './control_money/control-money.component';
import { DepositDefaultComponent } from './control_money/deposit_default/deposit-default.component';
import { DepositSerialComponent } from './control_money/deposit_serial/deposit-serial.component';
import { DepositWechatComponent } from './control_money/deposit_wechat/deposit-wechat.component';
import { WithdrawalComponent } from './control_money/_withdrawal/withdrawal.component';
import { RecordComponent } from './control_money/_record/record.component';
//directvie

//pipes
import { ClassifyTimePipe, IterateOdds } from './app.pipes';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		MainPageComponent,
		HeaderComponent,
		FooterComponent,
		LoginComponent,
		BetDetailComponent,
		BetHistoryComponent,
		BulletinBoardComponent,
		GameTableComponent,
		GameResultComponent,
		MemberCenterComponent,
		ControlMoneyComponent,
		DepositDefaultComponent,
		DepositSerialComponent,
		DepositWechatComponent,
		WithdrawalComponent,
		MaxValidator,
		MinValidator,
		RecordComponent,
		ClassifyTimePipe,
		IterateOdds

	],
	providers: [
		ApiService,
		GlobalService,
		AuthGuard
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
