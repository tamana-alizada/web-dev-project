export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Product {
  title: string;
  description: string;
  shop_name: string;
  category: number;
  category_name: string;
  image_url: string;
  price: number;
  old_price?: number;
  stock: number;
  is_available: boolean;
}

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Cakes', icon: '🎂' },
  { id: 2, name: 'Pastries', icon: '🥐' },
  { id: 3, name: 'Cookies', icon: '🍪' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    title: 'Chocolate layer cake slice',
    description: 'Rich ganache, end-of-day surplus from the downtown bakery.',
    shop_name: 'Rosewood Bakery',
    category: 1,
    category_name: 'Cakes',
    image_url: 'https://images.unsplash.com/photo-1578985545062-69931badd9dd?w=600&q=80&auto=format&fit=crop',
    price: 4.5,
    old_price: 8,
    stock: 3,
    is_available: true,
  },
  {
    title: 'Butter croissants (2 pack)',
    description: 'Flaky morning batch — reserve for evening pickup.',
    shop_name: 'La Lune Patisserie',
    category: 2,
    category_name: 'Pastries',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop',
    price: 3,
    old_price: 5.5,
    stock: 0,
    is_available: false,
  },
  {
    title: 'Cookie assortment box',
    description: 'Mixed cookies from today’s bake.',
    shop_name: 'SweetStop',
    category: 3,
    category_name: 'Cookies',
    image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop',
    price: 6,
    stock: 5,
    is_available: true,
  },
];
