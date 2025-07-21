import React from "react"
import axios from "axios"

const BASEURL = "https://api.escuelajs.co/api"

const useCategorieServices = () => {
  const getCategories = async () => {
    const response = await axios.get(`${BASEURL}/v1/categories`)
    return response.data
  }

  const getProductsByCategorie = async (id) => {
    const response = await axios.get(`${BASEURL}/v1/categories/${id}/products`)
    return response.data
  }

  return {
    getCategories,
    getProductsByCategorie,
  }
}

export default useCategorieServices
