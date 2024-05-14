import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Permission } from "../models/permission.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  constructor(private http: HttpClient) { }
  list(): Observable<Permission[]> { // Esto es como una promesa
    return this.http.get<Permission[]>(`${environment.url_ms_negocio}/permission`);
  }
  delete(id:number){
    return this.http.delete<Permission>(`${environment.url_ms_negocio}/permission/${id}`);
  }
  view(id:number):Observable<Permission> {
    return this.http.get<Permission>(`${environment.url_ms_negocio}/permission/${id}`);
  }
  create(newPermission: Permission): Observable<Permission> {
    return this.http.post<Permission>(`${environment.url_ms_negocio}/permission`, newPermission);
  }
  update(thePermission: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${environment.url_ms_negocio}/permission/${thePermission.id}`, thePermission);
  }
}
