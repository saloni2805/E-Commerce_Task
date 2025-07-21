import React from "react"
import axios from "axios"

const BASEURL = "https://api.escuelajs.co/api"

const useProductsService = () => {
  const getProducts = async () => {
    const response = await axios.get(`${BASEURL}/v1/products`)
    return response.data
  }

  return {
    getProducts,
  }
}

export default useProductsService
