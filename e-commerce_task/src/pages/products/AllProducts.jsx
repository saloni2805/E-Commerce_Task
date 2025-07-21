import React, { useContext } from "react"
import { Grid, Typography } from "@mui/material"
import CategoryCard from "../../components/common/Card"
import MyContext from "../../context/MyContext"

const AllProducts = () => {
  const { products } = useContext(MyContext)
  console.log(products)

  // useEffect(() => {
  //   fetchProducts()
  // }, [])

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ padding: "7px" }}
      >
        All Products
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <CategoryCard
              title={product.title}
              image={product.images[0]}
              // onBuyNow={() => console.log("Buying", product.title)}
              // onViewDetails={() => console.log("Viewing", product.title)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default AllProducts
