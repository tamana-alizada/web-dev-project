import { Category, Product, Shop } from '../core/models';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Desserts',
    icon: '🍰'
  },
  {
    id: 2,
    name: 'Breakfast',
    icon: '🥞'
  },
  {
    id: 3,
    name: 'Snacks',
    icon: '🥪'
  },
  {
    id: 4,
    name: 'Meals',
    icon: '🍕'
  },
  {
    id: 5,
    name: 'Bakery',
    icon: '🍞'
  },
  {
    id: 6,
    name: 'Drinks',
    icon: '🥤'
  }
];

export const MOCK_SHOPS: Shop[] = [
  {
    id: 1,
    name: 'Sweet Bakery',
    description: 'Fresh cakes, cookies, and bakery items.',
    address: 'Alexanderplatz, Berlin',
    phone: '+49 111 222 333',
    image_url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Morning Bite',
    description: 'Breakfast and brunch with fresh ingredients.',
    address: 'Potsdamer Platz, Berlin',
    phone: '+49 444 555 666',
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Snack Hub',
    description: 'Tasty snacks and quick meals.',
    address: 'Zoo Station, Berlin',
    phone: '+49 777 888 999',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    shop: 1,
    shop_name: 'Sweet Bakery',
    category: 1,
    category_name: 'Desserts',
    title: 'Chocolate Cake',
    description: 'Rich chocolate cake with creamy frosting.',
    price: 5.99,
    old_price: 9.99,
    stock: 12,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    created_at: '2026-04-08T10:00:00Z'
  },
  {
    id: 2,
    shop: 1,
    shop_name: 'Sweet Bakery',
    category: 5,
    category_name: 'Bakery',
    title: 'Butter Croissant',
    description: 'Fresh and flaky croissant, baked this morning.',
    price: 2.49,
    old_price: 3.49,
    stock: 12,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxKaE28aL8rqnPHJ_4au3s0Ud35wJiAmMwUQ&s',
    is_available: true,
    created_at: '2026-04-08T10:05:00Z'
  },
  {
    id: 3,
    shop: 2,
    shop_name: 'Morning Bite',
    category: 2,
    category_name: 'Breakfast',
    title: 'Pancake Box',
    description: 'Mini pancakes with honey and berries.',
    price: 4.99,
    old_price: 7.99,
    stock: 10,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFeo9fgUJRdfnuLG673gVCTOc5zoupqZVVw&s',
    is_available: true,
    created_at: '2026-04-08T10:10:00Z'
  },
  {
    id: 4,
    shop: 2,
    shop_name: 'Morning Bite',
    category: 6,
    category_name: 'Drinks',
    title: 'Fresh Orange Juice',
    description: 'Cold and refreshing fresh orange juice.',
    price: 3.25,
    old_price: 4.50,
    stock: 15,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH0bb9JpJVPqbbE7Kl6oqACI2zrU_yX8oN2w&s',
    is_available: true,
    created_at: '2026-04-08T10:15:00Z'
  },
  {
    id: 5,
    shop: 3,
    shop_name: 'Snack Hub',
    category: 3,
    category_name: 'Snacks',
    title: 'Club Sandwich',
    description: 'Chicken sandwich with lettuce and cheese.',
    price: 6.49,
    old_price: 8.99,
    stock: 7,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    created_at: '2026-04-08T10:20:00Z'
  },
  {
    id: 6,
    shop: 3,
    shop_name: 'Snack Hub',
    category: 4,
    category_name: 'Meals',
    title: 'Mini Pizza Box',
    description: 'Warm mini pizza slices with vegetables and cheese.',
    price: 7.99,
    old_price: 11.99,
    stock: 5,
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    created_at: '2026-04-08T10:25:00Z'
  },
  {
    id: 7,
    shop: 1,
    shop_name: 'Sweet Bakery',
    category: 1,
    category_name: 'Desserts',
    title: 'Strawberry Donut',
    description: 'Soft donut with strawberry glaze.',
    price: 2.99,
    old_price: 4.25,
    stock: 20,
    image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    created_at: '2026-04-08T10:30:00Z'
  },
  {
    id: 8,
    shop: 2,
    shop_name: 'Morning Bite',
    category: 2,
    category_name: 'Breakfast',
    title: 'Breakfast Combo',
    description: 'Eggs, toast, salad, and tea.',
    price: 8.49,
    old_price: 12.00,
    stock: 9,
    image_url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    is_available: true,
    created_at: '2026-04-08T10:35:00Z'
  }
];