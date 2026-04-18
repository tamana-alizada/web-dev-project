import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../core/models';
import { CartService } from '../../services/cart.service';
import { Toast } from '../../shared/toast/toast';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Toast],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  private cartService = inject(CartService);

  items = signal<CartItem[]>([]);
  total = signal(0);
  loading = signal(true);

  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('info');

  ngOnInit(): void {
    this.loadCart();
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage.set(message);
    this.toastType.set(type);

    setTimeout(() => {
      this.toastMessage.set('');
    }, 2500);
  }

  loadCart(): void {
    this.loading.set(true);

    this.cartService.getCart().subscribe({
      next: (cart) => {
        const normalizedItems = cart.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          subtotal: Number(item.subtotal),
          product: {
            ...item.product,
            price: Number(item.product.price)
          }
        }));

        this.items.set(normalizedItems);
        this.total.set(Number(cart.total));
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.showToast('Failed to load cart.', 'error');
        this.loading.set(false);
      }
    });
  }

  increase(item: CartItem): void {
    const newQuantity = item.quantity + 1;
    this.updateQuantity(item, newQuantity);
  }

  decrease(item: CartItem): void {
    if (item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;
    this.updateQuantity(item, newQuantity);
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) return;

    this.cartService.updateCartItemQuantity(item.id, newQuantity).subscribe({
      next: () => {
        const updatedItems = this.items().map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: newQuantity,
              subtotal: Number((newQuantity * Number(cartItem.product.price)).toFixed(2))
            };
          }
          return cartItem;
        });

        this.items.set(updatedItems);

        const updatedTotal = Number(
          updatedItems.reduce(
            (sum, cartItem) => sum + Number(cartItem.subtotal),
            0
          ).toFixed(2)
        );

        this.total.set(updatedTotal);
        this.cartService.refreshCartCount();
      },
      error: (err) => {
        console.log(err);
        this.showToast('Failed to update quantity.', 'error');
        this.loadCart();
      }
    });
  }

  onQuantityInputChange(item: CartItem, value: string): void {
    const newQuantity = Number(value);

    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
      this.loadCart();
      return;
    }

    this.updateQuantity(item, newQuantity);
  }

  removeItem(itemId: number): void {
    this.cartService.removeCartItem(itemId).subscribe({
      next: () => {
        const updatedItems = this.items().filter(item => item.id !== itemId);
        this.items.set(updatedItems);

        const updatedTotal = Number(
          updatedItems.reduce(
            (sum, item) => sum + Number(item.subtotal),
            0
          ).toFixed(2)
        );

        this.total.set(updatedTotal);

        this.cartService.refreshCartCount();
        this.showToast('Item removed from cart.', 'success');
      },
      error: (err) => {
        console.log(err);
        this.showToast('Failed to remove item.', 'error');
      }
    });
  }

  getTotal(): number {
    return this.total();
  }

  checkout(): void {
    this.cartService.createOrder().subscribe({
      next: () => {
        this.cartService.refreshCartCount();
        this.showToast('Order created successfully!', 'success');
        this.loadCart();
      },
      error: (err) => {
        console.log(err);
        this.showToast('Checkout failed.', 'error');
      }
    });
  }
}