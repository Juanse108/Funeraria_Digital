import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  list(): Observable<Service[]> { // Esto es como una promesa
    return this.http.get<Service[]>(`${environment.url_ms_negocio}/service`);
  }
  delete(id:number){
    return this.http.delete<Service>(`${environment.url_ms_negocio}/service/${id}`);
  }
  view(id:number):Observable<Service> {
    return this.http.get<Service>(`${environment.url_ms_negocio}/service/${id}`);
  }
  create(newService: Service): Observable<Service> {
    return this.http.post<Service>(`${environment.url_ms_negocio}/service`, newService);
  }
  update(theService: Service): Observable<Service> {
    return this.http.put<Service>(`${environment.url_ms_negocio}/service/${theService.id}`, theService);
  }
}
