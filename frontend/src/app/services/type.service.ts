import { Injectable } from '@angular/core';
import { Type } from '../models/type.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }
  list(): Observable<Type[]> {
    return this.http.get<Type[]>(`${environment.url_sustentacion}/tipos-musica`);
    
  }


  create (newType: Type):Observable<Type> {
    return this.http.post<Type>(`${environment.url_sustentacion}/tipos-musica`, newType);
  }
}
