import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }
  list(): Observable<Administrator[]> { // Esto es como una promesa
    return this.http.get<Administrator[]>(`${environment.url_ms_negocio}/administrator`);
  }
  delete(id:number){
    return this.http.delete<Administrator>(`${environment.url_ms_negocio}/administrator/${id}`);
  }
  view(id:number):Observable<Administrator> {
    return this.http.get<Administrator>(`${environment.url_ms_negocio}/administrator/${id}`);
  }
  create(newAdministrator: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(`${environment.url_ms_negocio}/administrator`, newAdministrator);
  }
  update(theAdministrator: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(`${environment.url_ms_negocio}/administrator/${theAdministrator.id}`, theAdministrator);
  }
}
