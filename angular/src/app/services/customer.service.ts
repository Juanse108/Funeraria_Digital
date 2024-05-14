import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private http: HttpClient) { }
  list(): Observable<Customer[]> { // Esto es como una promesa
    return this.http.get<Customer[]>(`${environment.url_ms_negocio}/customer`);
  }
  delete(id:number){
    return this.http.delete<Customer>(`${environment.url_ms_negocio}/customer/${id}`);
  }
  view(id:number):Observable<Customer> {
    return this.http.get<Customer>(`${environment.url_ms_negocio}/customer/${id}`);
  }
  create(newCustomer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.url_ms_negocio}/customer`, newCustomer);
  }
  update(theCustomer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${environment.url_ms_negocio}/customer/${theCustomer.id}`, theCustomer);
  }
}
