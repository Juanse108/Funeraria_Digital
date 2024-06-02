import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  list(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.url_ms_negocio}/customers`);
    
  }

  view (id: number): Observable<Customer>{
    return this.http.get<Customer>(`${environment.url_ms_security}/customers/${id}`,
    );
  }

  create (newCustomer: Customer):Observable<Customer> {
    return this.http.post<Customer>(`${environment.url_ms_security}/customers`, newCustomer);
  }

  update (theCustomer: Customer):Observable<Customer> {
    return this.http.put<Customer>(`${environment.url_ms_security}/customers/${theCustomer.id}`, theCustomer);
  }

  delete(id:number): Observable<Customer>{
    return this.http.delete<Customer>(`${environment.url_ms_negocio}/customers/${id}`);
    
  }
}
