import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Chip,
} from '@mui/material';
import { RootState } from '../features/store';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const mockOrders = [
  {
    id: '1',
    date: '2024-03-28',
    status: 'Delivered',
    total: 1299.99,
    items: [
      {
        name: 'Modern Sofa',
        quantity: 1,
        price: 899.99,
      },
      {
        name: 'Coffee Table',
        quantity: 1,
        price: 400.00,
      },
    ],
  },
  {
    id: '2',
    date: '2024-03-15',
    status: 'Processing',
    total: 799.99,
    items: [
      {
        name: 'Dining Table Set',
        quantity: 1,
        price: 799.99,
      },
    ],
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useSelector((state: RootState) => state.auth);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleProfileUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real application, you would make an API call here to update the profile
    console.log('Profile update:', profileForm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Orders" />
          <Tab label="Profile" />
        </Tabs>

        {activeTab === 0 ? (
          <Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        {order.items.map((item, index) => (
                          <Box key={index} sx={{ mb: 1 }}>
                            {item.name} x {item.quantity}
                          </Box>
                        ))}
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={order.status === 'Delivered' ? 'success' : 'warning'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={profileForm.firstName}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={profileForm.lastName}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={profileForm.email}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleProfileUpdate}
              sx={{ alignSelf: 'flex-start' }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard; 