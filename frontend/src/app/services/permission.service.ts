import { Injectable } from '@angular/core';
import { Permission } from '../models/permission.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  list(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.url_ms_security}/permissions`);
  }

  view (id: string): Observable<Permission>{
    return this.http.get<Permission>(`${environment.url_ms_security}/permissions/${id}`,
    );
  }

  create (newPermission: Permission):Observable<Permission> {
    return this.http.post<Permission>(`${environment.url_ms_security}/permissions`, newPermission);
  }

  update (thePermission: Permission):Observable<Permission> {
    return this.http.put<Permission>(`${environment.url_ms_security}/permissions/${thePermission._id}`, thePermission);
  }
  
  delete(id: string) {
    return this.http.delete<Permission>(`${environment.url_ms_security}/permissions/${id}`,
    );
  }
}
