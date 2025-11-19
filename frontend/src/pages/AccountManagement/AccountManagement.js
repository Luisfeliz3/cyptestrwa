import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Settings,
  Security,
  Notifications,
  Payment,
  Person,
  Email,
  Phone,
  LocationOn,
  CreditCard,
  AccountBalance,
  Edit,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  QrCode,
  Download,
  History,
  Lock,
  Warning,
  CheckCircle
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LeftNav from "../../components/LeftNav/LeftNav";

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

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AccountManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [twoFactorOpen, setTwoFactorOpen] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    profile: {
      firstName: "Louis",
      lastName: "Phillips",
      email: "luis.feliz@business.com",
      phone: "+1 (555) 123-4567",
      company: "COMPUTER SERVICES",
      address: "123 Business Ave, Suite 400",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    security: {
      twoFactorEnabled: true,
      lastLogin: "2024-01-15 14:30",
      passwordLastChanged: "2023-12-01",
      securityQuestions: 3
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      monthlyStatements: true,
      paymentReminders: true,
      securityAlerts: true
    },
    paymentMethods: [
      {
        id: 1,
        type: "Bank Account",
        name: "Instant Bank Personal Checking",
        lastFour: "8976",
        primary: true
      },
      {
        id: 2,
        type: "Credit Card",
        name: "Prime Visa",
        lastFour: "1764",
        primary: false
      }
    ]
  });

  const [editForm, setEditForm] = useState(userData.profile);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      setUserData(prev => ({
        ...prev,
        profile: editForm
      }));
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (setting) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting]
      }
    }));
  };

  const handleSecurityChange = (setting) => {
    setUserData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [setting]: !prev.security[setting]
      }
    }));
  };

  const handleAddPaymentMethod = () => {
    // Implementation for adding new payment method
    console.log("Add new payment method");
  };

  const handleMakePrimary = (id) => {
    const updatedMethods = userData.paymentMethods.map(method => ({
      ...method,
      primary: method.id === id
    }));
    setUserData(prev => ({
      ...prev,
      paymentMethods: updatedMethods
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Left Navigation */}
        <LeftNav />
        
        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="xl">
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography 
                  variant="h4" 
                  color="primary" 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Settings />
                  Account Management
                </Typography>
                <Chip 
                  label="Business Account" 
                  color="primary" 
                  variant="outlined"
                />
              </Box>
              <Typography variant="body1" color="text.secondary">
                Manage your account settings, security preferences, and payment methods
              </Typography>
            </Box>

            {/* Tabs Navigation */}
            <Paper elevation={2} sx={{ mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    fontWeight: 'medium',
                    minHeight: 60
                  }
                }}
              >
                <Tab icon={<Person />} label="Profile" />
                <Tab icon={<Security />} label="Security" />
                <Tab icon={<Notifications />} label="Notifications" />
                <Tab icon={<Payment />} label="Payment Methods" />
                <Tab icon={<AccountBalance />} label="Billing" />
              </Tabs>

              {/* Profile Tab */}
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card elevation={2}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person />
                            Personal Information
                          </Typography>
                          <Button
                            startIcon={editMode ? <Save /> : <Edit />}
                            onClick={handleEditToggle}
                            variant={editMode ? "contained" : "outlined"}
                            color={editMode ? "secondary" : "primary"}
                          >
                            {editMode ? "Save Changes" : "Edit Profile"}
                          </Button>
                        </Box>

                        <Stack spacing={3}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={editForm.firstName}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={editForm.lastName}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              />
                            </Grid>
                          </Grid>

                          <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={editForm.email}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            InputProps={{
                              startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                          />

                          <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={editForm.phone}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            InputProps={{
                              startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                          />

                          <TextField
                            fullWidth
                            label="Company Name"
                            name="company"
                            value={editForm.company}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />

                          <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={editForm.address}
                            onChange={handleInputChange}
                            disabled={!editMode}
                            InputProps={{
                              startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                            }}
                          />

                          <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                              <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={editForm.city}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={editForm.state}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <TextField
                                fullWidth
                                label="ZIP Code"
                                name="zipCode"
                                value={editForm.zipCode}
                                onChange={handleInputChange}
                                disabled={!editMode}
                              />
                            </Grid>
                          </Grid>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={3}>
                      {/* Account Status */}
                      <Card elevation={2}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle color="success" />
                            Account Status
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemText primary="Verification Status" />
                              <Chip label="Verified" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Account Type" />
                              <Typography variant="body2" color="text.secondary">Business Premium</Typography>
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Member Since" />
                              <Typography variant="body2" color="text.secondary">Jan 2023</Typography>
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>

                      {/* Quick Actions */}
                      <Card elevation={2}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Quick Actions
                          </Typography>
                          <Stack spacing={1}>
                            <Button variant="outlined" startIcon={<Download />}>
                              Download Statements
                            </Button>
                            <Button variant="outlined" startIcon={<History />}>
                              View Account History
                            </Button>
                            <Button variant="outlined" startIcon={<QrCode />}>
                              Get Support
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Stack>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Security Tab */}
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                          <Security />
                          Security Settings
                        </Typography>

                        <Stack spacing={3}>
                          {/* Two-Factor Authentication */}
                          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  Two-Factor Authentication
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Add an extra layer of security to your account
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Chip 
                                  label={userData.security.twoFactorEnabled ? "Enabled" : "Disabled"} 
                                  color={userData.security.twoFactorEnabled ? "success" : "default"}
                                />
                                <Button
                                  variant="outlined"
                                  onClick={() => setTwoFactorOpen(true)}
                                >
                                  Configure
                                </Button>
                              </Box>
                            </Box>
                          </Paper>

                          {/* Password Management */}
                          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  Password
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Last changed {userData.security.passwordLastChanged}
                                </Typography>
                              </Box>
                              <Button
                                variant="outlined"
                                startIcon={<Lock />}
                                onClick={() => setChangePasswordOpen(true)}
                              >
                                Change Password
                              </Button>
                            </Box>
                          </Paper>

                          {/* Security Questions */}
                          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  Security Questions
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {userData.security.securityQuestions} questions set up
                                </Typography>
                              </Box>
                              <Button variant="outlined">
                                Manage Questions
                              </Button>
                            </Box>
                          </Paper>

                          {/* Recent Activity */}
                          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              Recent Security Activity
                            </Typography>
                            <List dense>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircle color="success" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary="Successful login" 
                                  secondary="New York, NY • Today, 14:30" 
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <CheckCircle color="success" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary="Password updated" 
                                  secondary="December 1, 2023" 
                                />
                              </ListItem>
                            </List>
                          </Paper>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Security Tips
                        </Typography>
                        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                          Use a strong, unique password for your account
                        </Alert>
                        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                          Enable two-factor authentication for extra security
                        </Alert>
                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                          Regularly review your account activity
                        </Alert>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Notifications Tab */}
              <TabPanel value={tabValue} index={2}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <Notifications />
                      Notification Preferences
                    </Typography>

                    <Stack spacing={3}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={userData.notifications.emailAlerts}
                            onChange={() => handleNotificationChange('emailAlerts')}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="subtitle1">Email Alerts</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Receive important account notifications via email
                            </Typography>
                          </Box>
                        }
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={userData.notifications.smsAlerts}
                            onChange={() => handleNotificationChange('smsAlerts')}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="subtitle1">SMS Alerts</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Get text messages for urgent security alerts
                            </Typography>
                          </Box>
                        }
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={userData.notifications.pushNotifications}
                            onChange={() => handleNotificationChange('pushNotifications')}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="subtitle1">Push Notifications</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Receive app notifications for account activity
                            </Typography>
                          </Box>
                        }
                      />

                      <Divider />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={userData.notifications.monthlyStatements}
                            onChange={() => handleNotificationChange('monthlyStatements')}
                            color="primary"
                          />
                        }
                        label="Monthly Statement Ready"
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={userData.notifications.paymentReminders}
                            onChange={() => handleNotificationChange('paymentReminders')}
                            color="primary"
                          />
                        }
                        label="Payment Due Reminders"
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={userData.notifications.securityAlerts}
                            onChange={() => handleNotificationChange('securityAlerts')}
                            color="primary"
                          />
                        }
                        label="Security Alerts"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </TabPanel>

              {/* Payment Methods Tab */}
              <TabPanel value={tabValue} index={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Payment />
                        Payment Methods
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={"<Add />"}
                        onClick={handleAddPaymentMethod}
                      >
                        Add Payment Method
                      </Button>
                    </Box>

                    <Stack spacing={2}>
                      {userData.paymentMethods.map((method) => (
                        <Paper key={method.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <CreditCard color="action" />
                              <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                  {method.name} (...{method.lastFour})
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {method.type}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {method.primary && (
                                <Chip label="Primary" color="primary" size="small" />
                              )}
                              {!method.primary && (
                                <Button
                                  size="small"
                                  onClick={() => handleMakePrimary(method.id)}
                                >
                                  Make Primary
                                </Button>
                              )}
                              <IconButton size="small">
                                <Visibility />
                              </IconButton>
                              <IconButton size="small" color="error">
                                <Cancel />
                              </IconButton>
                            </Box>
                          </Box>
                        </Paper>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </TabPanel>

              {/* Billing Tab */}
              <TabPanel value={tabValue} index={4}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                          <AccountBalance />
                          Billing Information
                        </Typography>
                        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                          Your next billing cycle starts on February 1, 2024
                        </Alert>
                        
                        <Stack spacing={3}>
                          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                              Current Plan: Business Premium
                            </Typography>
                            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                              $49.99/month
                            </Typography>
                          </Paper>

                          <Box>
                            <Typography variant="h6" gutterBottom>
                              Billing History
                            </Typography>
                            <List>
                              <ListItem>
                                <ListItemText 
                                  primary="January 2024" 
                                  secondary="Paid on Jan 1, 2024" 
                                />
                                <Typography variant="body1" fontWeight="bold">
                                  $49.99
                                </Typography>
                              </ListItem>
                              <ListItem>
                                <ListItemText 
                                  primary="December 2023" 
                                  secondary="Paid on Dec 1, 2023" 
                                />
                                <Typography variant="body1" fontWeight="bold">
                                  $49.99
                                </Typography>
                              </ListItem>
                            </List>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Billing Actions
                        </Typography>
                        <Stack spacing={2}>
                          <Button variant="outlined" startIcon={<Download />}>
                            Download Invoice
                          </Button>
                          <Button variant="outlined" startIcon={<Edit />}>
                            Update Billing Address
                          </Button>
                          <Button variant="outlined" startIcon={<History />}>
                            View Payment History
                          </Button>
                          <Button variant="contained" color="secondary">
                            Upgrade Plan
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            </Paper>
          </Container>
        </Box>
      </Box>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordOpen(false)}>Cancel</Button>
          <Button variant="contained">Update Password</Button>
        </DialogActions>
      </Dialog>

      {/* Two-Factor Setup Dialog */}
      <Dialog open={twoFactorOpen} onClose={() => setTwoFactorOpen(false)}>
        <DialogTitle>Two-Factor Authentication</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Set up two-factor authentication for added security
          </Typography>
          {/* Two-factor setup content would go here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTwoFactorOpen(false)}>Cancel</Button>
          <Button variant="contained">Enable 2FA</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default AccountManagement;