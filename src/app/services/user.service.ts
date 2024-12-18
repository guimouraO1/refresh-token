import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseToken } from '../models/response-token.model';
import { MainService } from './main.service';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  mainService = inject(MainService)
  http = inject(HttpClient)

  onLogin(loginForm: any) {
    return this.http.post<ResponseToken>(`${environment.apiUrl}/auth/session`, loginForm, {withCredentials: true});
  }

  getRefreshToken() {
    return this.http.patch<ResponseToken>(`${environment.apiUrl}/token/refresh`, {}, {withCredentials: true});
  }

  getMe() {
    const headers = this.mainService.setupRequestHeader();

    return this.http.get<User>(`${environment.apiUrl}/user`, {headers});
  }
}
