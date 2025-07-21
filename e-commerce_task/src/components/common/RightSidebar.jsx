// src/components/common/RightSidebar.jsx
import React from "react"
import { Drawer, Box, Typography, IconButton, Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, updateQuantity } from "../../redux/cartSlice"
import CartProductCard from "./CartProductCard"

const RightSidebar = ({
  open,
  onClose,
  product,
  mode = "view",
  onCheckout,
}) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  console.log(cartItems)
  const total = cartItems?.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {mode === "buy" ? "Your Cart" : "Product Details"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={2}>
          {mode === "view" && product && (
            <>
              <img
                src={product.images?.[0]}
                alt={product.title}
                width="100%"
                style={{ borderRadius: 8 }}
              />
              <Typography variant="subtitle1" mt={1}>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description || "No description available."}
              </Typography>
            </>
          )}

          {mode === "buy" && (
            <>
              {cartItems?.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
              ) : (
                <>
                  <Box mt={2}>
                    {cartItems?.map((product) => (
                      <CartProductCard
                        key={product.id}
                        product={product}
                        onQuantityChange={(newQty) =>
                          dispatch(
                            updateQuantity({ id: product.id, quantity: newQty })
                          )
                        }
                        onRemove={() => dispatch(removeFromCart(product.id))}
                      />
                    ))}
                  </Box>

                  <Typography variant="h6" mt={2}>
                    Total: ₹{total}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={onCheckout}
                  >
                    Checkout
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default RightSidebar
