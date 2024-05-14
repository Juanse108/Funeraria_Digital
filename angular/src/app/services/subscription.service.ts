import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Subscription} from "../models/subscription.model";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }
  list(): Observable<Subscription[]> { // Esto es como una promesa
    return this.http.get<Subscription[]>(`${environment.url_ms_negocio}/subscription`);
  }
  delete(id:number){
    return this.http.delete<Subscription>(`${environment.url_ms_negocio}/subscription/${id}`);
  }
  view(id:number):Observable<Subscription> {
    return this.http.get<Subscription>(`${environment.url_ms_negocio}/subscription/${id}`);
  }
  create(newSubscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(`${environment.url_ms_negocio}/subscription`, newSubscription);
  }
  update(theSubscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${environment.url_ms_negocio}/subscription/${theSubscription.id}`, theSubscription);
  }
}
