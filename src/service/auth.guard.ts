import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { GlobalService } from 'service/global.service';
@Injectable()
//sid驗證服務
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private globals: GlobalService) { }

	canActivate() {
		//console.log(sessionStorage.getItem('uid'));
		if (sessionStorage.getItem('uid')) {
			return true;
		}
		alert('請重新登入');
		this.router.navigate(['main']);
		this.globals.setShowLogin(true);
		return false;
	}
}