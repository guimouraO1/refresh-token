import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class MemberDashboardComponent implements OnInit {
  userService = inject(UserService);
  user: User | undefined;

  async ngOnInit() {
    this.user = await firstValueFrom(this.userService.getMe());
  }
}
