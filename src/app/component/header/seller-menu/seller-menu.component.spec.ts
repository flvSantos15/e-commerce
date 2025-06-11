import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerMenuComponent } from './seller-menu.component';

describe('SellerMenuComponent', () => {
  let component: SellerMenuComponent;
  let fixture: ComponentFixture<SellerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
