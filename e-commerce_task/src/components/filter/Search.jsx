import React, { useContext } from "react"
import { InputBase, Paper, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import MyContext from "../../context/MyContext"

const SearchBar = () => {
  const { searchKey, setSearchkey } = useContext(MyContext)

  return (
    <Paper
      component="form"
      // onSubmit={handleSubmit}
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
        name="searchkey"
        id="searchkey"
        value={searchKey}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setSearchkey(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
