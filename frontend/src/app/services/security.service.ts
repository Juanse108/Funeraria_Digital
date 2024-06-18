import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  theUser = new BehaviorSubject<User>(new User());
  
  constructor(private http: HttpClient, private router: Router) { 
    this.verifyActualSession()

  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.url_ms_security}/api/public/security/login`, user, { responseType: 'text' as 'json' });
  }

  tfa(userId: string, token: string): Observable<any> {
    return this.http.put<any>(`${environment.url_ms_security}/api/public/security/secondauth/${userId}`, token);
  }

  saveSession(dataSesion: any) {
    let data: User = {
      _id: dataSesion["user"]["_id"],
      name: dataSesion["user"]["name"],
      email: dataSesion["user"]["email"],
      password: "",
      role: dataSesion ["user"]["role"],
      token: dataSesion["token"]
    };
    localStorage.setItem('sesion', JSON.stringify(data));
    this.setUser(data);
  }

  setUser(user: User) {
    this.theUser.next(user);
  }

  getUser() {
    return this.theUser.asObservable();
  }

  get activeUserSession(): User {
    return this.theUser.value;
  }

  logout() {
    localStorage.removeItem('sesion');
    this.setUser(new User());
  }

  verifyActualSession() {
    let actualSesion = this.getSessionData();
    if (actualSesion) {
      this.setUser(JSON.parse(actualSesion));
    }
  }

  existSession(): boolean {
    let sesionActual = this.getSessionData();
    return (sesionActual) ? true : false;
  }

  getSessionData() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }
}
