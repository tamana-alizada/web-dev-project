# 🍰 SweetSaver

> **Save food. Save money. Taste the difference.**

SweetSaver is a full-stack multi-vendor web platform designed to **reduce food waste** by connecting bakeries and dessert shops with customers looking for **discounted leftover products**. Shops post unsold items at reduced prices toward the end of the day, and customers can browse, reserve, and pick up their orders before a specified deadline.

---

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Frontend Structure](#-frontend-structure)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Team Members](#-team-members)

---

## 📝 Project Description

SweetSaver is a multi-vendor web platform where bakeries and dessert shops can upload their unsold or leftover products at discounted prices, especially towards the end of the day. Customers can browse available offers, reserve items directly through the application, and collect them from the store before the specified pickup deadline.

The system supports **multiple shops**, each managing their own products and offers independently, while users have personalized accounts where they can track their cart, reservations, and purchase history.

The platform provides a smooth and intuitive user experience through features such as **category-based browsing**, **search functionality**, and **real-time updates** of product availability.

### 🎯 Goal

The main goal of this project is not only to demonstrate modern web development practices (API integration, authentication, component-based UI design), but also to contribute to a meaningful real-world problem — **minimizing food waste** while making quality products more accessible and affordable.

---

## ✨ Key Features

### Customer Features
| Feature | Description |
|---------|-------------|
| **User Registration & Login** | Secure sign-up and sign-in with JWT authentication |
| **Product Discovery** | Browse discounted products with category filtering and search |
| **Shop Browsing** | View shop listings with details, address, and product modals |
| **Shopping Cart** | Add/remove items, update quantities, and view totals |
| **Order Checkout** | Place orders and convert cart items into confirmed orders |
| **Order History** | View past orders with item details and totals on the profile page |
| **Profile Management** | Edit name, phone, city, bio, and upload profile images |
| **Pickup Scheduling** | See pickup time windows for each product |

### Shop Owner Features
| Feature | Description |
|---------|-------------|
| **Owner Dashboard** | Overview of shops count, products count, and orders |
| **Product Management** | Full CRUD — create, edit, delete products with price, stock, images |
| **Order Monitoring** | View all customer orders placed for their products |
| **Availability Control** | Toggle product availability and manage stock levels |

### General Features
| Feature | Description |
|---------|-------------|
| **Role-Based Access** | Customers and Owners have separate dashboards and permissions |
| **Route Guards** | Protected routes with `authGuard` and `ownerGuard` |
| **JWT Token Interceptor** | Automatic Bearer token injection on all API requests |
| **Responsive Landing Page** | Animated, scroll-aware navbar with featured products |
| **Toast Notifications** | User-friendly feedback for all actions (success/error/info) |
| **About Us & Contact Pages** | Static informational pages |

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Angular** | 21.1 | Frontend SPA framework |
| **TypeScript** | ~5.9.2 | Type-safe JavaScript |
| **RxJS** | ~7.8.0 | Reactive programming & HTTP handling |
| **Angular Router** | 21.1 | Client-side routing with lazy navigation |
| **Angular Forms** | 21.1 | Template-driven forms |
| **Vitest** | ^4.0.8 | Unit testing framework |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Python / Django** | 6.0.4 | Backend web framework |
| **Django REST Framework** | 3.17.1 | RESTful API development |
| **SimpleJWT** | 5.5.1 | JWT-based authentication |
| **django-cors-headers** | 4.9.0 | Cross-Origin Resource Sharing |
| **Pillow** | 12.2.0 | Image processing (profile uploads) |
| **SQLite** | — | Development database |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                    │
│                                                          │
│   Angular 21 SPA                                         │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│   │ Landing  │ │ Discover │ │  Shops   │ │  Cart    │  │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│   │ Sign In  │ │ Sign Up  │ │ Profile  │ │ Owner    │  │
│   │          │ │          │ │          │ │Dashboard │  │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                          │
│   Services: Auth | CartService | ShopService | Owner     │
│   Guards:   authGuard | ownerGuard                       │
│   Interceptor: authInterceptor (JWT Bearer)              │
└──────────────────┬──────────────────────────────────────┘
                   │  HTTP / REST API (JSON)
                   │  JWT Bearer Token
                   ▼
┌──────────────────────────────────────────────────────────┐
│                   SERVER (Django 6.0)                     │
│                                                          │
│   Django REST Framework                                  │
│   ┌───────────┐ ┌───────────┐ ┌──────┐ ┌────────┐      │
│   │ accounts  │ │   shops   │ │ cart │ │ orders │      │
│   │ app       │ │   app     │ │ app  │ │ app    │      │
│   └───────────┘ └───────────┘ └──────┘ └────────┘      │
│                                                          │
│   Auth: SimpleJWT (access + refresh tokens)              │
│   DB:   SQLite (dev) │ Media: profile_images/            │
└──────────────────────────────────────────────────────────┘
```

---

## 🔌 API Endpoints

### Authentication (`/api/auth/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register/` | Register a new user |
| `GET/PATCH` | `/api/auth/profile/` | Get or update user profile |
| `POST` | `/api/token/` | Obtain JWT access + refresh tokens |
| `POST` | `/api/token/refresh/` | Refresh an expired access token |

### Shops & Products (`/api/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/categories/` | List all product categories |
| `GET` | `/api/shops/` | List all shops |
| `GET` | `/api/products/` | List all available products |
| `GET` | `/api/products/featured/` | Get featured products |

### Owner Management (`/api/owner/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/owner/shops/` | List owner's shops |
| `GET/POST` | `/api/owner/products/` | List or create owner products |
| `PATCH/DELETE` | `/api/owner/products/:id/` | Update or delete a product |

### Cart (`/api/cart/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart/` | Get current user's cart |
| `POST` | `/api/cart/` | Add item to cart |
| `PATCH` | `/api/cart/items/:id/` | Update cart item quantity |
| `DELETE` | `/api/cart/items/:id/` | Remove item from cart |

### Orders (`/api/orders/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders/create/` | Create order from cart |
| `GET` | `/api/orders/` | List customer's orders |
| `GET` | `/api/orders/owner/` | List orders for shop owner |

---

## 🗄 Database Models

### User (Custom — extends `AbstractUser`)
- `role` (customer / owner / admin), `phone`, `address`, `full_name`, `city`, `bio`, `profile_image`

### Shop
- `owner` (FK → User), `name`, `description`, `address`, `phone`, `image_url`

### Category
- `name`, `icon`

### Product
- `shop` (FK → Shop), `category` (FK → Category), `title`, `description`, `price`, `old_price`, `stock`, `image_url`, `is_available`, `pickup_start`, `pickup_end`

### Cart / CartItem
- `Cart`: one-to-one with User; `CartItem`: FK → Cart + FK → Product + quantity

### Order / OrderItem
- `Order`: FK → User, `status` (pending/completed/cancelled), `total`
- `OrderItem`: FK → Order + FK → Product, `title`, `price`, `quantity`

---

## 📁 Frontend Structure

```
SweetSaver/src/app/
├── core/
│   └── models.ts              # TypeScript interfaces for all data types
├── data/
│   └── mock-data.ts           # Mock data for offline development
├── services/
│   ├── auth.ts                # Auth service (login, signup, profile, tokens)
│   ├── auth-guard.ts          # Route guard for authenticated users
│   ├── auth.interceptor.ts    # JWT Bearer token interceptor
│   ├── owner-guard.ts         # Route guard for shop owners
│   ├── cart.service.ts        # Cart operations (CRUD, order creation)
│   ├── shop.service.ts        # Shop & product data fetching
│   └── owner.service.ts       # Owner-specific API calls
├── shared/
│   └── toast/                 # Reusable toast notification component
├── component/
│   ├── landing/               # Public landing page with featured products
│   ├── sign-in/               # Login page with role-based redirect
│   ├── sign-up/               # Registration page
│   ├── main/                  # Authenticated layout wrapper
│   ├── home/                  # Home view
│   ├── discover/              # Product browsing with filters & search
│   ├── shops/                 # Shop listing with product modals
│   ├── cart/                  # Shopping cart with checkout
│   ├── profile/               # User profile editing + order history
│   ├── owner-layout/          # Owner dashboard layout
│   ├── owner-dashboard/       # Owner stats overview
│   ├── owner-products/        # Full CRUD product management
│   ├── about-us/              # About Us page
│   ├── contact-us/            # Contact Us page
│   └── careers/               # Careers page
├── app.routes.ts              # All route definitions + guards
├── app.config.ts              # App providers (router, HTTP, interceptors)
└── app.ts                     # Root application component
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v20+) and **npm**
- **Python** (3.12+) and **pip**
- **Angular CLI** (`npm install -g @angular/cli`)

### Backend Setup

```bash
# Navigate to the backend directory
cd SweetSaverBackend/SweetSaverBackend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install Python dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Create a superuser (optional, for admin access)
python manage.py createsuperuser

# Start the backend server
python manage.py runserver
```

The backend will run on `http://127.0.0.1:8000`.

### Frontend Setup

```bash
# Navigate to the frontend directory
cd SweetSaver

# Install Node.js dependencies
npm install

# Start the development server
ng serve
# or
npm start
```

The frontend will run on `http://localhost:4200`.

### Default API Base URLs
| Service | URL |
|---------|-----|
| Frontend | `http://localhost:4200` |
| Backend API | `http://127.0.0.1:8000/api/` |
| Admin Panel | `http://127.0.0.1:8000/admin/` |

---

## 👥 Team Members

| Name | Role |
|------|------|
| **Bali Ehsan** | Full-Stack Developer |
| **Alizada Tamana** | Full-Stack Developer |
| **Azizi Hashmatullah** | Full-Stack Developer |

---

## 📄 License

This project was developed as part of a **Web Development** university course.

---

<p align="center">
  <strong>SweetSaver</strong> — Because every bite deserves a second chance. 🍩
</p>
