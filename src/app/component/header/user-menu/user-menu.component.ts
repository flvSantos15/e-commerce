import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
  @Input() public userName: string = '';
  @Input() public cartItemCount: number = 0;

  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
