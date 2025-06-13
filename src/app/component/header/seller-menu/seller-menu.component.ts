import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SellerService } from '../../../services/seller.service';

@Component({
  selector: 'app-seller-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seller-menu.component.html',
  styleUrl: './seller-menu.component.css',
})
export class SellerMenuComponent {
  @Input() public sellerName: string = '';
  @Input() public cartItemCount: number = 0;

  constructor(private sellerService: SellerService) {}

  onLogout(): void {
    this.sellerService.logout();
  }
}
