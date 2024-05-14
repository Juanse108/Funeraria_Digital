import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Room} from "../models/room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }
  list(): Observable<Room[]> { // Esto es como una promesa
    return this.http.get<Room[]>(`${environment.url_ms_negocio}/room`);
  }
  delete(id:number){
    return this.http.delete<Room>(`${environment.url_ms_negocio}/room/${id}`);
  }
  view(id:number):Observable<Room> {
    return this.http.get<Room>(`${environment.url_ms_negocio}/room/${id}`);
  }
  create(newRoom: Room): Observable<Room> {
    return this.http.post<Room>(`${environment.url_ms_negocio}/room`, newRoom);
  }
  update(theRoom: Room): Observable<Room> {
    return this.http.put<Room>(`${environment.url_ms_negocio}/room/${theRoom.id}`, theRoom);
  }
}
