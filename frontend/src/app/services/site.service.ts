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
    view(id:number):Observable<Site>{
      return this.http.get<Site>(`${environment.url_ms_negocio}/sites/${id}`,
    );
    }
    create(newSite:Site):Observable<Site>{
      return this.http.post<Site>(`${environment.url_ms_negocio}/sites`,newSite);
    }
    update(theSite:Site):Observable<Site>{
      return this.http.put<Site>(`${environment.url_ms_negocio}/sites/${theSite.id_site_mortuary}`,theSite);
    }
  delete(id:number){
    return this.http.delete<Site>(`${environment.url_ms_negocio}/sites/${id}`,
    );
  }
}
