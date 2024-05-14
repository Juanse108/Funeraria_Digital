import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Serviceexecution } from '../models/serviceexecution.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceexecutionService {

  constructor(private http: HttpClient) { }
  list(): Observable<Serviceexecution[]> { // Esto es como una promesa
    return this.http.get<Serviceexecution[]>(`${environment.url_ms_negocio}/serviceexecution`);
  }
  delete(id:number){
    return this.http.delete<Serviceexecution>(`${environment.url_ms_negocio}/serviceexecution/${id}`);
  }
  view(id:number):Observable<Serviceexecution> {
    return this.http.get<Serviceexecution>(`${environment.url_ms_negocio}/serviceexecution/${id}`);
  }
  create(newServiceexecution: Serviceexecution): Observable<Serviceexecution> {
    return this.http.post<Serviceexecution>(`${environment.url_ms_negocio}/serviceexecution`, newServiceexecution);
  }
  update(theServiceexecution: Serviceexecution): Observable<Serviceexecution> {
    return this.http.put<Serviceexecution>(`${environment.url_ms_negocio}/serviceexecution/${theServiceexecution.id}`, theServiceexecution);
  }
}
