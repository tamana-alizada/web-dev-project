import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, Product } from '../core/models';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../data/mock-data';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discover.html',
  styleUrls: ['./discover.css']
})
export class Discover implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];

  selectedCategoryId: number | null = null;
  searchText: string = '';

  ngOnInit(): void {
    this.categories = MOCK_CATEGORIES;
    this.products = MOCK_PRODUCTS;
    this.filteredProducts = MOCK_PRODUCTS;
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory =
        this.selectedCategoryId === null || product.category === this.selectedCategoryId;

      const text = this.searchText.toLowerCase().trim();

      const matchesSearch =
        product.title.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text) ||
        product.shop_name.toLowerCase().includes(text) ||
        product.category_name.toLowerCase().includes(text);

      return matchesCategory && matchesSearch;
    });
  }
}