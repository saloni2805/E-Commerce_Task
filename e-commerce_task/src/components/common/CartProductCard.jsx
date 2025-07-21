import React from "react"
import { Box, Typography, IconButton, Stack } from "@mui/material"
import { Add, Remove, Delete } from "@mui/icons-material"

const CartProductCard = ({ product, onQuantityChange, onRemove }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img
          src={product.images?.[0]}
          alt={product.title}
          width="100%"
          //   style={{ borderRadius: 8 }}
          style={{ width: 60, height: 60, objectFit: "cover" }}
        />
        <Box>
          <Typography variant="subtitle2">{product.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{product.price}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={() => onQuantityChange(product.quantity - 1)}>
              <Remove fontSize="small" />
            </IconButton>
            <Typography>{product.quantity}</Typography>
            <IconButton onClick={() => onQuantityChange(product.quantity + 1)}>
              <Add fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Box>
      <IconButton onClick={onRemove}>
        <Delete />
      </IconButton>
    </Box>
  )
}

export default CartProductCard
