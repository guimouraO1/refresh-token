import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class MainService {
    static GENERIC_ERROR = 'internalServerError';

    setupRequestHeader() {
        const token = localStorage.getItem(TokenService.LOCAL_STORAGE_TOKEN_KEY);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
}
