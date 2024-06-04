import { Injectable } from '@angular/core';
import { Beneficiary } from '../models/beneficiary.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private http: HttpClient) { }
  list(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${environment.url_ms_negocio}/beneficiaries`);
    }

  view (id: number): Observable<Beneficiary>{
    return this.http.get<Beneficiary>(`${environment.url_ms_security}/beneficiaries/${id}`,
    );
  }

  create (newBeneficiary: Beneficiary):Observable<Beneficiary> {
    return this.http.post<Beneficiary>(`${environment.url_ms_security}/beneficiaries`, newBeneficiary);
  }

  update (theBeneficiary: Beneficiary):Observable<Beneficiary> {
    return this.http.put<Beneficiary>(`${environment.url_ms_security}/beneficiaries/${theBeneficiary.id}`, theBeneficiary);
  }
  delete(id:number){
    return this.http.delete<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${id}`,
    );
  }
}
