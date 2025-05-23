import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ResponseToken } from '../../models/response-token.model';
import { TokenService } from '../../services/token.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})

export class LoginComponent {
  loginForm: FormGroup;
  userService =  inject(UserService);
  router = inject(Router);
  tokenService = inject(TokenService);

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  async onSubmit() {
    const res: ResponseToken = await firstValueFrom(this.userService.onLogin(this.loginForm.value));

    localStorage.setItem(TokenService.LOCAL_STORAGE_TOKEN_KEY, res.token);
    const user: User = this.tokenService.decodePayloadJWT();
    this.userService.isUserAuthenticated.next(true);
    this.router.navigate([user.role.toString().toLowerCase(), 'dashboard']);
  }
}
