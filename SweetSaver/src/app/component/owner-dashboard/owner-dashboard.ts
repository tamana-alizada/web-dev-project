import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-dashboard.html',
  styleUrls: ['./owner-dashboard.css']
})
export class OwnerDashboard implements OnInit {
  private ownerService = inject(OwnerService);
  private auth = inject(Auth);
  private router = inject(Router);

  totalShops = signal(0);
  totalProducts = signal(0);
  totalOrders = signal(0);

  orders = signal<any[]>([]);
  orderRows = signal<any[]>([]);
  loadingOrders = signal(false);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.ownerService.getOwnerShops().subscribe({
      next: (shops) => this.totalShops.set(shops.length),
      error: (err) => console.log(err)
    });

    this.ownerService.getOwnerProducts().subscribe({
      next: (products) => this.totalProducts.set(products.length),
      error: (err) => console.log(err)
    });

    this.loadingOrders.set(true);
    this.ownerService.getOwnerOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.totalOrders.set(orders.length);
        this.orderRows.set(this.flattenOrders(orders));
        this.loadingOrders.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loadingOrders.set(false);
      }
    });
  }

  flattenOrders(orders: any[]): any[] {
    const rows: any[] = [];

    orders.forEach((order) => {
      if (order.items && order.items.length > 0) {
        order.items.forEach((item: any) => {
          rows.push({
            order_id: order.id,
            status: order.status,
            order_total: order.total,
            created_at: order.created_at,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal,
            shop_name: item.shop_name
          });
        });
      }
    });

    return rows;
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('role');
    this.router.navigate(['/sign-in']);
  }
}