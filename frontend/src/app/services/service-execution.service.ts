import { Injectable } from '@angular/core';
import { ServiceExecution } from '../models/service-execution.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceExecutionService {

  constructor(private http: HttpClient) { }
  list(): Observable<ServiceExecution[]> {
    return this.http.get<ServiceExecution[]>(`${environment.url_ms_negocio}/service_executions`);
    
  }

  view (id: number): Observable<ServiceExecution>{
    return this.http.get<ServiceExecution>(`${environment.url_ms_security}/service_executions/${id}`,
    );
  }

  create (newServiceExecution: ServiceExecution):Observable<ServiceExecution> {
    return this.http.post<ServiceExecution>(`${environment.url_ms_security}/service_executions`, newServiceExecution);
  }

  update (theServiceExecution: ServiceExecution):Observable<ServiceExecution> {
    return this.http.put<ServiceExecution>(`${environment.url_ms_security}/service_executions/${theServiceExecution.service_code}`, theServiceExecution);
  }

  delete(id:number): Observable<ServiceExecution>{
    return this.http.delete<ServiceExecution>(`${environment.url_ms_negocio}/service_executions/${id}`);
    
  } }
