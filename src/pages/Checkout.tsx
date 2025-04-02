import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';
import { RootState } from '../features/store';

const steps = ['Shipping Information', 'Payment Information', 'Review Order'];

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real application, you would process the payment and create an order here
    console.log('Order submitted:', { shippingInfo, paymentInfo, items, total });
    navigate('/dashboard');
  };

  const renderShippingForm = () => (
    <Box component="form" onSubmit={handleNext}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          required
          label="First Name"
          name="firstName"
          value={shippingInfo.firstName}
          onChange={handleShippingChange}
          fullWidth
        />
        <TextField
          required
          label="Last Name"
          name="lastName"
          value={shippingInfo.lastName}
          onChange={handleShippingChange}
          fullWidth
        />
      </Box>
      <TextField
        required
        label="Email"
        name="email"
        type="email"
        value={shippingInfo.email}
        onChange={handleShippingChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Address"
        name="address"
        value={shippingInfo.address}
        onChange={handleShippingChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          required
          label="City"
          name="city"
          value={shippingInfo.city}
          onChange={handleShippingChange}
          fullWidth
        />
        <TextField
          required
          label="State"
          name="state"
          value={shippingInfo.state}
          onChange={handleShippingChange}
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          required
          label="ZIP Code"
          name="zipCode"
          value={shippingInfo.zipCode}
          onChange={handleShippingChange}
          fullWidth
        />
        <TextField
          required
          label="Phone"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleShippingChange}
          fullWidth
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
      >
        Next
      </Button>
    </Box>
  );

  const renderPaymentForm = () => (
    <Box component="form" onSubmit={handleNext}>
      <TextField
        required
        label="Card Number"
        name="cardNumber"
        value={paymentInfo.cardNumber}
        onChange={handlePaymentChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Cardholder Name"
        name="cardName"
        value={paymentInfo.cardName}
        onChange={handlePaymentChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          required
          label="Expiry Date"
          name="expiryDate"
          value={paymentInfo.expiryDate}
          onChange={handlePaymentChange}
          fullWidth
        />
        <TextField
          required
          label="CVV"
          name="cvv"
          value={paymentInfo.cvv}
          onChange={handlePaymentChange}
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          fullWidth
          size="large"
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
        >
          Next
        </Button>
      </Box>
    </Box>
  );

  const renderOrderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      {items.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>
            {item.name} x {item.quantity}
          </Typography>
          <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">${total.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          fullWidth
          size="large"
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          size="large"
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && renderShippingForm()}
        {activeStep === 1 && renderPaymentForm()}
        {activeStep === 2 && renderOrderReview()}
      </Paper>
    </Container>
  );
};

export default Checkout; 