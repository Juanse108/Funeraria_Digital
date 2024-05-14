import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Driver } from "../models/driver.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DriverService {
  constructor(private http: HttpClient) { }
  list(): Observable<Driver[]> { // Esto es como una promesa
    return this.http.get<Driver[]>(`${environment.url_ms_negocio}/driver`);
  }
  delete(id:number){
    return this.http.delete<Driver>(`${environment.url_ms_negocio}/driver/${id}`);
  }
  view(id:number):Observable<Driver> {
    return this.http.get<Driver>(`${environment.url_ms_negocio}/driver/${id}`);
  }
  create(newDriver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${environment.url_ms_negocio}/driver`, newDriver);
  }
  update(theDriver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${environment.url_ms_negocio}/driver/${theDriver.id}`, theDriver);
  }
}
