import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private message: MessageService, private router: Router, private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string | null = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: {
          'x-auth-token' : `Bearer ${token}`,
          rejectUnauthorized : 'false',
          Accept: 'application/json'
        }
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          localStorage.removeItem('token');
          this.auth.removeUser();
          this.router.navigate(['/login']);
        }
        if (err.status == 403) {
          this.message.add({key: 'admin', severity:'error', summary: environment.appName, detail: 'No tiene permisos para esta acción'});
          this.router.navigate(['/admin']);
        }
        return throwError(err);
      })
    );
  }
}
