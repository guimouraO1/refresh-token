import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseToken } from '../models/response-token.model';
import { MainService } from './main.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mainService = inject(MainService);
  private http = inject(HttpClient);
  isUserAuthenticated = new BehaviorSubject<boolean>(false);
  public isUserAuthenticated$ = this.isUserAuthenticated.asObservable();

  onLogin(loginForm: any) {
    return this.http.post<ResponseToken>(`${environment.apiUrl}/auth/session`, loginForm, {withCredentials: true});
  }

  endSession() {
    return this.http.post(`${environment.apiUrl}/auth/end-session`, {withCredentials: true});
  }

  getRefreshToken() {
    return this.http.patch<ResponseToken>(`${environment.apiUrl}/token/refresh`, {}, {withCredentials: true});
  }

  getMe() {
    const headers = this.mainService.setupRequestHeader();

    return this.http.get<User>(`${environment.apiUrl}/user`, {headers});
  }
}
