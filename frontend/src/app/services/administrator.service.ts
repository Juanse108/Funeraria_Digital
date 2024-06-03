import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }
  list(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${environment.url_ms_negocio}/administrators`);
    }
  delete(id:number){
    return this.http.delete<Administrator>(`${environment.url_ms_negocio}/administrators/${id}`,
    );
  }
}
