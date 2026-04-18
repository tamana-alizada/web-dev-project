import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerService } from '../../services/owner.service';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-dashboard.html',
  styleUrls: ['./owner-dashboard.css']
})
export class OwnerDashboard implements OnInit {
  private ownerService = inject(OwnerService);

  totalShops = signal(0);
  totalProducts = signal(0);
  totalOrders = signal(0);

  ngOnInit(): void {
    this.ownerService.getOwnerShops().subscribe({
      next: (shops) => this.totalShops.set(shops.length)
    });

    this.ownerService.getOwnerProducts().subscribe({
      next: (products) => this.totalProducts.set(products.length)
    });

    this.ownerService.getOwnerOrders().subscribe({
      next: (orders) => this.totalOrders.set(orders.length)
    });
  }
}