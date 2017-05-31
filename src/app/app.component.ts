import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'service';


@Component({
	selector: 'my-app',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
	constructor(private api: ApiService) { }

	ngOnInit() {
	}

	ngOnDestroy() {

	}
}
