import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grave } from '../models/grave.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraveService {

  constructor(private http: HttpClient) { }
  list(): Observable<Grave[]> { // Esto es como una promesa
    return this.http.get<Grave[]>(`${environment.url_ms_negocio}/grave`);
  }
  delete(id:number){
    return this.http.delete<Grave>(`${environment.url_ms_negocio}/grave/${id}`);
  }
  view(id:number):Observable<Grave> {
    return this.http.get<Grave>(`${environment.url_ms_negocio}/grave/${id}`);
  }
  create(newGrave: Grave): Observable<Grave> {
    return this.http.post<Grave>(`${environment.url_ms_negocio}/grave`, newGrave);
  }
  update(theGrave: Grave): Observable<Grave> {
    return this.http.put<Grave>(`${environment.url_ms_negocio}/grave/${theGrave.id}`, theGrave);
  }
}
