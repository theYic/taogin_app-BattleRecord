//Modules
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//service
import { ApiService} from 'service';
                                              //HTTP
//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './_header/header.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		HeaderComponent

	],
	providers: [
		ApiService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
