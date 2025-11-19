import React from "react";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import LeftNav from "../../components/LeftNav/LeftNav";
import {
  Box,
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CalendarMonth,
  AccountBalance,
  Receipt,
  TrendingUp,
  Download,
  Info,
  Payment,
  PieChart
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
    h4: {
      fontWeight: 600,
    },
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

function Activity() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Left Navigation */}
        <LeftNav className="sidebar" />
        
        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="xl">
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                color="primary" 
                sx={{ 
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <AccountBalance />
                Account Activity
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Monitor your transactions, balances, and account details
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Activity Summary Cards */}
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {/* Pending Charges Card */}
                  <Grid item xs={12} md={4}>
                    <Card 
                      elevation={2}
                      sx={{
                        bgcolor: 'background.paper',
                        borderLeft: '4px solid',
                        borderLeftColor: 'warning.main',
                        height: '100%'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Typography 
                            variant="h6" 
                            color="text.primary"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                          >
                            <Receipt />
                            Pending Charges
                          </Typography>
                          <Tooltip title="Charges that are pending and not yet posted to your account">
                            <IconButton size="small">
                              <Info />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
                          $400.00
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Awaiting processing
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Posted Charges Card */}
                  <Grid item xs={12} md={4}>
                    <Card 
                      elevation={2}
                      sx={{
                        bgcolor: 'background.paper',
                        borderLeft: '4px solid',
                        borderLeftColor: 'success.main',
                        height: '100%'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Typography 
                            variant="h6" 
                            color="text.primary"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                          >
                            <Payment />
                            Posted Charges
                          </Typography>
                          <Tooltip title="Charges that have been processed and posted to your account">
                            <IconButton size="small">
                              <Info />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                          $40.00
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Processed transactions
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Total Balance Card */}
                  <Grid item xs={12} md={4}>
                    <Card 
                      elevation={2}
                      sx={{
                        bgcolor: 'background.paper',
                        borderLeft: '4px solid',
                        borderLeftColor: 'primary.main',
                        height: '100%'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Typography 
                            variant="h6" 
                            color="text.primary"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                          >
                            <TrendingUp />
                            Total Balance
                          </Typography>
                          <Tooltip title="Your current total account balance including all charges">
                            <IconButton size="small">
                              <Info />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                          $834.55
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Current account total
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/* Split Payment Feature */}
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={2}
                  sx={{
                    p: 3,
                    bgcolor: 'secondary.light',
                    color: 'white',
                    borderRadius: 3,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Split Your Spending
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                      Split up your spending into monthly payments with no extra charges or interest fees.
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          bgcolor: 'white',
                          color: 'secondary.main'
                        }
                      }}
                    >
                      TERMS & CONDITIONS
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      right: -20,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      opacity: 0.1,
                      zIndex: 0
                    }}
                  >
                    <PieChart sx={{ fontSize: 120 }} />
                  </Box>
                </Paper>
              </Grid>

              {/* Download Statement */}
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={2}
                  sx={{
                    p: 3,
                    bgcolor: 'primary.light',
                    color: 'white',
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarMonth sx={{ fontSize: 40, opacity: 0.8 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Monthly Statements
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Download your monthly statements
                      </Typography>
                    </Box>
                  </Box>
                  <Tooltip title="Download latest statement">
                    <IconButton
                      sx={{
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.2)',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.3)'
                        }
                      }}
                    >
                      <Download />
                    </IconButton>
                  </Tooltip>
                </Paper>
              </Grid>

              {/* Recent Activity Section */}
              <Grid item xs={12}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    sx={{ 
                      p: 3, 
                      borderBottom: '1px solid',
                      borderColor: 'grey.100',
                      bgcolor: 'grey.50'
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      color="primary"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <Receipt />
                      Recent Transactions
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <RecentActivity width="100%" />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Activity;