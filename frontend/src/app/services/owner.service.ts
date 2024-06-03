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
  delete(id:number){
    return this.http.delete<Owner>(`${environment.url_ms_negocio}/owners/${id}`,
    );
  }
}
