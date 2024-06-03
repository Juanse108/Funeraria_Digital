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
  delete(id:number){
    return this.http.delete<Plan>(`${environment.url_ms_negocio}/plans/${id}`,
    );
  }
}
