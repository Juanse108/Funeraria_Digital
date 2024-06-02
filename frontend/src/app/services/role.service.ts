import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  list(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url_ms_security}/roles`);
  }

  view (id: string): Observable<Role>{
    return this.http.get<Role>(`${environment.url_ms_security}/roles/${id}`,
    );
  }

  create (newRole: Role):Observable<Role> {
    return this.http.post<Role>(`${environment.url_ms_security}/roles`, newRole);
  }

  update (theRole: Role):Observable<Role> {
    return this.http.put<Role>(`${environment.url_ms_security}/roles/${theRole._id}`, theRole);
  }

  delete(id: string) {
    return this.http.delete<Role>(`${environment.url_ms_security}/roles/${id}`,
    );
  }

}
