import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  updateWebConf = (form:any):Observable<Response | any> => {
    return this.http.post<Response | any>(`${environment.api}/web`, form);
  }
  
  getWEbConf = ():Observable<Response | any> => {
    return this.http.get<Response | any>(`${environment.api}/web`);
  }
}
