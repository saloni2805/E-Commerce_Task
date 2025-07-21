import * as React from "react"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material"
import {
  Adb as AdbIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  ListAlt as ListAltIcon,
} from "@mui/icons-material"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { openSidebar } from "../../redux/sidebarSlice"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/FirebaseConfig"
import { toast } from "react-toastify"

const pages = [
  { name: "Products", path: "/products" },
  // add more items if needed
]
function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const user = JSON.parse(localStorage.getItem("user"))

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("user")
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (err) {
      toast.error("Logout failed")
      console.error(err)
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ position: "relative" }}>
          {/* Desktop Logo */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              component="span"
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              LOGO
            </Typography>
          </NavLink>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Centered Mobile Logo */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                pointerEvents: "auto",
              }}
            >
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                }}
              >
                LOGO
              </Typography>
            </NavLink>
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.path}
                style={{ textDecoration: "none" }}
              >
                {({ isActive }) => (
                  <Button
                    sx={{
                      my: 2,
                      display: "block",
                      color: "white",
                      fontWeight: isActive ? "bold" : "normal",
                      borderBottom: isActive
                        ? "2px solid white"
                        : "2px solid transparent",
                      borderRadius: 0,
                    }}
                  >
                    {page.name}
                  </Button>
                )}
              </NavLink>
            ))}
          </Box>

          {/* Right Actions */}
          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Tooltip title="Cart">
              <IconButton
                color="inherit"
                onClick={() => dispatch(openSidebar({ mode: "buy" }))}
              >
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="My Orders">
              <IconButton color="inherit">
                <ListAltIcon />
              </IconButton>
            </Tooltip>

            {user ? (
              <>
                <Tooltip title="User">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.email?.[0]?.toUpperCase()} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => navigate("/signup")}>
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {pages.map((text) => (
              <ListItem key={text.name} disablePadding>
                <ListItemButton onClick={() => navigate(text.path)}>
                  <ListItemText primary={text.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {!user ? (
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/login")}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/signup")}>
                  <ListItemText primary="Signup" />
                </ListItemButton>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Navbar
