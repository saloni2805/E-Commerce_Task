import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Grid, Typography, Box } from "@mui/material"
import CategoryCard from "../../../components/common/Card"
import RightSidebar from "../../../components/common/RightSidebar"
import MyContext from "../../../context/MyContext"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, updateQuantity } from "../../../redux/cartSlice"
import { toast } from "react-toastify"

const CategoryProductsPage = () => {
  const { id } = useParams()
  const { fetchProductsByCategory, categoryProducts } = useContext(MyContext)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [sidebarMode, setSidebarMode] = useState("view")
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  console.log(cartItems)

  useEffect(() => {
    fetchProductsByCategory(id)
  }, [id])

  const handleBuyNow = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      dispatch(
        updateQuantity({ id: product.id, quantity: existingItem.quantity + 1 })
      )
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }))
    }
    setSelectedProduct(product)
    setSidebarMode("buy")
    setSidebarOpen(true)
  }

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    setSidebarMode("view")
    setSidebarOpen(true)
  }

  const handleCloseSidebar = () => setSidebarOpen(false)

  const updateProductQuantity = (id, quantity) => {
    if (quantity < 1) return
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleCheckout = () => {
    if (cartItems == []) {
      toast.error("Please add products in cart")
    }
  }

  return (
    <Box sx={{ padding: "2rem", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Products in this Category
      </Typography>

      {categoryProducts.length > 0 ? (
        <Grid container spacing={3}>
          {categoryProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <CategoryCard
                title={product.title}
                image={product.images?.[0]}
                onBuyNow={() => handleBuyNow(product)}
                onViewDetails={() => handleViewDetails(product)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ mt: 4 }}>
          No products available in this category.
        </Typography>
      )}

      <RightSidebar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
        product={selectedProduct}
        mode={sidebarMode}
        quantity={quantity}
        onQuantityChange={(q) => setQuantity(q)}
        onCheckout={() => handleCheckout()}
        cartItems={cartItems}
        updateProductQuantity={updateProductQuantity}
      />
    </Box>
  )
}

export default CategoryProductsPage
