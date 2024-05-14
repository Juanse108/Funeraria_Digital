import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Beneficiary } from "../models/beneficiary.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BeneficiaryService {
  constructor(private http: HttpClient) { }
  list(): Observable<Beneficiary[]> { // Esto es como una promesa
    return this.http.get<Beneficiary[]>(`${environment.url_ms_negocio}/beneficiary`);
  }
  delete(id:number){
    return this.http.delete<Beneficiary>(`${environment.url_ms_negocio}/beneficiary/${id}`);
  }
  view(id:number):Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${environment.url_ms_negocio}/beneficiary/${id}`);
  }
  create(newBeneficiary: Beneficiary): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(`${environment.url_ms_negocio}/beneficiary`, newBeneficiary);
  }
  update(theBeneficiary: Beneficiary): Observable<Beneficiary> {
    return this.http.put<Beneficiary>(`${environment.url_ms_negocio}/beneficiary/${theBeneficiary.id}`, theBeneficiary);
  }
}
