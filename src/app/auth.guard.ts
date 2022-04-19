import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import {SecurityService} from './security.service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(protected readonly router: Router,
 private securityService: SecurityService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if ( localStorage.getItem("access_token"))
            return true;     
        else {

    this.router.navigate(['login']);   
        return false;
    }
    }
}
