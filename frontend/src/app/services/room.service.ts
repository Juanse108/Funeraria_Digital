import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }
  list(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.url_ms_negocio}/rooms`);
    }

  view (id: number): Observable<Room>{
    return this.http.get<Room>(`${environment.url_ms_security}/rooms/${id}`,
    );
  }

  create (newRoom: Room):Observable<Room> {
    return this.http.post<Room>(`${environment.url_ms_security}/rooms`, newRoom);
  }

  update (theRoom: Room):Observable<Room> {
    return this.http.put<Room>(`${environment.url_ms_security}/rooms/${theRoom.id_room}`, theRoom);
  }
  delete(id:number){
    return this.http.delete<Room>(`${environment.url_ms_negocio}/rooms/${id}`,
    );
  }
}
