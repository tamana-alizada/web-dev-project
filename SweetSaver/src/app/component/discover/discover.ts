import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, Product } from '../../core/models';
import { Router, RouterLink } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { Auth } from '../../services/auth';
import { CartService } from '../../services/cart.service';
import { Toast } from '../../shared/toast/toast';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './discover.html',
  styleUrls: ['./discover.css']
})
export class Discover implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);
  private shopService = inject(ShopService);
  private auth = inject(Auth);

  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);

  selectedCategoryId = signal<number | null>(null);
  searchText = signal('');

  loading = signal(true);
  errorMessage = signal('');

  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('info');

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);

    setTimeout(() => {
      this.toastMessage.set('');
    }, 2500);
  }

  loadCategories(): void {
    this.shopService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.set('Failed to load categories.');
        this.showToast('Failed to load categories.', 'error');
      }
    });
  }

  loadProducts(): void {
    this.shopService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.filteredProducts.set(data);
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

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId.set(categoryId);
    this.applyFilters();
  }

  onSearchChange(value: string): void {
    this.searchText.set(value);
    this.applyFilters();
  }

  applyFilters(): void {
    const selectedId = this.selectedCategoryId();
    const text = this.searchText().toLowerCase().trim();

    const filtered = this.products().filter((product) => {
      const matchesCategory =
        selectedId === null || product.category === selectedId;

      const matchesSearch =
        product.title.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text) ||
        product.shop_name.toLowerCase().includes(text) ||
        product.category_name.toLowerCase().includes(text);

      return matchesCategory && matchesSearch;
    });

    this.filteredProducts.set(filtered);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/sign-in']);
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