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

  view (id: number): Observable<Cremation>{
    return this.http.get<Cremation>(`${environment.url_ms_negocio}/cremations/${id}`,
    );
  }

  create (newCremation: Cremation):Observable<Cremation> {
    return this.http.post<Cremation>(`${environment.url_ms_negocio}/cremations`, newCremation);
  }

  update (theCremation: Cremation):Observable<Cremation> {
    return this.http.put<Cremation>(`${environment.url_ms_negocio}/cremations/${theCremation.id_cremation}`, theCremation);
  }
  delete(id:number){
    return this.http.delete<Cremation>(`${environment.url_ms_negocio}/cremations/${id}`,
    );
  }
}
