import React from "react"
import { InputBase, Paper, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(query)
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: 500 },
        borderRadius: "50px",
        boxShadow: 1,
      }}
    >
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
