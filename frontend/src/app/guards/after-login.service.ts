import { ApiService } from './../services/api/api.service';
import { AuthService } from './../services/auth/auth.service';
import { TokenService } from './../services/token/token.service';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AfterLoginService implements CanActivate {

  constructor(private Token: TokenService, private router: Router, private Auth: AuthService, private api: ApiService) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.Token.loggedIn()) {
      return true;
    }

    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigate(['login']);
    return false;
  }
}
