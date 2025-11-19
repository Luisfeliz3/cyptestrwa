import { useState, useEffect } from "react";
import API from "../../utils/API.js";
import * as React from "react";
import { 
  DataGrid, 
  gridClasses 
} from "@mui/x-data-grid";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Receipt,
  Info,
  Refresh
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Use the same theme from the previous component
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

function RecentActivity({ width, top }) {
  const [trsx, setTrsx] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    setLoading(true);
    API.getTransactions()
      .then((res) => {
        setTrsx(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const columns = [
    { 
      field: "date", 
      headerName: "DATE", 
      width: 150,
      headerClassName: 'data-grid-header',
      cellClassName: 'data-grid-cell',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2">
            {new Date(params.value).toLocaleDateString()}
          </Typography>
        </Tooltip>
      )
    },
    { 
      field: "description", 
      headerName: "DESCRIPTION", 
      width: 300,
      headerClassName: 'data-grid-header',
      cellClassName: 'data-grid-cell',
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2" noWrap>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    { 
      field: "amount", 
      headerName: "AMOUNT", 
      width: 130,
      headerClassName: 'data-grid-header',
      cellClassName: 'data-grid-cell',
      renderCell: (params) => {
        const amount = parseFloat(params.value);
        const isPositive = amount >= 0;
        return (
          <Chip
            label={`${isPositive ? '+' : ''}$${Math.abs(amount).toFixed(2)}`}
            size="small"
            color={isPositive ? 'success' : 'error'}
            variant="outlined"
            sx={{ 
              fontWeight: 'bold',
              borderWidth: '2px'
            }}
          />
        );
      }
    },
  ];

  const rows = trsx.data ? trsx.data.map((item, index) => ({
    ...item,
    id: item._id || index
  })) : [];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: width || '100%', mt: top || 0 }}>
        <Card 
          elevation={2} 
          sx={{ 
            bgcolor: 'background.paper',
            height: 400,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CardContent sx={{ pb: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 2 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Receipt color="primary" />
                <Typography variant="h6" color="primary">
                  Recent Activity
                </Typography>
                <Tooltip title="Number of transactions">
                  <Chip 
                    label={rows.length} 
                    size="small" 
                    color="primary"
                    variant="outlined"
                  />
                </Tooltip>
              </Box>
              
              <Tooltip title="Refresh transactions">
                <IconButton 
                  size="small" 
                  onClick={loadTransactions}
                  disabled={loading}
                  color="primary"
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>

          <Box sx={{ flex: 1, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
                sorting: {
                  sortModel: [{ field: 'date', sort: 'desc' }],
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid',
                  borderColor: 'grey.100',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'grey.50',
                  borderBottom: '2px solid',
                  borderColor: 'primary.main',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold',
                  color: 'primary.dark',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'grey.50',
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: '1px solid',
                  borderColor: 'grey.200',
                },
                '& .MuiCheckbox-root': {
                  color: 'primary.main',
                },
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                '& .MuiDataGrid-columnHeader:focus': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default RecentActivity;