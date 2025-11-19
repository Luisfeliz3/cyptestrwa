import React from "react";
import CardGroup from "../../components/CardGroup/index";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  Home,
  Dashboard as DashboardIcon,
  CalendarToday,
  ReceiptLong
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

function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          bgcolor: 'background.default', 
          minHeight: '100vh',
          py: 3
        }}
      >
        <Container maxWidth="xl">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}
              href="/"
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography
              sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}
            >
              <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Typography>
          </Breadcrumbs>

          {/* Main Dashboard Content */}
          <Stack spacing={4}>
            {/* Card Group Section */}
            <Box>
              <Typography 
                variant="h5" 
                color="primary" 
                sx={{ 
                  mb: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1 
                }}
              >
                <DashboardIcon />
                Account Overview
              </Typography>
              <CardGroup />
            </Box>

            {/* Recent Activity Section */}
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
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography 
                      variant="h5" 
                      color="primary"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <ReceiptLong />
                      Recent Transactions
                    </Typography>
                    
                    <Chip
                      icon={<CalendarToday />}
                      label="Since Mar 15 - Closing Apr 12"
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </Box>

                  <Chip
                    label="All Transactions"
                    size="small"
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: 'medium' }}
                  />
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                <RecentActivity 
                  width="100%" 
                  top={0}
                />
              </Box>
            </Paper>
          </Stack>

          {/* Optional: Quick Actions Footer */}
          <Paper
            elevation={1}
            sx={{
              mt: 4,
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              textAlign: 'center'
            }}
          >
            <Typography variant="body2">
              Need help? Contact support or visit our help center for assistance with your account.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;