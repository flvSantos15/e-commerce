import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  sellerRoutes: string[] = ['/seller', '/seller-home', '/add-product'];

  constructor(private router: Router, private authService: AuthService) {
    this.cartItemCount = 0;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        const sellerStorage = localStorage.getItem('seller');
        if (sellerStorage && this.sellerRoutes.includes(event.url)) {
          let sellerData = JSON.parse(sellerStorage);
          this.sellerName = sellerData.name;

          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['seller'], { queryParams: { showLogin: true } });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
