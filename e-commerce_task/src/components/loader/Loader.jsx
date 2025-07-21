import React from "react"
import { Box, CircularProgress } from "@mui/material"

function Loader() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999, // ensure it stays on top
        backgroundColor: "rgba(255, 255, 255, 0.5)", // optional blur bg
      }}
    >
      <CircularProgress size={60} thickness={5} />
    </Box>
  )
}

export default Loader
