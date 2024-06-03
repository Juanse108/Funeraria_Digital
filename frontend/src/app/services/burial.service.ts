import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Burial } from '../models/burial.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BurialService {

  constructor(private http: HttpClient) { }
  list(): Observable<Burial[]> {
    return this.http.get<Burial[]>(`${environment.url_ms_negocio}/burials`);
    }
  delete(id:number){
    return this.http.delete<Burial>(`${environment.url_ms_negocio}/burials/${id}`,
    );
  }
}
