import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shop, Product } from '../../core/models';
import { ShopService } from '../../services/shop.service';
import { CartService } from '../../services/cart.service';
import { Toast } from '../../shared/toast/toast';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [CommonModule, Toast],
  templateUrl: './shops.html',
  styleUrl: './shops.css',
})
export class Shops implements OnInit {
  private shopService = inject(ShopService);
  private cartService = inject(CartService);

  shops = signal<Shop[]>([]);
  products = signal<Product[]>([]);

  selectedShop = signal<Shop | null>(null);
  selectedShopProducts = signal<Product[]>([]);
  isModalOpen = signal(false);

  loading = signal(true);
  errorMessage = signal('');

  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('info');

  ngOnInit(): void {
    this.loadShops();
    this.loadProducts();
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);

    setTimeout(() => {
      this.toastMessage.set('');
    }, 2500);
  }

  loadShops(): void {
    this.shopService.getShops().subscribe({
      next: (data) => {
        this.shops.set(data);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set('Failed to load shops.');
        this.loading.set(false);
        this.showToast('Failed to load shops.', 'error');
      }
    });
  }

  loadProducts(): void {
    this.shopService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set('Failed to load products.');
        this.loading.set(false);
        this.showToast('Failed to load products.', 'error');
      }
    });
  }

  openShopModal(shop: Shop): void {
    if (this.loading()) return;

    this.selectedShop.set(shop);

    const shopProducts = this.products().filter(
      (product) => product.shop === shop.id
    );

    this.selectedShopProducts.set(shopProducts);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeShopModal(): void {
    this.isModalOpen.set(false);
    this.selectedShop.set(null);
    this.selectedShopProducts.set([]);
    document.body.style.overflow = 'auto';
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        this.showToast('Item added to cart!', 'success');
      },
      error: (err) => {
        console.log(err);
        this.showToast('Failed to add item to cart.', 'error');
      }
    });
  }

  formatTime(time: string): string {
    return time ? time.slice(0, 5) : '';
  }
}