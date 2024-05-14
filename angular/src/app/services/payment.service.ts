import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Payment} from "../models/payment.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  list(): Observable<Payment[]> { // Esto es como una promesa
    return this.http.get<Payment[]>(`${environment.url_ms_negocio}/payment`);
  }
  delete(id:number){
    return this.http.delete<Payment>(`${environment.url_ms_negocio}/payment/${id}`);
  }
  view(id:number):Observable<Payment> {
    return this.http.get<Payment>(`${environment.url_ms_negocio}/payment/${id}`);
  }
  create(newPayment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${environment.url_ms_negocio}/payment`, newPayment);
  }
  update(thePayment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${environment.url_ms_negocio}/payment/${thePayment.id}`, thePayment);
  }
}
