import { Injectable } from '@angular/core';
import { Cremation } from '../models/cremation.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CremationService {

  constructor(private http: HttpClient) { }
  list(): Observable<Cremation[]> {
    return this.http.get<Cremation[]>(`${environment.url_ms_negocio}/cremations`);
    }
  delete(id:number){
    return this.http.delete<Cremation>(`${environment.url_ms_negocio}/cremations/${id}`,
    );
  }
}
