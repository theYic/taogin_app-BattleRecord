//Modules
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//service
import { ApiService} from 'service';
/* Feature Modules */                 //HTTP
//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './_header/header.component';
import { BattleRecordComponent } from './battle_record/battle-record.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		HeaderComponent,
		BattleRecordComponent

	],
	providers: [
		ApiService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
