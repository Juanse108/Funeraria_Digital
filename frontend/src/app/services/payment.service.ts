import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  list(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.url_ms_negocio}/payments`);
    
  }

  view (id: number): Observable<Payment>{
    return this.http.get<Payment>(`${environment.url_ms_security}/payments/${id}`,
    );
  }

  create (newPayment: Payment):Observable<Payment> {
    return this.http.post<Payment>(`${environment.url_ms_security}/payments`, newPayment);
  }

  update (thePayment: Payment):Observable<Payment> {
    return this.http.put<Payment>(`${environment.url_ms_security}/payments/${thePayment.id}`, thePayment);
  }

  delete(id:number): Observable<Payment>{
    return this.http.delete<Payment>(`${environment.url_ms_negocio}/payments/${id}`);
  }
}
