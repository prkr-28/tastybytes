# 🍽️ TastyBites - Food Delivery App

A modern, responsive food delivery application built with React.js that allows users to browse restaurants, view menus, and manage their cart with a beautiful user interface.

![TastyBites](https://www.svgrepo.com/show/490737/food-dish.svg)

## ✨ Features

- **🏠 Restaurant Discovery**: Browse through a curated list of restaurants
- **🔍 Smart Search**: Search restaurants by name with real-time filtering
- **⭐ Top Rated Filter**: Filter restaurants by rating (4.5+)
- **🥬 Veg/Non-Veg Labels**: Clear visual indicators for vegetarian restaurants
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🛒 Shopping Cart**: Add items to cart with Redux state management
- **🔐 Authentication**: Secure login/logout with Auth0
- **🌐 Online Status**: Real-time network connectivity detection
- **⚡ Performance Optimized**: Lazy loading and shimmer effects for smooth UX
- **🎨 Modern UI**: Built with Tailwind CSS for a sleek, modern interface

## 🚀 Tech Stack

- **Frontend**: React 19.1.0 with Vite
- **Routing**: React Router DOM 7.6.0
- **State Management**: Redux Toolkit & React Redux
- **Styling**: Tailwind CSS 4.1.7
- **Authentication**: JWT with MongoDB
- **Icons**: Font Awesome & React Icons
- **Build Tool**: Vite 6.3.5
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Payment**: Stripe Integration
- **API**: Custom REST API + Swiggy API integration

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/foodapk.git
   cd foodapk
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory for frontend:

   ```env
   # API Configuration
   VITE_API_URL=http://localhost:5000/api
   ```

   The backend `.env` file is already configured with default values.

4. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

5. **Start MongoDB**

   Make sure MongoDB is running on your system:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu
   sudo systemctl start mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

6. **Start the backend server**

   ```bash
   cd server
   npm run dev
   ```

7. **Start the frontend development server**

   ```bash
   cd .. # Go back to root directory
   npm run dev
   ```

8. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
foodapk/
├── public/                 # Static assets
├── server/                 # Backend API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── src/
│   ├── assets/            # Images and other assets
│   ├── components/        # React components
│   │   ├── header.jsx     # Navigation header
│   │   ├── body.jsx       # Main restaurant listing
│   │   ├── footer.jsx     # Footer component
│   │   ├── cart.jsx       # Shopping cart
│   │   ├── about.jsx      # About page
│   │   ├── contact.jsx    # Contact page
│   │   ├── Restrocards.jsx # Restaurant card component
│   │   ├── resmenu.jsx    # Restaurant menu
│   │   ├── shimmer.jsx    # Loading skeleton
│   │   ├── popup.jsx      # Modal component
│   │   ├── auth/          # Authentication components
│   │   ├── payment/       # Payment components
│   │   └── orders/        # Order components
│   ├── utils/             # Utility functions and hooks
│   │   ├── appStore.jsx   # Redux store configuration
│   │   ├── cartSlice.jsx  # Cart state management
│   │   ├── useOnlinestatus.jsx # Network status hook
│   │   └── useRestromenu.jsx   # Restaurant menu hook
│   ├── lib/               # API and utility libraries
│   │   └── api.js         # API client
│   ├── contexts/          # React contexts
│   │   └── AuthContext.jsx # Authentication context
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## 🎯 Key Components

### Header Component

- **Navigation**: Home, About, Contact, Cart, Orders links
- **Authentication**: Login/Logout with JWT
- **Cart Counter**: Real-time cart item count
- **User Profile**: Display authenticated user information

### Body Component

- **Restaurant Grid**: Responsive restaurant card layout
- **Search Functionality**: Real-time restaurant search
- **Rating Filter**: Filter top-rated restaurants
- **Loading States**: Shimmer effect during data fetch
- **Network Detection**: Offline status handling

### Cart Component

- **Authentication Required**: Login required for checkout
- **Add/Remove Items**: Full cart management
- **Persistent State**: Redux-based state management
- **Checkout Process**: Complete order placement with payment

### Order Management

- **Order History**: View past orders with status tracking
- **Real-time Updates**: Order status updates
- **Payment Integration**: Stripe payment processing
- **Order Cancellation**: Cancel pending orders
## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start backend server
cd server && npm start

# Start backend in development mode
cd server && npm run dev

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🌐 API Integration

The app integrates with:

- **Custom REST API**: Built with Express.js and MongoDB
- **Swiggy API**: For restaurant data and menus (proxied through Vite)
- **Stripe API**: For payment processing
- **JWT Authentication**: Secure user authentication

## 🗄️ Database Schema

### Users Collection
- User profile information
- Authentication credentials
- Delivery addresses

### Orders Collection
- Order details and items
- Delivery information
- Payment and order status
- Timestamps and tracking

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get specific order
- `PATCH /api/orders/:id/cancel` - Cancel order

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook
## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🔐 Authentication Flow

1. User registers/logs in with email and password
2. Server validates credentials and returns JWT token
3. Token is stored in localStorage
4. Token is sent with API requests for authentication
5. Protected routes and features require valid token

## 🛍️ Cart Functionality

- Add items from restaurant menus
- View cart items with quantity and pricing
- Remove items from cart
- Checkout process (requires login)
- Persistent state using Redux
- Complete order placement with payment

## 💳 Payment Processing

- **Stripe Integration**: Secure payment processing
- **Multiple Payment Methods**: Card payments and Cash on Delivery
- **Payment Confirmation**: Real-time payment status updates
- **Order Tracking**: Complete order lifecycle management
## 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface
- **Loading States**: Shimmer effects for better perceived performance
- **Hover Effects**: Interactive elements with smooth transitions
- **Error Handling**: Graceful error states and network status
- **Toast Notifications**: User feedback for actions

## 🚀 Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Code Splitting**: Optimized bundle sizes
- **Shimmer UI**: Better loading experience
- **Memoization**: Optimized re-renders
- **Image Optimization**: Efficient asset loading
- **API Caching**: Efficient data fetching
- **Database Indexing**: Optimized queries

## 🔧 Development Setup

### Frontend Development
```bash
npm run dev
```

### Backend Development
```bash
cd server
npm run dev
```

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in server/.env
3. The application will create collections automatically

### Payment Setup
1. Create a Stripe account
2. Get your API keys from Stripe Dashboard
3. Update `STRIPE_SECRET_KEY` in server/.env
4. Configure webhook endpoints for production
## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Priyanshu Kumar**

- GitHub: [@prkr-28](https://github.com/prkr-28)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/prkr28)

## 🙏 Acknowledgments

- [Swiggy](https://swiggy.com) for the restaurant data API
- [Stripe](https://stripe.com) for payment processing
- [MongoDB](https://mongodb.com) for the database
- [Tailwind CSS](https://tailwindcss.com) for the beautiful styling
- [React](https://reactjs.org) community for the amazing ecosystem
- [Express.js](https://expressjs.com) for the backend framework

## 📧 Support

If you have any questions or need help, please open an issue or contact me at priyanshu402muz@gmail.com

---

⭐ **Star this repository if you found it helpful!** ⭐
