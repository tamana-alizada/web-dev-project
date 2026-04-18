import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OwnerService } from '../../services/owner.service';
import { ShopService } from '../../services/shop.service';
import { OwnerProduct, OwnerShop, Category } from '../../core/models';
import { Toast } from '../../shared/toast/toast';

@Component({
  selector: 'app-owner-products',
  standalone: true,
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './owner-products.html',
  styleUrls: ['./owner-products.css']
})
export class OwnerProductsComponent implements OnInit {
  private ownerService = inject(OwnerService);
  private shopService = inject(ShopService);

  products = signal<OwnerProduct[]>([]);
  shops = signal<OwnerShop[]>([]);
  categories = signal<Category[]>([]);

  loadingProducts = signal(false);
  loadingFormData = signal(false);
  submitting = signal(false);

  isEditing = signal(false);
  editingProductId = signal<number | null>(null);

  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('info');

  form = signal({
    shop: '',
    category: '',
    title: '',
    description: '',
    price: '',
    old_price: '',
    stock: '',
    image_url: '',
    is_available: true,
    pickup_start: '',
    pickup_end: ''
  });

  totalProducts = computed(() => this.products().length);
  availableProducts = computed(() => this.products().filter(product => product.is_available).length);
  lowStockProducts = computed(() => this.products().filter(product => product.stock <= 5).length);

  ngOnInit(): void {
    this.loadProducts();
    this.loadShops();
    this.loadCategories();
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);

    setTimeout(() => {
      this.toastMessage.set('');
    }, 2500);
  }

  loadProducts(): void {
    this.loadingProducts.set(true);

    this.ownerService.getOwnerProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loadingProducts.set(false);
      },
      error: () => {
        this.loadingProducts.set(false);
        this.showToast('Failed to load products.', 'error');
      }
    });
  }

  loadShops(): void {
    this.loadingFormData.set(true);

    this.ownerService.getOwnerShops().subscribe({
      next: (data) => {
        this.shops.set(data);
        this.loadingFormData.set(false);
      },
      error: () => {
        this.loadingFormData.set(false);
        this.showToast('Failed to load shops.', 'error');
      }
    });
  }

  loadCategories(): void {
    this.shopService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: () => this.showToast('Failed to load categories.', 'error')
    });
  }

  resetForm(): void {
    this.form.set({
      shop: '',
      category: '',
      title: '',
      description: '',
      price: '',
      old_price: '',
      stock: '',
      image_url: '',
      is_available: true,
      pickup_start: '',
      pickup_end: ''
    });
    this.isEditing.set(false);
    this.editingProductId.set(null);
  }

  editProduct(product: OwnerProduct): void {
    this.form.set({
      shop: String(product.shop),
      category: String(product.category),
      title: product.title,
      description: product.description,
      price: String(product.price),
      old_price: String(product.old_price ?? ''),
      stock: String(product.stock),
      image_url: product.image_url,
      is_available: product.is_available,
      pickup_start: product.pickup_start || '',
      pickup_end: product.pickup_end || ''
    });

    this.isEditing.set(true);
    this.editingProductId.set(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  saveProduct(): void {
    if (!this.isFormValid()) {
      this.showToast('Please fill all required fields correctly.', 'error');
      return;
    }

    const f = this.form();

    const payload = {
      shop: Number(f.shop),
      category: Number(f.category),
      title: f.title.trim(),
      description: f.description.trim(),
      price: Number(f.price),
      old_price: f.old_price ? Number(f.old_price) : null,
      stock: Number(f.stock),
      image_url: f.image_url.trim(),
      is_available: f.is_available,
      pickup_start: f.pickup_start || null,
      pickup_end: f.pickup_end || null
    };

    this.submitting.set(true);

    if (this.isEditing() && this.editingProductId()) {
      this.ownerService.updateOwnerProduct(this.editingProductId()!, payload).subscribe({
        next: () => {
          this.submitting.set(false);
          this.showToast('Product updated successfully!', 'success');
          this.resetForm();
          this.loadProducts();
        },
        error: () => {
          this.submitting.set(false);
          this.showToast('Failed to update product.', 'error');
        }
      });
    } else {
      this.ownerService.createOwnerProduct(payload).subscribe({
        next: () => {
          this.submitting.set(false);
          this.showToast('Product created successfully!', 'success');
          this.resetForm();
          this.loadProducts();
        },
        error: () => {
          this.submitting.set(false);
          this.showToast('Failed to create product.', 'error');
        }
      });
    }
  }

  deleteProduct(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    this.ownerService.deleteOwnerProduct(id).subscribe({
      next: () => {
        this.showToast('Product deleted successfully!', 'success');
        this.loadProducts();
      },
      error: () => this.showToast('Failed to delete product.', 'error')
    });
  }

  updateFormField(field: string, value: any): void {
    this.form.set({
      ...this.form(),
      [field]: value
    });
  }

  isFormValid(): boolean {
    const f = this.form();

    return !!(
      f.shop &&
      f.category &&
      f.title.trim() &&
      f.description.trim() &&
      f.price !== '' &&
      Number(f.price) >= 0 &&
      f.stock !== '' &&
      Number(f.stock) >= 0 &&
      f.image_url.trim()
    );
  }
}
