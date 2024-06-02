import { Injectable } from '@angular/core';
import { Relocation } from '../models/relocation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelocationService {

  constructor(private http: HttpClient) { }
  list(): Observable<Relocation[]> {
    return this.http.get<Relocation[]>(`${environment.url_ms_negocio}/relocations`);

  }

  view (id: number): Observable<Relocation>{
    return this.http.get<Relocation>(`${environment.url_ms_security}/relocations/${id}`,
    );
  }

  create (newRelocation: Relocation):Observable<Relocation> {
    return this.http.post<Relocation>(`${environment.url_ms_security}/relocations`, newRelocation);
  }

  update (theRelocation: Relocation):Observable<Relocation> {
    return this.http.put<Relocation>(`${environment.url_ms_security}/relocations/${theRelocation.id_relocation}`, theRelocation);
  }

  delete(id_relocation: number): Observable<Relocation> {
    return this.http.delete<Relocation>(`${environment.url_ms_negocio}/relocations/${id_relocation}`);
  }
}
