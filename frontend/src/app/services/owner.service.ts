import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }
  list(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${environment.url_ms_negocio}/owners`);
    }
  view(id:number):Observable<Owner>{
    return this.http.get<Owner>(`${environment.url_ms_negocio}/owners/${id}`,
    );
  }
  create(newOwner:Owner):Observable<Owner>{
    return this.http.post<Owner>(`${environment.url_ms_negocio}/owners`,newOwner);
  }
  update(theOwner:Owner):Observable<Owner>{
    return this.http.put<Owner>(`${environment.url_ms_negocio}/owners/${theOwner.id_owner}`,theOwner);
  }
  delete(id:number){
    return this.http.delete<Owner>(`${environment.url_ms_negocio}/owners/${id}`,
    );
  }
}
