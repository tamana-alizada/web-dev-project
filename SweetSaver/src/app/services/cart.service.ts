import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CartResponse, Order } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api';

  cartCount = signal(0);

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.baseUrl}/cart/`).pipe(
      tap((cart) => {
        const count = cart.items.reduce(
          (sum, item) => sum + Number(item.quantity),
          0
        );
        this.cartCount.set(count);
      })
    );
  }

  addToCart(productId: number, quantity: number = 1): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.baseUrl}/cart/`, {
      product_id: productId,
      quantity
    }).pipe(
      tap((cart) => {
        const count = cart.items.reduce(
          (sum, item) => sum + Number(item.quantity),
          0
        );
        this.cartCount.set(count);
      })
    );
  }

  updateCartItemQuantity(itemId: number, quantity: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/cart/items/${itemId}/`, {
      quantity
    });
  }

  removeCartItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/items/${itemId}/`);
  }

  createOrder(): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/create/`, {});
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/`);
  }

  refreshCartCount(): void {
    this.getCart().subscribe({
      error: (err) => {
        console.log(err);
        this.cartCount.set(0);
      }
    });
  }
}