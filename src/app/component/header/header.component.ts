import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IProduct } from '../../interfaces/product';
import { AuthService } from '../../services/auth.service';
import { CartItem, CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { SellerMenuComponent } from './seller-menu/seller-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, SellerMenuComponent, UserMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public menuType: string = 'default';
  public cartItemCount: number = 0;
  public sellerName: string = '';
  public userName: string = '';
  public searchResult: IProduct[] = [];
  public privateRoutes: string[] = [
    '/seller',
    '/seller-home',
    '/add-product',
    '/cart',
    '/login',
    '/checkout',
  ];
  public showSearch: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userName = JSON.parse(user).name;

      const cartStorage = this.cartService.getCartStorage();
      if (cartStorage) {
        this.cartItemCount = cartStorage.reduce(
          (count: number, item: CartItem) => count + item.quantity,
          0
        );
      }

      this.cartService.cartEmitter.subscribe((items) => {
        this.cartItemCount = items.reduce(
          (count: number, item: CartItem) => count + item.quantity,
          0
        );
      });
    }

    this.router.events.subscribe((event: any) => {
      if (event.url) {
        const sellerStorage = localStorage.getItem('seller');
        const userStorage = localStorage.getItem('user');

        if (sellerStorage && this.privateRoutes.includes(event.url)) {
          if (!this.privateRoutes.includes(event.url)) {
            this.showSearch = true;
          }
          const sellerData = JSON.parse(sellerStorage);
          this.sellerName = sellerData.name;

          this.menuType = 'seller';
          return;
        }

        if (userStorage) {
          if (!this.privateRoutes.includes(event.url)) {
            this.showSearch = true;
          }
          this.menuType = 'user';
          return;
        }

        if (!userStorage && !sellerStorage) {
          this.cartItemCount = 0;
          this.menuType = 'default';
        }
        this.showSearch = true;
      }
    });
  }

  handleSearchProduct(event: KeyboardEvent): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.productService.searchProduct(searchTerm).subscribe((result) => {
      if (result.length > 5) {
        result.length = length;
      }
      this.searchResult = result;
    });
  }

  handleHideSuggestedSearch() {
    this.searchResult = [];
  }

  handleSubmitSearch(searchTerm: string): void {
    this.router.navigate(['search', searchTerm]);
  }

  redirectToLogin(): void {
    this.router.navigate(['seller'], { queryParams: { showLogin: true } });
  }

  onLogout(): void {
    this.authService.logout();
  }

  handleRedirectToProductDetails(id: string): void {
    this.router.navigate(['details', id]);
  }
}
