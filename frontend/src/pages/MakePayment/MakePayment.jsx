import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../utils/API.js";
import Loading from "../../components/Loading/Loading.js";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Alert,
  Divider,
  Stack,
  Paper,
  InputAdornment,
  CircularProgress,
  Grid
} from '@mui/material';
import {
  AccountBalance,
  Payment,
  CheckCircle,
  Warning,
  Info,
  ArrowBack,
  CreditCard,
  Security
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

const MakePayment = () => {
  const [makePayments, setMakePayments] = useState();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({ payment: "0.00", option: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.getBalances();
        console.log(res);
        setMakePayments(res.data);
      } catch (error) {
        console.error("Error fetching balances:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOnChange = async (event) => {
    const { name, value } = event.target;
    const regex = /^\d*\.?\d{0,2}$/;
    
    if (
      regex.test(value) ||
      value === " " ||
      value === "0.00" ||
      name === "option"
    ) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.option) {
      alert("Please select a payment option");
      return;
    }
    
    setProcessing(true);
    const payment = parseFloat(formData.payment);
    await paymentVerifier(makePayments[0]._id, formData.option, payment);
    setProcessing(false);
  };

  const paymentVerifier = async (id, paymentType, payment) => {
    console.log(payment + "<<< THIS PAYMENT");
    
    switch (paymentType) {
      case "statement_balance":
        if (payment === parseFloat(await makePayments[0].statement_balance)) {
          await API.minPayment({
            id: id,
            statement_balance: 0,
            minimum_payment: 0,
            total_balance: ((await makePayments[0].total_balance) - payment).toFixed(2),
          })
          .then(() => {
            alert("Thank You For Your Payment!");
            navigate("/dashboard");
          })
          .catch((err) => console.log(err.response?.data || err));
        } else {
          alert("Please pay the exact Statement Balance amount only!");
        }
        break;

      case "minimum_payment":
        if (payment === await makePayments[0].minimum_payment) {
          await API.minPayment({
            id: id,
            minimum_payment: 0,            
            total_balance: (await makePayments[0].total_balance) - payment,
          })
          .then(() => {
            alert("Thank You For Your Payment!");
            navigate("/dashboard");
          })
          .catch((err) => console.log(err.response?.data || err));
        } else if ((await makePayments[0].minimum_payment) === 0) {
          alert("Minimum payment already submitted for this period");
        } else {
          alert("Minimum payment must be $" + makePayments[0].minimum_payment.toFixed(2));
        }
        break;

      case "total_balance":
        if (parseFloat(await makePayments[0].total_balance) === payment) {
          await API.minPayment({
            id: id,
            total_balance: parseFloat(await makePayments[0].total_balance) - payment,
            minimum_payment: 0,
            statement_balance: 0,
          })
          .then(() => {
            alert("Thank You For Your Payment!");
            navigate("/dashboard");
          })
          .catch((err) => console.log(err.response?.data || err));
        } else {
          alert("You can only pay the full amount. For custom payments, please choose 'Pay Other Amount'");
        }
        break;

      case "other_amount":
        if (payment > 0 && payment <= parseFloat(await makePayments[0].total_balance)) {
          await API.minPayment({
            id: id,
            total_balance: parseFloat(await makePayments[0].total_balance) - payment,
          })
          .then(() => {
            alert("Thank You For Your Payment!");
            navigate("/dashboard");
          })
          .catch((err) => console.log(err.response?.data || err));
        } else {
          alert("Please enter an amount up to your total balance only!");
        }
        break;
      default:
        alert("Please choose a payment option");
    }
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          {/* Back Button */}
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBackClick}
            sx={{ mb: 3, color: 'primary.main' }}
          >
            Back to Dashboard
          </Button>

          {makePayments ? (
            makePayments.map((bal, i) => (
              <Stack spacing={3} key={i}>
                {/* Header Card */}
                <Card elevation={3}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Pay Your Bill
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Make a secure payment to your account
                    </Typography>
                  </CardContent>
                </Card>

                {/* Alert Message */}
                <Alert 
                  severity="info" 
                  icon={<Info />}
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                      width: '100%'
                    }
                  }}
                >
                  <Typography variant="body1" fontWeight="medium">
                    Please choose a payment option below!
                  </Typography>
                </Alert>

                {/* Payment Method Card */}
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <AccountBalance color="primary" />
                      Payment Method
                    </Typography>
                    
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        mb: 3
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Bank Account
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Instant Bank Personal Checking -8976
                      </Typography>
                    </Paper>

                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Payment color="primary" />
                      Payment Amount
                    </Typography>

                    <FormControl component="form" onSubmit={handleSubmit} fullWidth>
                      <RadioGroup
                        name="option"
                        value={formData.option}
                        onChange={handleOnChange}
                      >
                        {/* Minimum Payment */}
                        <FormControlLabel
                          value="minimum_payment"
                          control={<Radio color="primary" />}
                          label={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                              <Typography variant="body1" fontWeight="medium">
                                Minimum Payment Due
                              </Typography>
                              <Typography variant="body1" color="primary" fontWeight="bold">
                                ${bal.minimum_payment.toFixed(2)}
                              </Typography>
                            </Box>
                          }
                          sx={{ 
                            mb: 2,
                            p: 2,
                            border: '1px solid',
                            borderColor: formData.option === 'minimum_payment' ? 'primary.main' : 'grey.300',
                            borderRadius: 2,
                            backgroundColor: formData.option === 'minimum_payment' ? 'primary.light' : 'transparent',
                            color: formData.option === 'minimum_payment' ? 'white' : 'inherit',
                            '& .MuiTypography-root': {
                              color: formData.option === 'minimum_payment' ? 'white' : 'inherit'
                            }
                          }}
                        />

                        {/* Statement Balance */}
                        <FormControlLabel
                          value="statement_balance"
                          control={<Radio color="primary" />}
                          label={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                              <Typography variant="body1" fontWeight="medium">
                                Pay Statement Balance
                              </Typography>
                              <Typography variant="body1" color="primary" fontWeight="bold">
                                ${bal.statement_balance.toFixed(2)}
                              </Typography>
                            </Box>
                          }
                          sx={{ 
                            mb: 2,
                            p: 2,
                            border: '1px solid',
                            borderColor: formData.option === 'statement_balance' ? 'primary.main' : 'grey.300',
                            borderRadius: 2,
                            backgroundColor: formData.option === 'statement_balance' ? 'primary.light' : 'transparent',
                            color: formData.option === 'statement_balance' ? 'white' : 'inherit',
                            '& .MuiTypography-root': {
                              color: formData.option === 'statement_balance' ? 'white' : 'inherit'
                            }
                          }}
                        />

                        {/* Total Balance */}
                        <FormControlLabel
                          value="total_balance"
                          control={<Radio color="primary" />}
                          label={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                              <Typography variant="body1" fontWeight="medium">
                                Pay Total Balance
                              </Typography>
                              <Typography variant="body1" color="primary" fontWeight="bold">
                                ${bal.total_balance.toFixed(2)}
                              </Typography>
                            </Box>
                          }
                          sx={{ 
                            mb: 2,
                            p: 2,
                            border: '1px solid',
                            borderColor: formData.option === 'total_balance' ? 'primary.main' : 'grey.300',
                            borderRadius: 2,
                            backgroundColor: formData.option === 'total_balance' ? 'primary.light' : 'transparent',
                            color: formData.option === 'total_balance' ? 'white' : 'inherit',
                            '& .MuiTypography-root': {
                              color: formData.option === 'total_balance' ? 'white' : 'inherit'
                            }
                          }}
                        />

                        {/* Other Amount */}
                        <FormControlLabel
                          value="other_amount"
                          control={<Radio color="primary" />}
                          label={
                            <Typography variant="body1" fontWeight="medium">
                              Pay Other Amount
                            </Typography>
                          }
                          sx={{ 
                            mb: 2,
                            p: 2,
                            border: '1px solid',
                            borderColor: formData.option === 'other_amount' ? 'primary.main' : 'grey.300',
                            borderRadius: 2,
                            backgroundColor: formData.option === 'other_amount' ? 'primary.light' : 'transparent',
                            color: formData.option === 'other_amount' ? 'white' : 'inherit'
                          }}
                        />
                      </RadioGroup>

                      {/* Other Amount Input */}
                      {formData.option === 'other_amount' && (
                        <TextField
                          fullWidth
                          name="payment"
                          value={formData.payment}
                          onChange={handleOnChange}
                          placeholder="0.00"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography variant="h6" color="text.primary">$</Typography>
                              </InputAdornment>
                            ),
                          }}
                          sx={{ 
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              fontSize: '1.1rem',
                              fontWeight: 'bold'
                            }
                          }}
                        />
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={processing}
                        startIcon={processing ? <CircularProgress size={20} /> : <Security />}
                        sx={{
                          py: 2,
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          bgcolor: 'secondary.main',
                          '&:hover': {
                            bgcolor: 'secondary.dark'
                          }
                        }}
                      >
                        {processing ? 'Processing Payment...' : 'Pay Now Securely'}
                      </Button>
                    </FormControl>
                  </CardContent>
                </Card>

                {/* Security Notice */}
                <Alert 
                  severity="success" 
                  icon={<CheckCircle />}
                  sx={{ borderRadius: 2 }}
                >
                  <Typography variant="body2">
                    Your payment is secure and encrypted. All transactions are protected.
                  </Typography>
                </Alert>
              </Stack>
            ))
          ) : (
            <Loading />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MakePayment;