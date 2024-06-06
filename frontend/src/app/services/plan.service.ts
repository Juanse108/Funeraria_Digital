import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }
  list(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${environment.url_ms_negocio}/plans`);
    }

  view (id: number): Observable<Plan>{
    return this.http.get<Plan>(`${environment.url_ms_security}/plans/${id}`,
    );
  }

  create (newPlan: Plan):Observable<Plan> {
    return this.http.post<Plan>(`${environment.url_ms_security}/plans`, newPlan);
  }

  update (thePlan: Plan):Observable<Plan> {
    return this.http.put<Plan>(`${environment.url_ms_security}/plans/${thePlan.id_plan}`, thePlan);
  }
  delete(id:number){
    return this.http.delete<Plan>(`${environment.url_ms_negocio}/plans/${id}`,
    );
  }
}
