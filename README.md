# Multi-Seller E-Commerce Platform

A full-stack e-commerce platform where multiple sellers can create profiles, upload products, and buyers can search, add to cart, and checkout. Built with modern technologies and best practices.

## 🚀 Features

### For Buyers
- **User Authentication**: Secure signup/login with JWT tokens
- **Product Browsing**: Search, filter, and browse products with pagination
- **Product Details**: View detailed product information with images
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout System**: Complete order placement with order tracking
- **Order History**: View all past orders with detailed information
- **Reviews & Ratings**: Leave reviews and ratings for products

### For Sellers
- **Seller Dashboard**: Manage products and orders
- **Product Management**: Create, update, and delete products
- **Image Upload**: Upload multiple product images
- **Order Management**: View and update order statuses
- **Sales Tracking**: Track total sales and product performance

### Technical Features
- **Security**: JWT authentication, bcrypt password hashing, input validation
- **RESTful API**: Well-structured backend API with Express.js
- **Database**: MongoDB with Mongoose ODM
- **State Management**: Redux Toolkit for centralized state
- **Modern UI**: Responsive design with clean, modern styling
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **File Upload**: Image upload with Multer
- **Search & Filter**: Advanced product search and filtering
- **Pagination**: Efficient pagination for product listings

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Modern styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload
- **express-validator** - Input validation

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/multiSellerApp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. Create uploads directory:
```bash
mkdir uploads
```

5. Start the server:
```bash
npm run dev
```

The backend server will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
multiple-seller-ecommerce-store/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── buyerControllers.js
│   │   ├── sellerControllers.js
│   │   ├── productControllers.js
│   │   └── orderControllers.js
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication middleware
│   │   ├── errorHandler.js    # Error handling middleware
│   │   └── upload.js          # File upload middleware
│   ├── models/
│   │   ├── buyer.js
│   │   ├── seller.js
│   │   ├── product.js
│   │   └── order.js
│   ├── routes/
│   │   ├── buyer.js
│   │   ├── seller.js
│   │   ├── product.js
│   │   └── order.js
│   ├── uploads/               # Uploaded images
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── SellerDashboard.jsx
│   │   │   ├── BuyerOrders.jsx
│   │   │   └── AddProduct.jsx
│   │   ├── redux/
│   │   │   ├── slice/
│   │   │   └── store/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/buyer/signUp` - Buyer registration
- `POST /api/buyer/signIn` - Buyer login
- `POST /api/seller/signUp` - Seller registration
- `POST /api/seller/signIn` - Seller login
- `GET /api/buyer/profile` - Get buyer profile (Protected)
- `GET /api/seller/profile` - Get seller profile (Protected)

### Products
- `GET /api/products` - Get all products (with search, filter, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (Protected - Seller)
- `PUT /api/products/:id` - Update product (Protected - Seller)
- `DELETE /api/products/:id` - Delete product (Protected - Seller)
- `GET /api/products/my-products` - Get seller's products (Protected - Seller)
- `POST /api/products/:id/reviews` - Add review (Protected - Buyer)

### Cart
- `GET /api/buyer/cart` - Get cart (Protected - Buyer)
- `POST /api/buyer/cart` - Add to cart (Protected - Buyer)
- `PUT /api/buyer/cart/:productId` - Update cart item (Protected - Buyer)
- `DELETE /api/buyer/cart/:productId` - Remove from cart (Protected - Buyer)

### Orders
- `POST /api/orders` - Create order (Protected - Buyer)
- `GET /api/orders` - Get buyer orders (Protected - Buyer)
- `GET /api/orders/:id` - Get single order (Protected)
- `GET /api/orders/seller/my-orders` - Get seller orders (Protected - Seller)
- `PUT /api/orders/:id/status` - Update order status (Protected - Seller)
- `PUT /api/orders/:id/payment` - Update payment status (Protected - Buyer)

## 🎯 Key Features for Employers

This project demonstrates:

1. **Full-Stack Development**: Complete MERN stack implementation
2. **Authentication & Authorization**: JWT-based secure authentication
3. **RESTful API Design**: Well-structured API endpoints
4. **State Management**: Redux Toolkit for complex state management
5. **Database Design**: MongoDB schema design with relationships
6. **File Upload**: Image upload and management
7. **Error Handling**: Comprehensive error handling
8. **Input Validation**: Server-side and client-side validation
9. **Modern UI/UX**: Responsive, modern design
10. **Code Organization**: Clean, maintainable code structure

## 🚦 Usage

1. **As a Buyer**:
   - Sign up or login as a buyer
   - Browse products, use search and filters
   - View product details
   - Add products to cart
   - Checkout and place orders
   - View order history
   - Leave reviews

2. **As a Seller**:
   - Sign up or login as a seller
   - Access seller dashboard
   - Add new products with images
   - Manage existing products
   - View and manage orders
   - Update order statuses

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- Protected routes and API endpoints
- CORS configuration
- Environment variables for sensitive data

## 📝 Notes

- **⚠️ IMPORTANT: MongoDB must be running before starting the backend**
  - See `MONGODB_SETUP.md` for detailed MongoDB setup instructions
  - The server will start but show clear error messages if MongoDB is not connected
  - All database operations will fail until MongoDB is running
- Update JWT_SECRET in production
- Configure proper CORS settings for production
- Use cloud storage (AWS S3, Cloudinary) for images in production
- Add rate limiting for API endpoints in production
- Implement proper logging in production

## 🤝 Contributing

This is a portfolio project. Feel free to fork and enhance!

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ for demonstrating full-stack development skills**

