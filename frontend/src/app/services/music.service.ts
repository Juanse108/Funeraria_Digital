import { Injectable } from '@angular/core';
import { Music } from '../models/music.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }
  list(): Observable<Music[]> {
    return this.http.get<Music[]>(`${environment.url_sustentacion}/servicios-muisicales`);
    
  }

  view(id:number):Observable<Music>{
    return this.http.get<Music>(`${environment.url_sustentacion}/servicios-muisicales/${id}`,
    );
  }
  create (newMusic: Music):Observable<Music> {
    return this.http.post<Music>(`${environment.url_sustentacion}/servicios-muisicales`, newMusic);
  }

}
