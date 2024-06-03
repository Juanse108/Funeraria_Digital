import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanService } from './plan.service';
import { ServicePlan } from '../models/service-plan.model';

@Injectable({
  providedIn: 'root'
})
export class ServicePlanService {

  constructor(private http: HttpClient) { }
  list(): Observable<ServicePlan[]> {
    return this.http.get<ServicePlan[]>(`${environment.url_ms_negocio}/service_plans`);
    }
  delete(id:number){
    return this.http.delete<ServicePlan>(`${environment.url_ms_negocio}/service_plans/${id}`,
    );
  }
}
