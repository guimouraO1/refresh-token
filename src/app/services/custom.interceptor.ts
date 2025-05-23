import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, firstValueFrom, throwError, Observable } from 'rxjs';
import { UserService } from './user.service';
import { TokenService } from './token.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  const token: string | null = localStorage.getItem(TokenService.LOCAL_STORAGE_TOKEN_KEY);

  if (!token) {
    return next(req);
  }

  const clone = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });

  return next(clone).pipe(
    catchError(async (error: HttpErrorResponse) => {
      if (error.status === 401) {
        // const isRefresh = confirm("Your Session is expired. Do you want to Continue?");
        // if (isRefresh) {
          const res = await firstValueFrom(userService.getRefreshToken());
          localStorage.setItem(TokenService.LOCAL_STORAGE_TOKEN_KEY, res.token);
        // }
        window.location.reload();
      }

      return throwError(() => error);
    })
  ) as Observable<any>;
};
