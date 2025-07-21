import React from "react"
import MyContext from "./MyContext"
import { useState } from "react"
import { useEffect } from "react"
import useCategorieServices from "../services/useCategorieServices"
import useProductsService from "../services/useProductsService"

const MyState = ({ children }) => {
  const { getCategories, getProductsByCategorie } = useCategorieServices()
  const { getProducts } = useProductsService()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [categoryProducts, setCategoryProducts] = useState([])
  const [searchkey, setSearchkey] = useState("")
  const [loading, setLoading] = useState(false)

  //-----> Fetch all categories from API <------
  const fetchCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res)
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }

  //-----> Fetch all products by category from API <------

  const fetchProductsByCategory = async (id) => {
    try {
      const data = await getProductsByCategorie(id)
      setCategoryProducts(data)
    } catch (err) {
      console.error("Error fetching products by category:", err)
    }
  }

  //------> fetchProducts <-------
  const fetchProducts = async () => {
    try {
      const res = await getProducts()
      setProducts(res)
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }

  // ------> UseEffect <------
  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  return (
    <MyContext.Provider
      value={{
        categories,
        setCategories,
        categoryProducts,
        setCategoryProducts,
        fetchProductsByCategory,
        searchkey,
        setSearchkey,
        loading,
        setLoading,
        products,
        setProducts,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export default MyState
