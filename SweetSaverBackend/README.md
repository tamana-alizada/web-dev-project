🍰 SweetSaver Backend (Django + DRF)
📌 Overview

SweetSaver is a multi-vendor platform that helps reduce food waste by allowing bakeries and dessert shops to sell leftover items at discounted prices.

This backend is built using Django and Django REST Framework (DRF) and provides APIs for authentication, shops, products, cart management, and orders.

Each user has their own account, cart, and purchase history, while shop owners can manage their own shops and products.

🏗️ Project Structure

SweetSaverBackend/

accounts/ → User authentication & profile
cart/ → Cart & cart items
orders/ → Orders / purchases
shops/ → Shops & products
sweetsaver/ → Main project settings
media/ → Uploaded images (profile, product, etc.)
db.sqlite3 → Database
manage.py
requirements.txt
⚙️ Technologies Used
Django
Django REST Framework (DRF)
JWT Authentication (SimpleJWT)
SQLite (can be changed to PostgreSQL)
django-cors-headers
🚀 Features
👤 Accounts (accounts/)
User registration & login
JWT authentication
User profile (with image support)
🏪 Shops (shops/)
Multiple shops support
Each shop belongs to an owner
Shop information (name, description, etc.)
📦 Products (shops/)
Products belong to shops
Category-based structure
CRUD operations for products
🛒 Cart (cart/)
Each user has their own cart
Add/remove/update products
Calculate total price
📑 Orders (orders/)
Create orders from cart
Store purchase history
Link orders to users
🔐 Authentication (JWT)

Endpoints:

POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/refresh/

Usage:
Authorization: Bearer <access_token>

📡 API Endpoints
Accounts
POST /api/auth/register/
POST /api/auth/login/
GET /api/profile/
Shops
GET /api/shops/
GET /api/shops/{id}/
POST /api/shops/ (owner only)
Products
GET /api/products/
GET /api/products/{id}/
POST /api/products/ (owner only)
PUT /api/products/{id}/
DELETE /api/products/{id}/
Cart
GET /api/cart/
POST /api/cart/add/
POST /api/cart/remove/
Orders
POST /api/orders/create/
GET /api/orders/
🧪 Requirements Coverage (Course)

This backend satisfies the project requirements:

✔️ 4+ Models (User, Shop, Product, Cart, Order)
✔️ ForeignKey relationships (User → Shop, Shop → Product, etc.)
✔️ Serializers (Serializer + ModelSerializer)
✔️ Function-Based Views (FBV)
✔️ Class-Based Views (APIView)
✔️ JWT Authentication implemented
✔️ CRUD operations for products
✔️ Data linked to authenticated user (request.user)
✔️ CORS configured for Angular frontend
⚙️ Setup Instructions
Clone repository
git clone https://github.com/your-username/web-dev-project.git

cd SweetSaverBackend
Create virtual environment
python -m venv venv
venv\Scripts\activate (Windows)
source venv/bin/activate (Mac/Linux)
Install dependencies
pip install -r requirements.txt
Apply migrations
python manage.py makemigrations
python manage.py migrate
Create superuser
python manage.py createsuperuser
Run server
python manage.py runserver

Server runs at:
http://127.0.0.1:8000/

🌐 CORS Configuration

In settings.py:

CORS_ALLOW_ALL_ORIGINS = True

📂 Media Files

Uploaded images are stored in:
/media/

📌 Notes
Each user has a separate cart and order history
Shop owners can only manage their own shops/products
Authentication is required for protected endpoints
API is designed to be consumed by Angular frontend
