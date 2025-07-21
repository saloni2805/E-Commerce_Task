import React from "react"
import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer />
    </>
  )
}

export default Layout
