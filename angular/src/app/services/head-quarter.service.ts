import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Headquarter} from "../models/headquarter.model";

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {

  constructor(private http: HttpClient) { }
  list(): Observable<Headquarter[]> { // Esto es como una promesa
    return this.http.get<Headquarter[]>(`${environment.url_ms_negocio}/headquarter`);
  }
  delete(id:number){
    return this.http.delete<Headquarter>(`${environment.url_ms_negocio}/headquarter/${id}`);
  }
  view(id:number):Observable<Headquarter> {
    return this.http.get<Headquarter>(`${environment.url_ms_negocio}/headquarter/${id}`);
  }
  create(newHeadquarter: Headquarter): Observable<Headquarter> {
    return this.http.post<Headquarter>(`${environment.url_ms_negocio}/headquarter`, newHeadquarter);
  }
  update(theHeadquarter: Headquarter): Observable<Headquarter> {
    return this.http.put<Headquarter>(`${environment.url_ms_negocio}/headquarter/${theHeadquarter.id}`, theHeadquarter);
  }
}
