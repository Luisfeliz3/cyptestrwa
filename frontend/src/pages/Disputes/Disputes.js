import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Chip,
  Stack,
  Divider,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Gavel,
  Add,
  Visibility,
  Edit,
  Cancel,
  CheckCircle,
  Pending,
  Warning,
  History,
  Upload,
  Description,
  CalendarToday,
  AccountBalance,
  Payment,
  Security
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

const Disputes = () => {
  const [newDisputeOpen, setNewDisputeOpen] = useState(false);
  const [disputeForm, setDisputeForm] = useState({
    transactionId: "",
    amount: "",
    reason: "",
    description: "",
    date: ""
  });
  const [activeStep, setActiveStep] = useState(0);

  // Mock data for disputes
  const disputes = [
    {
      id: "DP-001",
      transactionId: "TXN-789123",
      date: "2024-01-15",
      amount: "$245.67",
      reason: "Unauthorized Charge",
      status: "Under Review",
      statusColor: "warning",
      submitted: "2024-01-16"
    },
    {
      id: "DP-002",
      transactionId: "TXN-789124",
      date: "2024-01-10",
      amount: "$89.99",
      reason: "Duplicate Charge",
      status: "Resolved",
      statusColor: "success",
      submitted: "2024-01-11"
    },
    {
      id: "DP-003",
      transactionId: "TXN-789125",
      date: "2024-01-05",
      amount: "$156.32",
      reason: "Service Not Provided",
      status: "In Progress",
      statusColor: "info",
      submitted: "2024-01-06"
    }
  ];

  const disputeReasons = [
    "Unauthorized Charge",
    "Duplicate Charge",
    "Service Not Provided",
    "Product Not Received",
    "Incorrect Amount",
    "Fraudulent Transaction",
    "Other"
  ];

  const disputeSteps = [
    "Dispute Submitted",
    "Under Review",
    "Investigation in Progress",
    "Resolution"
  ];

  const handleNewDisputeOpen = () => {
    setNewDisputeOpen(true);
  };

  const handleNewDisputeClose = () => {
    setNewDisputeOpen(false);
    setDisputeForm({
      transactionId: "",
      amount: "",
      reason: "",
      description: "",
      date: ""
    });
    setActiveStep(0);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setDisputeForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitDispute = () => {
    // Here you would typically make an API call
    console.log("Submitting dispute:", disputeForm);
    // Mock submission success
    setActiveStep(3);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle color="success" />;
      case "Under Review":
        return <Pending color="warning" />;
      case "In Progress":
        return <History color="info" />;
      default:
        return <Warning color="action" />;
    }
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
                <Gavel />
                Dispute Center
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage and track your transaction disputes
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Quick Stats Cards */}
              <Grid item xs={12} md={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Active Disputes
                    </Typography>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                      2
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Resolved
                    </Typography>
                    <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>
                      1
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Under Review
                    </Typography>
                    <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>
                      1
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Total Amount
                    </Typography>
                    <Typography variant="h3" color="text.primary" sx={{ fontWeight: 'bold' }}>
                      $491.98
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* New Dispute Button */}
              <Grid item xs={12}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3, 
                    bgcolor: 'primary.light',
                    color: 'white',
                    borderRadius: 3
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Need to dispute a transaction?
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        File a new dispute for unauthorized charges, billing errors, or services not received.
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={handleNewDisputeOpen}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        fontWeight: 'bold',
                        px: 3,
                        '&:hover': {
                          bgcolor: 'grey.100'
                        }
                      }}
                    >
                      New Dispute
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              {/* Active Disputes Section */}
              <Grid item xs={12}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 3
                      }}
                    >
                      <History />
                      Active Disputes
                    </Typography>

                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Dispute ID</strong></TableCell>
                            <TableCell><strong>Transaction</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                            <TableCell><strong>Reason</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {disputes.map((dispute) => (
                            <TableRow key={dispute.id}>
                              <TableCell>
                                <Typography variant="body2" fontWeight="bold">
                                  {dispute.id}
                                </Typography>
                              </TableCell>
                              <TableCell>{dispute.transactionId}</TableCell>
                              <TableCell>{dispute.date}</TableCell>
                              <TableCell>
                                <Typography variant="body2" fontWeight="bold">
                                  {dispute.amount}
                                </Typography>
                              </TableCell>
                              <TableCell>{dispute.reason}</TableCell>
                              <TableCell>
                                <Chip
                                  icon={getStatusIcon(dispute.status)}
                                  label={dispute.status}
                                  color={dispute.statusColor}
                                  variant="outlined"
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                <Stack direction="row" spacing={1}>
                                  <Tooltip title="View Details">
                                    <IconButton size="small" color="primary">
                                      <Visibility />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Update Dispute">
                                    <IconButton size="small" color="primary">
                                      <Edit />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Dispute Process Guide */}
              <Grid item xs={12} md={6}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Security />
                      Dispute Process
                    </Typography>
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {disputeSteps.map((step, index) => (
                        <Step key={step}>
                          <StepLabel>{step}</StepLabel>
                          <StepContent>
                            <Typography variant="body2" color="text.secondary">
                              {index === 0 && "Your dispute has been submitted and is awaiting review."}
                              {index === 1 && "Our team is reviewing your dispute and gathering information."}
                              {index === 2 && "We are actively investigating the transaction with the merchant."}
                              {index === 3 && "A resolution has been reached for your dispute."}
                            </Typography>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </CardContent>
                </Card>
              </Grid>

              {/* Help Resources */}
              <Grid item xs={12} md={6}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Description />
                      Help Resources
                    </Typography>
                    <Stack spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<Description />}
                        fullWidth
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        Dispute Policy Guide
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<AccountBalance />}
                        fullWidth
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        Consumer Protection Rights
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Payment />}
                        fullWidth
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        Billing Dispute FAQ
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* New Dispute Dialog */}
      <Dialog 
        open={newDisputeOpen} 
        onClose={handleNewDisputeClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Gavel />
            File New Dispute
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Transaction ID"
                  name="transactionId"
                  value={disputeForm.transactionId}
                  onChange={handleFormChange}
                  placeholder="e.g., TXN-123456"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Transaction Date"
                  name="date"
                  type="date"
                  value={disputeForm.date}
                  onChange={handleFormChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Dispute Amount"
                  name="amount"
                  value={disputeForm.amount}
                  onChange={handleFormChange}
                  placeholder="0.00"
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Dispute Reason</InputLabel>
                  <Select
                    name="reason"
                    value={disputeForm.reason}
                    onChange={handleFormChange}
                    label="Dispute Reason"
                  >
                    {disputeReasons.map((reason) => (
                      <MenuItem key={reason} value={reason}>
                        {reason}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={disputeForm.description}
              onChange={handleFormChange}
              placeholder="Please provide detailed information about why you are disputing this transaction..."
            />

            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <Typography variant="body2">
                <strong>Note:</strong> Please have your supporting documents ready. 
                You may be asked to provide additional evidence such as receipts, emails, 
                or correspondence related to this transaction.
              </Typography>
            </Alert>

            <Button
              variant="outlined"
              startIcon={<Upload />}
              sx={{ alignSelf: 'flex-start' }}
            >
              Upload Supporting Documents
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={handleNewDisputeClose} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitDispute}
            disabled={!disputeForm.transactionId || !disputeForm.amount || !disputeForm.reason}
            startIcon={<CheckCircle />}
          >
            Submit Dispute
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Disputes;