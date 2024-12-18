import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  router = inject(Router);
  userService = inject(UserService);

  async endSession() {
    await firstValueFrom(this.userService.endSession());
    localStorage.removeItem('AccessToken');
    this.userService.isUserAuthenticated.next(false);
    this.router.navigate(['login']);
  }
}
