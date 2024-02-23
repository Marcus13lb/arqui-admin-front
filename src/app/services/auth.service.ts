import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSource = new BehaviorSubject<any>(null);
  public user = this.userSource.asObservable();

  constructor(private http:HttpClient, private router: Router) {}

  login = (form:any):Observable<Response> => {
    return this.http.post<Response>(`${environment.api}/login`, form);
  }

  removeUser = () => {
    this.userSource.next(null);
  }

  getUser = () => {
    if(this.userSource.getValue() == null){
      let token: any = jwt_decode(localStorage.getItem('token') as string);
      if(token !== null){
        this.userSource.next({usuario : token.usuario});
      } else {
        this.router.navigate(['/login'])
      }
    }
    return this.user;
  }
}
