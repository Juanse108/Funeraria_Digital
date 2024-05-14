import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }
  list(): Observable<Transfer[]> { // Esto es como una promesa
    return this.http.get<Transfer[]>(`${environment.url_ms_negocio}/transfer`);
  }
  delete(id:number){
    return this.http.delete<Transfer>(`${environment.url_ms_negocio}/transfer/${id}`);
  }
  view(id:number):Observable<Transfer> {
    return this.http.get<Transfer>(`${environment.url_ms_negocio}/transfer/${id}`);
  }
  create(newTransfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(`${environment.url_ms_negocio}/transfer`, newTransfer);
  }
  update(theTransfer: Transfer): Observable<Transfer> {
    return this.http.put<Transfer>(`${environment.url_ms_negocio}/transfer/${theTransfer.id}`, theTransfer);
  }
}
