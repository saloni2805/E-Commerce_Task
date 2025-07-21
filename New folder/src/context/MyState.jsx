import React from "react"
import MyContext from "./MyContext"

const MyState = ({ children }) => {
  return <MyContext.Provider value={{}}>{children}</MyContext.Provider>
}

export default MyState
