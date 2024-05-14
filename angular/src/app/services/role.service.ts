import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../models/role.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private http: HttpClient) { }
  list(): Observable<Role[]> { // Esto es como una promesa
    return this.http.get<Role[]>(`${environment.url_ms_negocio}/role`);
  }
  delete(id:number){
    return this.http.delete<Role>(`${environment.url_ms_negocio}/role/${id}`);
  }
  view(id:number):Observable<Role> {
    return this.http.get<Role>(`${environment.url_ms_negocio}/role/${id}`);
  }
  create(newRole: Role): Observable<Role> {
    return this.http.post<Role>(`${environment.url_ms_negocio}/role`, newRole);
  }
  update(theRole: Role): Observable<Role> {
    return this.http.put<Role>(`${environment.url_ms_negocio}/role/${theRole.id}`, theRole);
  }
}
