import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../utils/API.js";
import Loading from "../Loading/Loading.js";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  AccountBalance,
  Payment,
  CheckCircle,
  TrendingUp,
  Visibility,
  Refresh,
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

const CardGroup = () => {
  const [balances, setBalances] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleMakePayment = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  const handleViewTransactions = (e) => {
    e.preventDefault();
    navigate("/activity");
  };

  const handleViewBalanceDetails = (e) => {
    e.preventDefault();
    navigate("/balance-details");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.getBalances();
        setBalances(res.data);
      } catch (error) {
        console.error("Error fetching balances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshBalances = async () => {
    setLoading(true);
    try {
      const res = await API.getBalances();
      setBalances(res.data);
    } catch (error) {
      console.error("Error refreshing balances:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 0 }}>
        {balances ? (
          balances.map((bal, i) => (
            <Grid container spacing={3} key={i} sx={{ mb: 3 }}>
              {/* Statement Balance Card */}
              <Grid item xs={12} md={4}>
                <Card 
                  elevation={2}
                  sx={{
                    height: '100%',
                    bgcolor: 'background.paper',
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main'
                  }}
                >
                  <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ReceiptLong />
                        Statement Balance
                      </Typography>
                      <Tooltip title="Current statement period">
                        <Chip 
                          label="Current" 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </Tooltip>
                    </Box>
                    
                    <Typography variant="h4" color="text.primary" sx={{ mb: 1, fontWeight: 'bold' }}>
                      ${bal.statement_balance.toFixed(2)}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Oct 15 - Nov 12
                    </Typography>
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleViewTransactions}
                      startIcon={<Visibility />}
                      sx={{ mt: 'auto' }}
                    >
                      View Transactions
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Payment Card */}
              <Grid item xs={12} md={4}>
                {bal.minimum_payment.toFixed(2) === "40.00" ? (
                  // Payment Due Card
                  <Card 
                    elevation={2}
                    sx={{
                      height: '100%',
                      bgcolor: 'background.paper',
                      borderLeft: '4px solid',
                      borderLeftColor: 'secondary.main'
                    }}
                  >
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" color="secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Payment />
                          Make A Payment
                        </Typography>
                        <Tooltip title="Payment due today">
                          <Chip 
                            label="Due Today" 
                            size="small" 
                            color="secondary" 
                          />
                        </Tooltip>
                      </Box>
                      
                      <Typography variant="body1" color="text.primary" sx={{ mb: 2, fontWeight: 'medium' }}>
                        Today
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Minimum Payment Due
                        </Typography>
                        <Typography variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }}>
                          ${bal.minimum_payment.toFixed(2)}
                        </Typography>
                      </Box>
                      
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleMakePayment}
                        startIcon={<Payment />}
                        sx={{ mt: 'auto' }}
                      >
                        Make a Payment
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  // Payment Made Card
                  <Card 
                    elevation={2}
                    sx={{
                      height: '100%',
                      bgcolor: 'background.paper',
                      borderLeft: '4px solid',
                      borderLeftColor: 'success.main'
                    }}
                  >
                    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircle />
                          Account Updated
                        </Typography>
                        <Tooltip title="Payment received">
                          <Chip 
                            label="Paid" 
                            size="small" 
                            color="success" 
                          />
                        </Tooltip>
                      </Box>
                      
                      <Typography variant="body1" color="text.primary" sx={{ mb: 2, textAlign: 'center' }}>
                        Thank You For Your{" "}
                        <Typography component="span" variant="body1" color="success.main" fontWeight="bold">
                          Payment!
                        </Typography>
                      </Typography>
                      
                      <Box sx={{ flexGrow: 1 }} />
                      
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleMakePayment}
                        startIcon={<Payment />}
                        sx={{ mt: 'auto' }}
                      >
                        Make Another Payment
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </Grid>

              {/* Total Balance Card */}
              <Grid item xs={12} md={4}>
                <Card 
                  elevation={2}
                  sx={{
                    height: '100%',
                    bgcolor: 'background.paper',
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.light'
                  }}
                >
                  <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccountBalance />
                        Total Balance
                      </Typography>
                      <Tooltip title="Refresh balances">
                        <IconButton 
                          size="small" 
                          onClick={refreshBalances}
                          disabled={loading}
                          color="primary"
                        >
                          <Refresh />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    <Typography variant="h4" color="text.primary" sx={{ mb: 3, fontWeight: 'bold' }}>
                      ${bal.total_balance.toFixed(2)}
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Available Credit
                      </Typography>
                      <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                        ${bal.available_credit.toFixed(2)}
                      </Typography>
                    </Box>
                    
                    <Button
                      variant="text"
                      color="primary"
                      fullWidth
                      onClick={handleViewBalanceDetails}
                      startIcon={<TrendingUp />}
                      sx={{ mt: 'auto' }}
                    >
                      Balance Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))
        ) : (
          <Loading />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CardGroup;