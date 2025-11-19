import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Dashboard,
  History,
  Receipt,
  Gavel,
  Settings,
  Description,
  ExpandLess,
  ExpandMore,
  Payment,
  AccountBalance,
  ManageAccounts,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

function LeftNav() {
  const [openBilling, setOpenBilling] = useState(false);
  const [openPages, setOpenPages] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleBillingClick = () => {
    setOpenBilling(!openBilling);
  };

  const handlePagesClick = () => {
    setOpenPages(!openPages);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const drawerWidth = 280;

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? drawerWidth : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : 60,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'grey.200',
            transition: 'width 0.3s ease',
            overflowX: 'hidden'
          },
        }}
      >
        {/* Sidebar Header */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2
          }}>
            {sidebarOpen && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalance color="primary" sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    Payment Center
                  </Typography>
                  <Chip 
                    label="Active" 
                    size="small" 
                    color="success" 
                    variant="outlined"
                  />
                </Box>
              </Box>
            )}
            <Tooltip title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
              <IconButton 
                onClick={toggleSidebar} 
                size="small"
                color="primary"
              >
                {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
              </IconButton>
            </Tooltip>
          </Box>
          
          {sidebarOpen && (
            <Typography variant="body2" color="text.secondary">
              Manage your payments and account
            </Typography>
          )}
        </Box>

        <Divider />

        {/* Navigation Items */}
        <List sx={{ px: 1 }}>
          {/* Recent Activity */}
          <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
            <ListItemButton
              component="a"
              href="/dashboard"
              sx={{
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Dashboard color="primary" />
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontWeight="medium">
                      Recent Activity
                    </Typography>
                  } 
                />
              )}
            </ListItemButton>
          </ListItem>

          {/* Previous Billing Periods - Collapsible */}
          <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
            <ListItemButton
              onClick={handleBillingClick}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <History color="primary" />
              </ListItemIcon>
              {sidebarOpen && (
                <>
                  <ListItemText 
                    primary={
                      <Typography variant="body1" fontWeight="medium">
                        Previous Billing
                      </Typography>
                    } 
                  />
                  {openBilling ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
            
            {sidebarOpen && (
              <Collapse in={openBilling} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Receipt fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="January 2024" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4, borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Receipt fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="December 2023" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4, borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Receipt fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="November 2023" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            )}
          </ListItem>

          {/* Disputes */}
          <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
            <ListItemButton
              component="a"
              href="/disputes"
              sx={{
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Gavel color="primary" />
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontWeight="medium">
                      Disputes
                    </Typography>
                  } 
                />
              )}
            </ListItemButton>
          </ListItem>

          {/* Pages - Collapsible */}
          <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
            <ListItemButton
              onClick={handlePagesClick}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Description color="primary" />
              </ListItemIcon>
              {sidebarOpen && (
                <>
                  <ListItemText 
                    primary={
                      <Typography variant="body1" fontWeight="medium">
                        Resources
                      </Typography>
                    } 
                  />
                  {openPages ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
            
            {sidebarOpen && (
              <Collapse in={openPages} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4, borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Help Center" 
                      primaryTypographyProps={{ variant: 'body2' }}
                      href="/helpcenter"
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4, borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Payment fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Payment Methods" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4, borderRadius: 2 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <AccountBalance fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Account Types" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            )}
          </ListItem>

          {/* Account Management */}
          <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
            <ListItemButton
              component="a"
              href="/account-management"
              sx={{
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <ManageAccounts color="primary" />
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontWeight="medium">
                      Account Management
                    </Typography>
                  } 
                />
              )}
            </ListItemButton>
          </ListItem>

          {/* PDF Billing Statements */}
          <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
            <ListItemButton
              component="a"
              href="/statements"
              sx={{
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Description color="primary" />
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontWeight="medium">
                      PDF Statements
                    </Typography>
                  } 
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Quick Actions */}
        {sidebarOpen && (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Chip 
                icon={<Payment />} 
                label="Make Payment" 
                variant="outlined" 
                color="primary"
                clickable
                sx={{ justifyContent: 'flex-start' }}
              />
              <Chip 
                icon={<Description />} 
                label="Download Statement" 
                variant="outlined" 
                color="secondary"
                clickable
                sx={{ justifyContent: 'flex-start' }}
              />
            </Box>
          </Box>
        )}
      </Drawer>
    </ThemeProvider>
  );
}

export default LeftNav;