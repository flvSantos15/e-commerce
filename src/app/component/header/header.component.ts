import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public menuType: string = 'default';
  public cartItemCount: number = 0;
  public sellerName: string = '';

  constructor(private router: Router, private sellerService: SellerService) {
    this.cartItemCount = 0;
  }

  ngOnInit(): void {
    this.sellerService.reloadSeller();
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        const seller = localStorage.getItem('seller');
        if (seller && event.url.includes('/seller')) {
          let sellerData = JSON.parse(seller);
          this.sellerName = sellerData.name;

          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  onLogout(): void {
    this.sellerService.logout();
  }
}
