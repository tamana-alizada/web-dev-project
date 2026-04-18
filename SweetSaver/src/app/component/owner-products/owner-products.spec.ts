import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerProducts } from './owner-products';

describe('OwnerProducts', () => {
  let component: OwnerProducts;
  let fixture: ComponentFixture<OwnerProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
