import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Paper,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  InputAdornment
} from '@mui/material';
import {
  Help,
  Search,
  ContactSupport,
  LiveHelp,
  Article,
  Phone,
  Email,
  Chat,
  ExpandMore,
  Download,
  Star,
  ThumbUp,
  ThumbDown,
  Share,
  Bookmark,
  History,
  TrendingUp,
  Smartphone,
  Security,
  Payment,
  AccountBalance,
  Receipt,
  Lock,
  Speed
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
      id={`help-tabpanel-${index}`}
      aria-labelledby={`help-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const HelpCenter = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFAQExpand = (panel) => (event, isExpanded) => {
    setExpandedFAQ(isExpanded ? panel : false);
  };

  // Mock data for FAQs
  const faqCategories = [
    {
      id: 'account',
      title: 'Account Management',
      icon: <AccountBalance />,
      questions: [
        {
          question: "How do I update my personal information?",
          answer: "You can update your personal information by navigating to the Account Management section. Click on the 'Edit Profile' button to modify your name, email, phone number, and address details."
        },
        {
          question: "Can I have multiple business accounts?",
          answer: "Yes, you can manage multiple business accounts under one login. Contact our business support team to set up additional accounts and manage them from your dashboard."
        },
        {
          question: "How do I change my password?",
          answer: "Go to Account Management → Security tab → Click 'Change Password'. You'll need to verify your current password before setting a new one."
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: <Payment />,
      questions: [
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), bank transfers (ACH), and digital wallets. Business accounts also support wire transfers."
        },
        {
          question: "How long do payments take to process?",
          answer: "Credit card payments are instant. Bank transfers typically take 1-2 business days. Wire transfers are usually processed within 24 hours on business days."
        },
        {
          question: "Can I set up automatic payments?",
          answer: "Yes, you can enable auto-pay in the Payment Methods section. Choose your preferred payment method and set the payment amount and frequency."
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <Security />,
      questions: [
        {
          question: "Is my financial data secure?",
          answer: "Yes, we use bank-level 256-bit SSL encryption and comply with PCI DSS standards. All data is encrypted in transit and at rest."
        },
        {
          question: "How do I enable two-factor authentication?",
          answer: "Navigate to Account Management → Security tab → Two-Factor Authentication. Follow the setup wizard to enable 2FA using an authenticator app or SMS."
        },
        {
          question: "What should I do if I suspect unauthorized activity?",
          answer: "Immediately contact our 24/7 security team and dispute the transaction through the Disputes center. We recommend changing your password and reviewing recent activity."
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: <Speed />,
      questions: [
        {
          question: "The app is loading slowly, what should I do?",
          answer: "Try clearing your browser cache, ensure you have a stable internet connection, or try using our mobile app. If issues persist, contact technical support."
        },
        {
          question: "How do I download my transaction history?",
          answer: "Go to Activity → Click the download icon in the top right. You can export transactions as CSV, PDF, or Excel formats for any date range."
        },
        {
          question: "Is there a mobile app available?",
          answer: "Yes, our mobile app is available for both iOS and Android. You can download it from the App Store or Google Play Store."
        }
      ]
    }
  ];

  const popularArticles = [
    { title: "Setting Up Your Business Account", views: "12.4k", category: "Getting Started" },
    { title: "Understanding Payment Processing Fees", views: "8.7k", category: "Billing" },
    { title: "Mobile App Quick Start Guide", views: "7.2k", category: "Technical" },
    { title: "Security Best Practices", views: "6.9k", category: "Security" },
    { title: "Managing Multiple Users", views: "5.3k", category: "Account" }
  ];

  const contactMethods = [
    {
      icon: <Chat />,
      title: "Live Chat",
      description: "Instant help from our support team",
      availability: "Available 24/7",
      action: "Start Chat",
      color: "primary"
    },
    {
      icon: <Phone />,
      title: "Phone Support",
      description: "Speak directly with an agent",
      availability: "Mon-Fri 8AM-8PM EST",
      action: "Call Now",
      color: "secondary"
    },
    {
      icon: <Email />,
      title: "Email Support",
      description: "Detailed assistance via email",
      availability: "Response within 4 hours",
      action: "Send Email",
      color: "primary"
    }
  ];

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
                <Help />
                Help Center
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Find answers, guides, and contact support
              </Typography>
            </Box>

            {/* Search Section */}
            <Paper 
              elevation={2}
              sx={{ 
                p: 4, 
                mb: 4,
                background: 'linear-gradient(135deg, #1a5276 0%, #2e86ab 100%)',
                color: 'white',
                borderRadius: 3
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                How can we help you today?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                Search our knowledge base or browse help topics
              </Typography>
              <TextField
                fullWidth
                placeholder="Search for answers, guides, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    color: 'white',
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255,255,255,0.7)'
                    }
                  }
                }}
              />
            </Paper>

            {/* Quick Help Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Card 
                  elevation={2}
                  sx={{ 
                    textAlign: 'center',
                    p: 3,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s'
                    }
                  }}
                >
                  <Article sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Knowledge Base
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Browse articles and guides
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card 
                  elevation={2}
                  sx={{ 
                    textAlign: 'center',
                    p: 3,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s'
                    }
                  }}
                  onClick={() => setContactOpen(true)}
                >
                  <ContactSupport sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Contact Support
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get help from our team
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card 
                  elevation={2}
                  sx={{ 
                    textAlign: 'center',
                    p: 3,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s'
                    }
                  }}
                >
                  <LiveHelp sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Video Tutorials
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Watch step-by-step guides
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            {/* Tabs Navigation */}
            <Paper elevation={2}>
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
                <Tab icon={<Article />} label="FAQs" />
                <Tab icon={<TrendingUp />} label="Popular Articles" />
                <Tab icon={<ContactSupport />} label="Contact Support" />
                <Tab icon={<Smartphone />} label="Getting Started" />
              </Tabs>

              {/* FAQs Tab */}
              <TabPanel value={tabValue} index={0}>
                <Stack spacing={3}>
                  {faqCategories.map((category) => (
                    <Card key={category.id} elevation={1}>
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          gutterBottom 
                          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}
                        >
                          {category.icon}
                          {category.title}
                        </Typography>
                        
                        {category.questions.map((faq, index) => (
                          <Accordion 
                            key={index}
                            expanded={expandedFAQ === `${category.id}-${index}`}
                            onChange={handleFAQExpand(`${category.id}-${index}`)}
                            elevation={0}
                            sx={{
                              '&:before': { display: 'none' },
                              border: '1px solid',
                              borderColor: 'grey.200',
                              borderRadius: '8px !important',
                              mb: 1
                            }}
                          >
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="subtitle1" fontWeight="500">
                                {faq.question}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography variant="body2" color="text.secondary">
                                {faq.answer}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                <Tooltip title="Helpful">
                                  <IconButton size="small">
                                    <ThumbUp />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Not Helpful">
                                  <IconButton size="small">
                                    <ThumbDown />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Save">
                                  <IconButton size="small">
                                    <Bookmark />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Share">
                                  <IconButton size="small">
                                    <Share />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </TabPanel>

              {/* Popular Articles Tab */}
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                          <TrendingUp />
                          Most Popular Articles
                        </Typography>
                        
                        <List>
                          {popularArticles.map((article, index) => (
                            <ListItem 
                              key={index}
                              sx={{ 
                                border: '1px solid',
                                borderColor: 'grey.200',
                                borderRadius: 2,
                                mb: 1,
                                '&:hover': {
                                  backgroundColor: 'grey.50'
                                }
                              }}
                            >
                              <ListItemIcon>
                                <Star color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="subtitle1" fontWeight="500">
                                    {article.title}
                                  </Typography>
                                }
                                secondary={
                                  <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                    <Chip label={article.category} size="small" variant="outlined" />
                                    <Typography variant="body2" color="text.secondary">
                                      {article.views} views
                                    </Typography>
                                  </Box>
                                }
                              />
                              {/* <Button variant="text" startIcon={<Visibility />}>
                                Read
                              </Button> */}
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack spacing={3}>
                      <Card elevation={2}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Quick Downloads
                          </Typography>
                          <Stack spacing={1}>
                            <Button variant="outlined" startIcon={<Download />} fullWidth>
                              User Guide PDF
                            </Button>
                            <Button variant="outlined" startIcon={<Download />} fullWidth>
                              Security Checklist
                            </Button>
                            <Button variant="outlined" startIcon={<Download />} fullWidth>
                              API Documentation
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>

                      <Card elevation={2}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Recent Updates
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • New mobile app features (Jan 15)
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • Enhanced security protocols (Jan 10)
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • Payment processing updates (Jan 5)
                          </Typography>
                        </CardContent>
                      </Card>
                    </Stack>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Contact Support Tab */}
              <TabPanel value={tabValue} index={2}>
                <Grid container spacing={3}>
                  {contactMethods.map((method, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card 
                        elevation={2}
                        sx={{ 
                          textAlign: 'center',
                          p: 3,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <Box sx={{ color: `${method.color}.main`, mb: 2 }}>
                          {method.icon}
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {method.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                          {method.description}
                        </Typography>
                        <Chip 
                          label={method.availability} 
                          size="small" 
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                        <Button 
                          variant="contained" 
                          fullWidth
                          color={method.color}
                        >
                          {method.action}
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Card elevation={2} sx={{ mt: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <History />
                      Support History
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      You haven't contacted support recently. Your support tickets will appear here.
                    </Typography>
                  </CardContent>
                </Card>
              </TabPanel>

              {/* Getting Started Tab */}
              <TabPanel value={tabValue} index={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Smartphone />
                          First Time Setup
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText 
                              primary="1. Complete Your Profile"
                              secondary="Add your business information and verification documents"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="2. Set Up Payment Methods"
                              secondary="Connect your bank account or credit card"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="3. Configure Security Settings"
                              secondary="Enable two-factor authentication and set security questions"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="4. Explore Features"
                              secondary="Familiarize yourself with the dashboard and tools"
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Video Tutorials
                        </Typography>
                        <Stack spacing={2}>
                          {/* <Button variant="outlined" startIcon={<PlayArrow />} fullWidth>
                            Dashboard Overview
                          </Button>
                          <Button variant="outlined" startIcon={<PlayArrow />} fullWidth>
                            Making Your First Payment
                          </Button>
                          <Button variant="outlined" startIcon={<PlayArrow />} fullWidth>
                            Security Setup Guide
                          </Button>
                          <Button variant="outlined" startIcon={<PlayArrow />} fullWidth>
                            Mobile App Tutorial
                          </Button> */}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            </Paper>

            {/* Feedback Section */}
            <Paper 
              elevation={1}
              sx={{ 
                p: 3, 
                mt: 4,
                textAlign: 'center',
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom>
                Was this helpful?
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Help us improve our help center
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
                onClick={() => setFeedbackOpen(true)}
              >
                Give Feedback
              </Button>
            </Paper>
          </Container>
        </Box>
      </Box>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Share Your Feedback</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              How would you rate your experience with our help center?
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton key={star} color="primary">
                  <Star />
                </IconButton>
              ))}
            </Box>

            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="What can we improve? (optional)"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)}>Cancel</Button>
          <Button variant="contained">Submit Feedback</Button>
        </DialogActions>
      </Dialog>

      {/* Contact Support Dialog */}
      <Dialog open={contactOpen} onClose={() => setContactOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Contact Support</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Please provide details about your issue so we can help you better.
            </Typography>

            <TextField
              label="Subject"
              fullWidth
              placeholder="Brief description of your issue"
            />

            {/* <TextField
              label="Category"
              select
              fullWidth
              defaultValue=""
            >
              <MenuItem value="account">Account Issues</MenuItem>
              <MenuItem value="payment">Payment Problems</MenuItem>
              <MenuItem value="technical">Technical Support</MenuItem>
              <MenuItem value="billing">Billing Questions</MenuItem>
              <MenuItem value="security">Security Concerns</MenuItem>
            </TextField> */}

            <TextField
              multiline
              rows={4}
              fullWidth
              label="Description"
              placeholder="Please provide detailed information about your issue..."
            />

            {/* <Button variant="outlined" startIcon={<Upload />}>
              Attach Files (Optional)
            </Button> */}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactOpen(false)}>Cancel</Button>
          <Button variant="contained">Submit Request</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default HelpCenter;