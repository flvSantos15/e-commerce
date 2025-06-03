import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {
    this.cartItemCount = 0;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        const seller = localStorage.getItem('seller');
        if (seller && event.url.includes('/seller')) {
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
    console.log(this.menuType);
  }
}
