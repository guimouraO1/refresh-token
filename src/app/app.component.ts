import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'refresh-token';
  isUserAuthenticated: boolean = false;

  constructor(private userService: UserService) {
    this.userService.isUserAuthenticated$.subscribe((loggedIn) => {
      this.isUserAuthenticated = loggedIn;
    });
  }
}
