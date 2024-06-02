import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }
  list(): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.url_ms_negocio}/messages`);

  }

  view (id: number): Observable<Message>{
    return this.http.get<Message>(`${environment.url_ms_security}/messages/${id}`,
    );
  }

  create (newMessage: Message):Observable<Message> {
    return this.http.post<Message>(`${environment.url_ms_security}/messages`, newMessage);
  }

  update (theMessage: Message):Observable<Message> {
    return this.http.put<Message>(`${environment.url_ms_security}/messages/${theMessage.id}`, theMessage);
  }
  
  delete(id: number): Observable<Message> {
    return this.http.delete<Message>(`${environment.url_ms_negocio}/messages/${id}`);
  }
}
