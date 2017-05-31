import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService ,GlobalService } from 'service';


@Component({
	selector: 'my-app',
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
	constructor(private api: ApiService ,private globals: GlobalService) { }

	hello = 'Hello from Angular App with Webpack2';

	ngOnInit() {

		this.api.getFakeData(100).subscribe( res => {
			//console.log(res);
			this.globals.status(res.status,res.msg);

		} );
		this.api.getFakeData(100).subscribe();
	}

	ngOnDestroy() {

	}
}
