# 🛒 E-Commerce REST API

A professional RESTful API for an E-Commerce platform built with Node.js, Express.js, and MongoDB.

The API provides authentication, authorization, products, categories, shopping cart, orders, reviews, search, filtering, pagination, sorting, security, and rate limiting.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration
- User login
- JWT authentication
- Protected routes
- Admin authorization
- Role-based access control
- Password hashing with bcryptjs

### 📦 Categories

- Create category
- Get all categories
- Get single category
- Update category
- Delete category
- Admin-only category management

### 🛍️ Products

- Create product
- Get all products
- Get single product
- Update product
- Delete product
- Product search
- Filter by category
- Filter by brand
- Filter by price
- Pagination
- Sorting

### 🛒 Shopping Cart

- Get current user's cart
- Add product to cart
- Update product quantity
- Remove product from cart
- Clear cart

### 📋 Orders

- Create order
- Get user's orders
- Get single user order
- Admin get all orders
- Admin update order status
- Automatic total price calculation
- Stock management
- Cart clearing after order creation

### ⭐ Reviews & Ratings

- Create product review
- Get product reviews
- Update own review
- Delete own review
- Admin delete review
- Rating from 1 to 5
- One review per user per product

### 🛡️ Security

- Helmet
- CORS
- Morgan logging
- Rate limiting
- JWT authentication
- Password hashing
- Global error handling
- 404 handling

---

# 🧰 Technologies

| Technology         | Purpose               |
| ------------------ | --------------------- |
| Node.js            | Runtime               |
| Express.js         | REST API framework    |
| MongoDB            | Database              |
| Mongoose           | MongoDB ODM           |
| JWT                | Authentication        |
| bcryptjs           | Password hashing      |
| Helmet             | Security headers      |
| CORS               | Cross-origin requests |
| Morgan             | HTTP logging          |
| express-rate-limit | Rate limiting         |
| Postman            | API testing           |
| Nodemon            | Development           |

---

# 📁 Project Structure

```text
E-Commerce REST API/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── reviewController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── notFound.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── Review.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── reviewRoutes.js
│   │
│   └── utils/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```
