import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }
  list(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.url_ms_negocio}/chats`);

  }
  view (id: number): Observable<Chat>{
    return this.http.get<Chat>(`${environment.url_ms_negocio}/chats/${id}`,
    );
  }

  create (newChat: Chat):Observable<Chat> {
    return this.http.post<Chat>(`${environment.url_ms_negocio}/chats`, newChat);
  }

  update (theChat: Chat):Observable<Chat> {
    return this.http.put<Chat>(`${environment.url_ms_negocio}/chats/${theChat.id_chat}`, theChat);
  }

  delete(id: number): Observable<Chat> {
    return this.http.delete<Chat>(`${environment.url_ms_negocio}/chats/${id}`);
  }

 
}
