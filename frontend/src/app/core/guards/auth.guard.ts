import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      //const user = this.authService.getCurrentUser();
      //console.log(user);
      //return true;
      /*
      if (user) {
        return true;
      }

      this.router.navigate(['auth/login']);
      return false;
      */

      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['auth/login']);
        return false;
      }
      return true;


  }
  
}
