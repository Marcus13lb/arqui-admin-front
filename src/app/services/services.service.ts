import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  get = ():Observable<Response | any> => {
    return this.http.get<Response | any>(`${environment.api}/servicios`);
  }
  
  put = (form:any):Observable<Response | any> => {
    return this.http.put<Response | any>(`${environment.api}/servicio/${form.id}`, form);
  }

  post = (form:any):Observable<Response | any> => {
    return this.http.post<Response | any>(`${environment.api}/servicio`, form);
  }

  delete = (id:number):Observable<Response | any> => {
    return this.http.delete<Response | any>(`${environment.api}/servicio/${id}`);
  }

}
