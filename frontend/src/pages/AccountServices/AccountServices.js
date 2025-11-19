import React, { useState } from 'react';
import logo from "../../Images/logo192.png"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Select,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Badge
} from '@mui/material';
import {
  ExpandMore,
  AccountBalance,
  CreditCard,
  Analytics,
  TravelExplore,
  CardGiftcard,
  Dashboard,
  MoreVert,
  Info,
  Visibility,
  Notifications,
  Person,
  ArrowDropDown,
  BusinessCenter,
  Payment,
  AccountCircle,
  Security,
  Insights,
  Menu as MenuIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a user-friendly corporate theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a5276', // Deep corporate blue
      light: '#2e86ab',
      dark: '#0e3d5e'
    },
    secondary: {
      main: '#27ae60', // Fresh green
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

const BusinessDashboard = () => {
  const [accountFilter, setAccountFilter] = useState('all');
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    bankAccounts: true,
    creditCards: true
  });

  const handleAccountFilterChange = (event) => {
    setAccountFilter(event.target.value);
  };

  const handleAccountMenuClick = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Header */}
        <AppBar 
          position="static" 
          elevation={1}
          sx={{ 
            bgcolor: 'white', 
            color: 'text.primary',
            borderBottom: '1px solid',
            borderColor: 'grey.200'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* <BusinessCenter sx={{ color: 'primary.main', fontSize: 32 }} /> */}
                   <img 
                             src={logo} 
                             alt="app_logo" 
                             style={{ 
                               height: 40, 
                               width: 40,
                               borderRadius: '8px'
                             }} 
                           />
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                PAYMENT CENTER for BUSINESS
              </Typography>
              <Chip 
                label="Premium" 
                size="small" 
                sx={{ 
                  bgcolor: 'secondary.light', 
                  color: 'white',
                  fontWeight: 'bold'
                }} 
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="Notifications">
                <IconButton 
                  color="inherit"
                  onClick={(e) => setNotificationAnchor(e.currentTarget)}
                >
                  <Badge badgeContent={3} color="secondary">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Account Settings">
                <IconButton color="inherit">
                  <Person />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Navigation */}
        <Paper 
          elevation={0} 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            borderRadius: 0
          }}
        >
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ px: 3, py: 2 }}
            alignItems="center"
          >
            <Button 
              color="inherit" 
              startIcon={<AccountBalance />}
              sx={{ fontWeight: 600 }}
            >
              Accounts
            </Button>
            <Button color="inherit" startIcon={<Payment />}>
              Pay & transfer
            </Button>
            <Button color="inherit">
              Collect & deposit
            </Button>
            <Button color="inherit">
              Investments
            </Button>
            
            <Menu>
              <Tooltip title="More business tools">
                <Button 
                  color="inherit" 
                  endIcon={<ArrowDropDown />}
                >
                  More
                </Button>
              </Tooltip>
              <Paper sx={{ width: 200 }}>
                <MenuItem>
                  <ListItemIcon>
                    <BusinessCenter fontSize="small" />
                  </ListItemIcon>
                  Account management
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <TravelExplore fontSize="small" />
                  </ListItemIcon>
                  Benefits & travel
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Security fontSize="small" />
                  </ListItemIcon>
                  Security
                </MenuItem>
              </Paper>
            </Menu>
          </Stack>
        </Paper>

        <Grid container spacing={3} sx={{ p: 3 }}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Stack spacing={2}>
              <Card elevation={2} sx={{ bgcolor: 'background.paper' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Dashboard /> Overview
                  </Typography>
                  <List dense>
                    <ListItem button sx={{ borderRadius: 1 }}>
                      <ListItemIcon>
                        <Insights color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Customer Insights" />
                    </ListItem>
                    <ListItem button sx={{ borderRadius: 1 }}>
                      <ListItemIcon>
                        {/* <Description color="primary" /> */}
                      </ListItemIcon>
                      <ListItemText primary="Statements & documents" />
                    </ListItem>
                    <ListItem button sx={{ borderRadius: 1 }}>
                      <ListItemIcon>
                        <AccountCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Profile & settings" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card elevation={2} sx={{ bgcolor: 'background.paper' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" color="primary">
                      Account View
                    </Typography>
                    <Tooltip title="Change how accounts are displayed">
                      <IconButton size="small" onClick={handleAccountMenuClick}>
                        <MoreVert />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  <FormControl fullWidth size="small">
                    <InputLabel>Show accounts</InputLabel>
                    <Select
                      value={accountFilter}
                      label="Show accounts"
                      onChange={handleAccountFilterChange}
                    >
                      <MenuItem value="all">All accounts</MenuItem>
                      <MenuItem value="business">Business only</MenuItem>
                      <MenuItem value="personal">Personal only</MenuItem>
                      <MenuItem value="credit">Credit cards only</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Tooltip title="Currently viewing all your accounts">
                    <Chip 
                      label={`${accountFilter === 'all' ? 'All' : accountFilter} accounts visible`} 
                      variant="outlined" 
                      size="small" 
                      sx={{ mt: 2, width: '100%' }}
                      color="primary"
                    />
                  </Tooltip>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              {/* Bank Accounts Accordion */}
              <Accordion 
                expanded={expandedSections.bankAccounts}
                onChange={() => toggleSection('bankAccounts')}
                elevation={2}
                sx={{ 
                  bgcolor: 'background.paper',
                  '&:before': { display: 'none' }
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ borderBottom: '1px solid', borderColor: 'grey.100' }}
                >
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountBalance color="primary" />
                    Bank accounts
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    {/* Business Account */}
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        borderLeft: '4px solid',
                        borderLeftColor: 'primary.main',
                        bgcolor: 'grey.50'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold" color="primary.dark">
                              COMPUTER SERVICES
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              BUS COMPLETE CHK (...3232)
                            </Typography>
                          </Box>
                          <Chip label="Business" size="small" color="primary" />
                        </Box>

                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <Tooltip title="Funds immediately available for use">
                              <Box>
                                <Typography variant="h6" color="success.main">
                                  $390,230.31
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Available balance
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={4}>
                            <Tooltip title="Total current balance including pending transactions">
                              <Box>
                                <Typography variant="h6" color="text.primary">
                                   $390,230.31
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Present balance
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={4}>
                            <Tooltip title="Available credit line">
                              <Box>
                                <Typography variant="h6" color="text.primary">
                                  $450,000.00
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Available credit
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Personal Account */}
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary.dark" gutterBottom>
                          PERSONAL
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          TOTAL CHECKING (...3030)
                        </Typography>

                        <Grid container spacing={3} sx={{ mt: 1 }}>
                          <Grid item xs={6}>
                            <Tooltip title="Funds immediately available for use">
                              <Box>
                                <Typography variant="h6" color="text.primary">
                                  $450,000.00
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Available balance
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={6}>
                            <Tooltip title="Total current balance including pending transactions">
                              <Box>
                                <Typography variant="h6" color="text.primary">
                                  $150,000.00
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Present balance
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Credit Cards Accordion */}
              <Accordion 
                expanded={expandedSections.creditCards}
                onChange={() => toggleSection('creditCards')}
                elevation={2}
                sx={{ 
                  bgcolor: 'background.paper',
                  '&:before': { display: 'none' }
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                  sx={{ borderBottom: '1px solid', borderColor: 'grey.100' }}
                >
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CreditCard color="primary" />
                    Credit cards
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary.dark" gutterBottom>
                        PERSONAL
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <CreditCard color="action" />
                        <Typography variant="body1" fontWeight="500">
                          Prime Visa (...4444)
                        </Typography>
                      </Box>

                      <List dense>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Info color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Typography variant="body2">
                                You've scheduled your automatic payment for <strong>Nov 28, 2025</strong>.
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Visibility color="action" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={
                              <Typography variant="body2">
                                See{' '}
                                <Link href="#" underline="hover" fontWeight="bold" color="primary.main">
                                  account details
                                </Link>
                                {' '}for more info.
                              </Typography>
                            }
                          />
                        </ListItem>
                      </List>
                      
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button variant="outlined" size="small" href="/payment">
                          
                          Make Payment
                        </Button>
                        <Button variant="text" size="small">
                          View Statement
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} md={3}>
            <Stack spacing={3}>
              {/* Analytics Promo */}
              <Card elevation={2} sx={{ bgcolor: 'background.paper' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Analytics color="primary" />
                    <Typography variant="h6">
                      Grow your business
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Process payments with Chase to see sales data and get actionable insights.
                  </Typography>
                  <Tooltip title="Learn how analytics can help your business grow">
                    <Button variant="contained" size="small" fullWidth>
                      Explore Analytics
                    </Button>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Business Snapshot */}
              <Card 
                elevation={2} 
                sx={{ 
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'secondary.light'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Dashboard color="secondary" />
                    <Typography variant="h6" color="secondary.dark">
                      Business Snapshot
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="secondary.main" gutterBottom>
                    $900
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Your money in this month
                  </Typography>
                  <Tooltip title="Quick overview of your monthly business activity">
                    <Chip 
                      icon={<Visibility />}
                      label="30 second read" 
                      size="small" 
                      variant="outlined"
                      color="secondary"
                    />
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Rewards */}
              <Card elevation={2} sx={{ bgcolor: 'background.paper' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <CardGiftcard color="primary" />
                    <Typography variant="h6">
                      Rewards
                    </Typography>
                  </Box>
                  <Typography variant="h3" color="secondary.main" gutterBottom>
                    9,648
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Amazon Rewards points (...1414)
                  </Typography>
                  <Tooltip title="Redeem your rewards for gifts, travel, or cash back">
                    <Button variant="outlined" size="small" fullWidth>
                      Redeem Points
                    </Button>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Travel */}
              <Card elevation={2} sx={{ bgcolor: 'background.paper' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <TravelExplore color="primary" />
                    <Typography variant="h6">
                      Travel
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Explore millions of business travel options
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Book hotels, flights, car rentals & more
                  </Typography>
                  <Tooltip title="Book your next business trip with exclusive rates">
                    <Button variant="contained" size="small" fullWidth startIcon={<TravelExplore />}>
                      Book Travel
                    </Button>
                  </Tooltip>
                </CardContent>
              </Card>

              {/* Wealth Plan */}
              <Card elevation={2} sx={{ bgcolor: 'background.paper' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Plan, track & manage
                  </Typography>
                  <Typography variant="subtitle1" color="secondary.main" gutterBottom fontWeight="bold">
                    Wealth Plan
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    You're a Partner's retail business or airline in Health Plans course
                  </Typography>
                  <Tooltip title="Review and manage your wealth planning strategy">
                    <Button variant="outlined" size="small" fullWidth>
                      View Wealth Plan
                    </Button>
                  </Tooltip>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default BusinessDashboard;