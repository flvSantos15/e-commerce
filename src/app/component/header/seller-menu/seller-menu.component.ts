import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SellerService } from '../../../services/seller.service';

@Component({
  selector: 'app-seller-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-menu.component.html',
  styleUrl: './seller-menu.component.css',
})
export class SellerMenuComponent {
  @Input() public sellerName: string = '';

  constructor(private sellerService: SellerService) {}

  onLogout(): void {
    this.sellerService.logout();
  }
}
