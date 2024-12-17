import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    static GENERIC_ERROR = 'internalServerError';
    static LOCAL_STORAGE_TOKEN_KEY = 'token';
    static LOCAL_STORAGE_REDIRECT_URL_KEY = 'redirectUrl';
    protected MAIN_API_PATH = environment.apiUrl;

    setupRequestHeader() {
        const token = localStorage.getItem('AccessToken');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
}
