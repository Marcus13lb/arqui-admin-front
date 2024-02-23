import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class TokenAdminGuard implements CanActivate {
  
  constructor(private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('token')){
        try {
          let token: any = jwt_decode(localStorage.getItem('token') as string);
          let currentTime = (Math.floor((new Date).getTime() / 1000));
          if(currentTime <= token?.exp) {
            return true
          } else {
            this.reject();
            return false;
          }
        } catch(e){
          this.reject();
          return false;
        }
      } 
      this.reject();
      return false;
  }

  reject = () => {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
}
