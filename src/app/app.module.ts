//Modules
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//service
import { ApiService} from 'service';
/* Feature Modules */
import {QRCodeModule} from 'angular2-qrcode';                   //HTTP
//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './_header/header.component';
import { BattleRecordComponent } from './battle_record/battle-record.component';
import { QrcodeComponent } from './_qrcode/qrcode.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		QRCodeModule
	],
	declarations: [
		AppComponent,
		HeaderComponent,
		BattleRecordComponent,
		QrcodeComponent

	],
	providers: [
		ApiService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
