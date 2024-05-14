import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cremation } from '../models/cremation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CremationService {

  constructor(private http: HttpClient) { }
  list(): Observable<Cremation[]> { // Esto es como una promesa
    return this.http.get<Cremation[]>(`${environment.url_ms_negocio}/cremation`);
  }
  delete(id:number){
    return this.http.delete<Cremation>(`${environment.url_ms_negocio}/cremation/${id}`);
  }
  view(id:number):Observable<Cremation> {
    return this.http.get<Cremation>(`${environment.url_ms_negocio}/cremation/${id}`);
  }
  create(newCremation: Cremation): Observable<Cremation> {
    return this.http.post<Cremation>(`${environment.url_ms_negocio}/cremation`, newCremation);
  }
  update(theCremation: Cremation): Observable<Cremation> {
    return this.http.put<Cremation>(`${environment.url_ms_negocio}/cremation/${theCremation.id}`, theCremation);
  }
}
