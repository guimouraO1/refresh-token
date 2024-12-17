import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  static LOCAL_STORAGE_TOKEN_KEY = 'AccessToken';

  public getToken(): string {
    return localStorage.getItem(TokenService.LOCAL_STORAGE_TOKEN_KEY) || '';
  }

  public decodePayloadJWT(): User {
      return jwtDecode(this.getToken());
  }
}
