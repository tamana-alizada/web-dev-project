import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerProduct, OwnerShop, OwnerOrder } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api';

  getOwnerShops(): Observable<OwnerShop[]> {
    return this.http.get<OwnerShop[]>(`${this.baseUrl}/owner/shops/`);
  }

  getOwnerProducts(): Observable<OwnerProduct[]> {
    return this.http.get<OwnerProduct[]>(`${this.baseUrl}/owner/products/`);
  }

  createOwnerProduct(data: any): Observable<OwnerProduct> {
    return this.http.post<OwnerProduct>(`${this.baseUrl}/owner/products/`, data);
  }

  updateOwnerProduct(productId: number, data: any): Observable<OwnerProduct> {
    return this.http.patch<OwnerProduct>(`${this.baseUrl}/owner/products/${productId}/`, data);
  }

  deleteOwnerProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/owner/products/${productId}/`);
  }

  getOwnerOrders(): Observable<OwnerOrder[]> {
    return this.http.get<OwnerOrder[]>(`${this.baseUrl}/orders/owner/`);
  }
}