import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userAPI from "../../utils/userAPI";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Alert,
  InputAdornment,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  Email,
  Lock,
  Person,
  Security,
  Visibility,
  VisibilityOff,
  Login,
  PersonAdd
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

const Loginn = ({ authenticate, setUserState }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await userAPI.loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 200) {
        setUserState(res.data);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          bgcolor: 'background.default', 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Container maxWidth="sm">
          <Stack spacing={3}>
            {/* Header Card */}
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                  <Security sx={{ fontSize: 40, color: 'primary.main' }} />
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    Payment Center
                  </Typography>
                </Box>
                <Typography variant="h6" color="text.secondary">
                  Secure Business Account Login
                </Typography>
              </CardContent>
            </Card>

            {/* Login Form Card */}
            <Card elevation={2}>
              <CardContent sx={{ p: 4 }}>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    textAlign: 'center', 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <Login color="primary" />
                  Login to Your Account
                </Typography>

                {/* Error Alert */}
                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleFormSubmit}>
                  <Stack spacing={3}>
                    {/* Email Field */}
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        gutterBottom 
                        fontWeight="medium"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Person color="primary" />
                        User ID
                      </Typography>
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Box>

                    {/* Password Field */}
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        gutterBottom 
                        fontWeight="medium"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Lock color="primary" />
                        Password
                      </Typography>
                      <TextField
                        fullWidth
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                onClick={handleTogglePassword}
                                sx={{ minWidth: 'auto', p: 1 }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Box>

                    {/* Login Button */}
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={!(formData.email && formData.password) || loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <Login />}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        bgcolor: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.dark'
                        }
                      }}
                    >
                      {loading ? 'Signing In...' : 'Log In'}
                    </Button>
                  </Stack>
                </form>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                {/* Signup Link */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Don't have an account?
                  </Typography>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="outlined"
                    fullWidth
                    startIcon={<PersonAdd />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      borderColor: 'secondary.main',
                      color: 'secondary.main',
                      '&:hover': {
                        bgcolor: 'secondary.main',
                        color: 'white',
                        borderColor: 'secondary.main'
                      }
                    }}
                  >
                    Create New Account
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Paper 
              elevation={1}
              sx={{ 
                p: 2, 
                textAlign: 'center',
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 2
              }}
            >
              <Typography variant="body2">
                🔒 Your security is our priority. All data is encrypted and protected.
              </Typography>
            </Paper>

            {/* GIF Embed */}
            <Box sx={{ textAlign: 'center' }}>
              <iframe 
                src="https://giphy.com/embed/TMZm4bE4M74TJBgeZm" 
                width="200" 
                height="200" 
                frameBorder="0" 
                style={{ borderRadius: '12px' }}
                allowFullScreen
              ></iframe>
            </Box>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Loginn;