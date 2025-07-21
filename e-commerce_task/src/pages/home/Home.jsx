import React from "react"
import { Box } from "@mui/material"
import SearchBar from "../../components/filter/Search"
import Categories from "./categories/Categories"

const Home = () => {
  return (
    <>
      <Box
        display="flex"
        paddingTop={4}
        flexDirection="column"
        alignItems="center"
        // justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <SearchBar />
        <Categories />
      </Box>
    </>
  )
}

export default Home
