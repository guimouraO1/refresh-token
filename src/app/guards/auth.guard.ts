import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const user = tokenService.decodePayloadJWT();
  const userService = inject(UserService);

  if(route.routeConfig && user.role.toString().toLowerCase() === route.routeConfig.path) {
    userService.isUserAuthenticated.next(true);
    return true;
  }

  userService.isUserAuthenticated.next(false);
  router.navigate(['login']);
  return false;
};
