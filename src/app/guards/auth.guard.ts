import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const user = tokenService.decodePayloadJWT();

  if(route.routeConfig && user.role.toString().toLowerCase() === route.routeConfig.path) {
    return true;
  }

  router.navigate(['login']);
  return false;
};
