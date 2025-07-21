// src/components/Categories.jsx
import React, { useContext } from "react"
import { Grid } from "@mui/material"
import MyContext from "../../../context/MyContext"
import CategoryCard from "../../../components/common/Card"
import { useNavigate } from "react-router-dom"

const Categories = () => {
  const { categories, searchkey } = useContext(MyContext)
  console.log(categories)
  const navigate = useNavigate()

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ p: 3 }}>
      {categories
        .filter((obj) => obj.name?.toLowerCase().includes(searchkey))
        .map((cat) => (
          <Grid item xs={12} sm={6} md={3} key={cat.id}>
            <CategoryCard
              title={cat.name}
              image={cat.image}
              onClick={() => navigate(`/category/${cat.id}`)}
              clickable
            />
          </Grid>
        ))}
    </Grid>
  )
}

export default Categories
