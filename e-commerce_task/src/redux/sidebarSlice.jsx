// src/redux/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit"

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    open: false,
    mode: "buy",
    product: null,
  },
  reducers: {
    openSidebar: (state, action) => {
      state.open = true
      state.mode = action.payload.mode || "buy"
      state.product = action.payload.product || null
    },
    closeSidebar: (state) => {
      state.open = false
      state.product = null
    },
  },
})

export const { openSidebar, closeSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
