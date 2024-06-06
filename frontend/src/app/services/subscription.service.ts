import { Injectable } from '@angular/core';
import { Subscription } from '../models/subscription.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }
  list(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${environment.url_ms_negocio}/subscriptions`);
    
  }

  view (id: number): Observable<Subscription>{
    return this.http.get<Subscription>(`${environment.url_ms_negocio}/subscriptions/${id}`,
    );
  }

  create (newSubscription: Subscription):Observable<Subscription> {
    return this.http.post<Subscription>(`${environment.url_ms_negocio}/subscriptions`, newSubscription);
  }

  update (theSubscription: Subscription):Observable<Subscription> {
    return this.http.put<Subscription>(`${environment.url_ms_negocio}/subscriptions/${theSubscription.subscription_id}`, theSubscription);
  }

  delete(id:number): Observable<Subscription>{
    return this.http.delete<Subscription>(`${environment.url_ms_negocio}/subscriptions/${id}`);
    
  }
}
