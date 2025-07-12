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

- **Frontend**: React 19.1.0
- **Routing**: React Router DOM 7.6.0
- **State Management**: Redux Toolkit & React Redux
- **Styling**: Tailwind CSS 4.1.7
- **Authentication**: Auth0 React
- **Icons**: Font Awesome & React Icons
- **Build Tool**: Vite 6.3.5
- **Backend Integration**: Firebase
- **API**: Swiggy API integration

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

   Create a `.env` file in the root directory and add your configuration:

   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

   **To get your Supabase credentials:**
   1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
   2. Select your project (or create a new one)
   3. Go to Settings → API
   4. Copy the "Project URL" and "anon public" key
   5. Replace the values in your `.env` file

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
foodapk/
├── public/                 # Static assets
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
│   │   └── ProtectedRoute.jsx # Auth wrapper
│   ├── utils/             # Utility functions and hooks
│   │   ├── appStore.jsx   # Redux store configuration
│   │   ├── cartSlice.jsx  # Cart state management
│   │   ├── useOnlinestatus.jsx # Network status hook
│   │   └── useRestromenu.jsx   # Restaurant menu hook
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

- **Navigation**: Home, About, Contact, Cart links
- **Authentication**: Login/Logout with Auth0
- **Cart Counter**: Real-time cart item count
- **User Profile**: Display authenticated user information

### Body Component

- **Restaurant Grid**: Responsive restaurant card layout
- **Search Functionality**: Real-time restaurant search
- **Rating Filter**: Filter top-rated restaurants
- **Loading States**: Shimmer effect during data fetch
- **Network Detection**: Offline status handling

### Cart Component

- **Protected Route**: Requires authentication
- **Add/Remove Items**: Full cart management
- **Persistent State**: Redux-based state management

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🌐 API Integration

The app integrates with:

- **Swiggy API**: For restaurant data and menus
- **Auth0**: For user authentication
- **Firebase**: For backend services

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🔐 Authentication Flow

1. User clicks login button
2. Redirected to Auth0 login page
3. After successful authentication, user is redirected back
4. Access to protected routes (Cart) is granted
5. User information is displayed in header

## 🛍️ Cart Functionality

- Add items from restaurant menus
- View cart items with quantity and pricing
- Remove items from cart
- Protected access (requires login)
- Persistent state using Redux

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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Priyanshu Kumar**

- GitHub: [@yourusername](https://github.com/prkr-28)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/prkr28)

## 🙏 Acknowledgments

- [Swiggy](https://swiggy.com) for the restaurant API
- [Auth0](https://auth0.com) for authentication services
- [Tailwind CSS](https://tailwindcss.com) for the beautiful styling
- [React](https://reactjs.org) community for the amazing ecosystem

## 📧 Support

If you have any questions or need help, please open an issue or contact me at your.priyanshu402muz@gmail.com

---

⭐ **Star this repository if you found it helpful!** ⭐
