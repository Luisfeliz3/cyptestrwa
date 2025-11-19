import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Chip,
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Dashboard,
  Receipt,
  Settings,
  Help,
  Login,
  Menu as MenuIcon,
  Person,
  ChevronDown
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logo from "../../Images/logo192.png";

// Use the same theme from the previous components
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a5276',
      light: '#2e86ab',
      dark: '#0e3d5e'
    },
    secondary: {
      main: '#27ae60',
      light: '#58d68d',
      dark: '#1e8449'
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff'
    },
    text: {
      primary: '#2c3e50',
      secondary: '#566573'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    }
  },
  shape: {
    borderRadius: 12,
  }
});

function Nav() {
  const [helpAnchor, setHelpAnchor] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  const themeHook = useTheme();
  const isMobile = useMediaQuery(themeHook.breakpoints.down('md'));

  const handleHelpClick = (event) => {
    setHelpAnchor(event.currentTarget);
  };

  const handleHelpClose = () => {
    setHelpAnchor(null);
  };

  const handleMobileDrawerOpen = () => {
    setMobileDrawerOpen(true);
  };

  const handleMobileDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar 
        position="static" 
        elevation={2}
        sx={{ 
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Left Section - Logo and Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box 
              component="a" 
              href="/dashboard"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <img 
                src={logo} 
                alt="app_logo" 
                style={{ 
                  height: 40, 
                  width: 40,
                  borderRadius: '8px'
                }} 
              />
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main'
                }}
              >
                Payment Center
              </Typography>
            </Box>

            <Chip 
              label="Business" 
              size="small" 
              color="primary" 
              variant="outlined"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            />
          </Box>

          {/* Center Section - Navigation Links (Desktop) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="View account activity and transactions">
                <Button
                  component="a"
                  href="/activity"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 'medium',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  Activity
                </Button>
              </Tooltip>
              <Tooltip title="Manage Your Account">
                <Button
                  component="a"
                  href="/account-management"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 'medium',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  Manage Account
                </Button>
              </Tooltip>

              <Tooltip title="Manage account services and settings">
                <Button
                  component="a"
                  href="/accountservices"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 'medium',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  Account Services
                </Button>
                <Button
                  component="a"
                  href="/disputes"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 'medium',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  Disputes
                </Button>
              </Tooltip>
{/* 
              <Tooltip title="Get help and support">
                <Button
                  onClick={handleHelpClick}
                  endIcon={<ChevronDown />}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 'medium',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  Help
                </Button>
              </Tooltip> */}

              <Menu
                anchorEl={helpAnchor}
                open={Boolean(helpAnchor)}
                onClose={handleHelpClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    borderRadius: 2,
                    minWidth: 200
                  }
                }}
              >
                <MenuItem onClick={handleHelpClose}>
                  <ListItemIcon>
                    <Help fontSize="small" />
                  </ListItemIcon>
                  Help Center
                </MenuItem>
                <MenuItem onClick={handleHelpClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Contact Support
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleHelpClose}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  FAQ & Guides
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Right Section - Login and Mobile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <Tooltip title="Open menu">
                <IconButton
                  onClick={handleMobileDrawerOpen}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}

            {/* Login Button */}
            <Tooltip title="Log in to your account">
              <Button
                component="a"
                href="/login"
                variant="outlined"
                startIcon={<Login />}
                sx={{
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main'
                  }
                }}
              >
                Log In
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={handleMobileDrawerClose}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'background.paper'
          }
        }}
      >
        <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <img 
              src={logo} 
              alt="app_logo" 
              style={{ 
                height: 40, 
                width: 40,
                borderRadius: '8px'
              }} 
            />
            <Box>
              <Typography variant="h6" color="primary" fontWeight="bold">
                Payment Center
              </Typography>
              <Chip 
                label="Business" 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Navigation Links */}
          <List sx={{ flexGrow: 1 }}>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <Button
                component="a"
                href="/dashboard"
                fullWidth
                startIcon={<Dashboard />}
                onClick={handleMobileDrawerClose}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'text.primary',
                  fontWeight: 'medium',
                  borderRadius: 2
                }}
              >
                Dashboard
              </Button>
            </ListItem>
            
            <ListItem disablePadding sx={{ mb: 1 }}>
              <Button
                component="a"
                href="/activity"
                fullWidth
                startIcon={<Receipt />}
                onClick={handleMobileDrawerClose}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'text.primary',
                  fontWeight: 'medium',
                  borderRadius: 2
                }}
              >
                Activity
              </Button>
            </ListItem>
            
            <ListItem disablePadding sx={{ mb: 1 }}>
              <Button
                component="a"
                href="/accountservices"
                fullWidth
                startIcon={<Settings />}
                onClick={handleMobileDrawerClose}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'text.primary',
                  fontWeight: 'medium',
                  borderRadius: 2
                }}
              >
                Account Services
              </Button>
            </ListItem>
            
            <ListItem disablePadding sx={{ mb: 1 }}>
              <Button
                component="a"
                href="/help"
                fullWidth
                startIcon={<Help />}
                onClick={handleMobileDrawerClose}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'text.primary',
                  fontWeight: 'medium',
                  borderRadius: 2
                }}
              >
                Help Center
              </Button>
            </ListItem>
          </List>

          {/* Login Button at Bottom */}
          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Button
              component="a"
              href="/login"
              variant="contained"
              fullWidth
              startIcon={<Login />}
              onClick={handleMobileDrawerClose}
              sx={{
                bgcolor: 'primary.main',
                fontWeight: 'bold',
                borderRadius: 2,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}

export default Nav;