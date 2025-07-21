# 🛒 ShopHub - Modern E-Commerce Frontend

A complete, modern e-commerce frontend application built with React + Vite, featuring a responsive design, shopping cart functionality, user authentication, and seamless product browsing experience.

![ShopHub Demo](https://via.placeholder.com/800x400?text=ShopHub+E-Commerce+Demo)

## ✨ Features

### Core Features
- 🏠 **Modern Homepage** - Hero section, featured products, and categories
- 🛍️ **Product Catalog** - Grid layout with search, filters, and pagination
- 🔍 **Product Details** - Detailed product pages with image gallery and reviews
- 🛒 **Shopping Cart** - Add/remove items, quantity management, local storage persistence
- 💳 **Checkout Process** - Multi-step checkout with shipping and payment forms
- 🔐 **User Authentication** - Firebase Auth with email/password and Google sign-in
- 📱 **Responsive Design** - Mobile-first approach with Material-UI components

### Advanced Features
- 🔍 **Product Search** - Real-time search with query highlighting
- 🏷️ **Category Filtering** - Filter products by categories
- 💰 **Price Range Filter** - Adjustable price range slider
- ⭐ **Star Ratings** - Product rating system
- 🔒 **Protected Routes** - Authentication-required pages
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **UI Library**: Material-UI (MUI) 7.2.0
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM 7.7.0
- **Authentication**: Firebase Auth
- **HTTP Client**: Axios 1.10.0
- **API**: Fake Store API (Platzi)

## 📁 Project Structure

```
src/
├── auth/                    # Firebase authentication setup
│   ├── firebase.js         # Firebase configuration
│   └── AuthContext.jsx     # Auth context provider
├── components/              # Reusable components
│   ├── auth/               # Authentication components
│   │   └── ProtectedRoute.jsx
│   ├── cart/               # Shopping cart components
│   │   └── CartDrawer.jsx
│   ├── layout/             # Layout components
│   │   └── Layout.jsx
│   ├── navbar/             # Navigation components
│   │   └── Navbar.jsx
│   └── products/           # Product components
│       └── ProductCard.jsx
├── pages/                   # Page components
│   ├── auth/               # Authentication pages
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── cart/               # Cart page
│   │   └── Cart.jsx
│   ├── checkout/           # Checkout page
│   │   └── Checkout.jsx
│   ├── home/               # Home page
│   │   └── home.jsx
│   └── products/           # Product pages
│       ├── AllProducts.jsx
│       └── ProductDetail.jsx
├── redux/                   # Redux store and slices
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   └── productsSlice.js
│   └── store.js
├── services/               # API services
│   └── api.js
├── App.jsx                 # Main app component
└── main.jsx               # Entry point
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shophub-ecommerce.git
cd shophub-ecommerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and set up Email/Password and Google providers
3. Copy your Firebase config and update `src/auth/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Usage

### For Users
1. **Browse Products**: Visit the homepage to see featured products and categories
2. **Search & Filter**: Use the search bar and filters to find specific products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Manage Cart**: View and modify cart items in the cart drawer or cart page
5. **Checkout**: Complete the checkout process (requires authentication)
6. **Authentication**: Sign up or log in to access protected features

### For Developers
1. **API Integration**: The app uses Platzi's Fake Store API for product data
2. **State Management**: Redux Toolkit manages global state (cart, products, auth)
3. **Local Storage**: Cart data persists across browser sessions
4. **Responsive Design**: Mobile-first approach with Material-UI breakpoints

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 API Endpoints

The application uses the [Platzi Fake Store API](https://fakeapi.platzi.com/):

- **Products**: `GET /api/v1/products`
- **Categories**: `GET /api/v1/categories`
- **Product by ID**: `GET /api/v1/products/{id}`
- **Products by Category**: `GET /api/v1/categories/{id}/products`

## 🎨 UI/UX Features

- **Material Design**: Consistent design language with Material-UI
- **Dark/Light Theme**: Automatic theme switching (can be extended)
- **Animations**: Smooth transitions and hover effects
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation

## 🔒 Authentication Flow

1. **Sign Up**: Create account with email/password or Google
2. **Sign In**: Login with existing credentials
3. **Protected Routes**: Checkout requires authentication
4. **Session Management**: Automatic session handling with Firebase
5. **User Profile**: Display user information in navbar

## 🛒 Shopping Cart Features

- **Add Items**: Add products with quantity selection
- **Update Quantity**: Increase/decrease item quantities
- **Remove Items**: Delete individual items or clear entire cart
- **Persistence**: Cart data saved to localStorage
- **Real-time Updates**: Instant cart total and quantity updates
- **Responsive Design**: Works seamlessly on all devices

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables for Firebase
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Platzi Fake Store API](https://fakeapi.platzi.com/) for product data
- [Material-UI](https://mui.com/) for the component library
- [Firebase](https://firebase.google.com/) for authentication
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Built with ❤️ using React + Vite**
