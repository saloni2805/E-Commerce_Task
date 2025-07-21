import "./App.css"
import Layout from "./components/layout/Layout"
import MyState from "./context/MyState"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import Home from "./pages/home/home"
import AllProducts from "./pages/products/AllProducts"
import CategoryProductsPage from "./pages/home/categories/CategoryProductsPage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import RightSidebar from "./components/common/RightSidebar"
import { useDispatch, useSelector } from "react-redux"
import { closeSidebar } from "./redux/sidebarSlice"
import { updateQuantity } from "./redux/cartSlice"
import { toast } from "react-toastify"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import NoPage from "./pages/nopage/NoPage"

function App() {
  const dispatch = useDispatch()
  const sidebar = useSelector((state) => state.sidebar)
  const cartItems = useSelector((state) => state.cart.cartItems)
  console.log(cartItems)
  const handleCheckout = () => {
    if (cartItems == []) {
      toast.error("Please add products in cart")
    }
  }
  return (
    <>
      <MyState>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              {/* Protected Routes Below */}
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <AllProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category/:id"
                element={
                  <ProtectedRoute>
                    <CategoryProductsPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/*" element={<NoPage />} />
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <RightSidebar
          open={sidebar.open}
          onClose={() => dispatch(closeSidebar())}
          product={sidebar.product}
          mode={sidebar.mode}
          cartItems={cartItems}
          updateProductQuantity={(id, qty) =>
            dispatch(updateQuantity({ id, quantity: qty }))
          }
          onCheckout={() => handleCheckout()}
        />
      </MyState>
    </>
  )
}

export default App

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user")
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}
