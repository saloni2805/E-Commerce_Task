import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  Menu as MenuIcon,
  Person,
  Logout,
  Login,
  Store,
  Home,
  Category,
} from '@mui/icons-material';
import { useAuth } from '../../auth/AuthContext';
import { logOut } from '../../auth/firebase';
import { logout } from '../../redux/slices/authSlice';
import CartDrawer from '../cart/CartDrawer';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { user, isAuthenticated } = useAuth();
  const { totalQuantity } = useSelector(state => state.cart);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = async () => {
    await logOut();
    dispatch(logout());
    handleUserMenuClose();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Products', path: '/products', icon: <Store /> },
    { label: 'Categories', path: '/categories', icon: <Category /> },
  ];

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleMobileMenuToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                mr: { xs: 2, md: 4 },
              }}
              onClick={() => navigate('/')}
            >
              <Store sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                ShopHub
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 1,
                      fontWeight: location.pathname === item.path ? 700 : 400,
                      borderBottom: location.pathname === item.path ? 2 : 0,
                      borderColor: 'white',
                      borderRadius: 0,
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Search Bar */}
            {!isMobile && (
              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{ mx: 2, flexGrow: 1, maxWidth: 400 }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          edge="end"
                          sx={{ color: 'white' }}
                        >
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            )}

            {/* Cart Button */}
            <IconButton
              color="inherit"
              onClick={() => setCartDrawerOpen(true)}
              sx={{ mx: 1 }}
            >
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* User Menu */}
            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <Avatar
                    src={user?.photoURL}
                    alt={user?.displayName}
                    sx={{ width: 32, height: 32 }}
                  >
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => { handleUserMenuClose(); navigate('/profile'); }}>
                    <Person sx={{ mr: 1 }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => { handleUserMenuClose(); navigate('/orders'); }}>
                    Orders
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  startIcon={<Login />}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate('/signup')}
                  sx={{
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: { width: 250 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            ShopHub
          </Typography>
          <Divider />
        </Box>
        
        {/* Mobile Search */}
        <Box sx={{ p: 2 }}>
          <Box component="form" onSubmit={handleSearch}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" edge="end">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                selected={location.pathname === item.path}
              >
                <Box sx={{ mr: 2 }}>{item.icon}</Box>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider />
        
        {/* Mobile Auth Buttons */}
        <Box sx={{ p: 2 }}>
          {isAuthenticated ? (
            <>
              <Button
                fullWidth
                startIcon={<Person />}
                onClick={() => {
                  navigate('/profile');
                  setMobileMenuOpen(false);
                }}
                sx={{ mb: 1 }}
              >
                Profile
              </Button>
              <Button
                fullWidth
                startIcon={<Logout />}
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                color="error"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Login />}
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                sx={{ mb: 1 }}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  navigate('/signup');
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Drawer>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </>
  );
};

export default Navbar;
