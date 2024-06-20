import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanService } from './plan.service';
import { ServicePlan } from '../models/service-plan.model';

@Injectable({
  providedIn: 'root'
})
export class 
ServicePlanService {

  constructor(private http: HttpClient) { }
  list(): Observable<ServicePlan[]> {
    return this.http.get<ServicePlan[]>(`${environment.url_ms_negocio}/service_plans`);
    }
  view(id:number):Observable<ServicePlan>{
      return this.http.get<ServicePlan>(`${environment.url_ms_negocio}/service_plans/${id}`,
      );
    }
  create(newServicePlan:ServicePlan):Observable<ServicePlan>{
      return this.http.post<ServicePlan>(`${environment.url_ms_negocio}/service_plans`,newServicePlan);
    }  
  update(theServicePlan:ServicePlan):Observable<ServicePlan>{
      return this.http.put<ServicePlan>(`${environment.url_ms_negocio}/service_plans/${theServicePlan.id}`,theServicePlan);
    } 
    
  delete(id:number){
    return this.http.delete<ServicePlan>(`${environment.url_ms_negocio}/service_plans/${id}`,
    );
  }
}
