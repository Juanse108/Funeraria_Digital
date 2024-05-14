import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Headline } from "../models/headline.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HeadlineService {
  constructor(private http: HttpClient) { }
  list(): Observable<Headline[]> { // Esto es como una promesa
    return this.http.get<Headline[]>(`${environment.url_ms_negocio}/headline`);
  }
  delete(id:number){
    return this.http.delete<Headline>(`${environment.url_ms_negocio}/headline/${id}`);
  }
  view(id:number):Observable<Headline> {
    return this.http.get<Headline>(`${environment.url_ms_negocio}/headline/${id}`);
  }
  create(newHeadline: Headline): Observable<Headline> {
    return this.http.post<Headline>(`${environment.url_ms_negocio}/headline`, newHeadline);
  }
  update(theHeadline: Headline): Observable<Headline> {
    return this.http.put<Headline>(`${environment.url_ms_negocio}/headline/${theHeadline.id}`, theHeadline);
  }
}
