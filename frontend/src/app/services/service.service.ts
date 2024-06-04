import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  list(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.url_ms_negocio}/services`);
    }
  view(id:number):Observable<Service>{
      return this.http.get<Service>(`${environment.url_ms_negocio}/services/${id}`,
      );
    }
  create(newService:Service):Observable<Service>{
      return this.http.post<Service>(`${environment.url_ms_negocio}/services`,newService);
    }  
  update(theService:Service):Observable<Service>{
      return this.http.put<Service>(`${environment.url_ms_negocio}/services/${theService.id_service}`,theService);
    }  
  delete(id:number){
    return this.http.delete<Service>(`${environment.url_ms_negocio}/services/${id}`,
    );
  }
}
