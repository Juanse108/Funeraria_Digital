import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }
  list(): Observable<Site[]> {
    return this.http.get<Site[]>(`${environment.url_ms_negocio}/sites`);
    }
  delete(id:number){
    return this.http.delete<Site>(`${environment.url_ms_negocio}/sites/${id}`,
    );
  }
}
