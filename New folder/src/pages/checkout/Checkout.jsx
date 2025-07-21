import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Alert,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack,
  Lock,
  CreditCard,
  LocalShipping,
  CheckCircle,
} from '@mui/icons-material';
import { clearCart } from '../../redux/slices/cartSlice';

const steps = ['Shipping Information', 'Payment Method', 'Review Order'];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  
  const [activeStep, setActiveStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const [saveInfo, setSaveInfo] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    // Mock order placement
    setOrderPlaced(true);
    dispatch(clearCart());
    
    // In a real app, you would send order data to your backend
    setTimeout(() => {
      navigate('/orders');
    }, 3000);
  };

  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + tax;

  if (items.length === 0 && !orderPlaced) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">
          Your cart is empty. Please add items before proceeding to checkout.
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  if (orderPlaced) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            You will receive an email confirmation shortly.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="firstName"
                label="First Name"
                value={shippingInfo.firstName}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="lastName"
                label="Last Name"
                value={shippingInfo.lastName}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                value={shippingInfo.email}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone Number"
                value={shippingInfo.phone}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="city"
                label="City"
                value={shippingInfo.city}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="state"
                label="State/Province"
                value={shippingInfo.state}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="zipCode"
                label="Zip / Postal Code"
                value={shippingInfo.zipCode}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="country"
                label="Country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                  />
                }
                label="Save this information for next time"
              />
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Box>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Payment Method</FormLabel>
              <RadioGroup
                value={paymentInfo.paymentMethod}
                onChange={handlePaymentChange}
                name="paymentMethod"
              >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CreditCard sx={{ mr: 1 }} />
                      Credit/Debit Card
                    </Box>
                  }
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                />
              </RadioGroup>
            </FormControl>

            {paymentInfo.paymentMethod === 'card' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="nameOnCard"
                    label="Name on Card"
                    value={paymentInfo.nameOnCard}
                    onChange={handlePaymentChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cardNumber"
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="expiryDate"
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="cvv"
                    label="CVV"
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentChange}
                  />
                </Grid>
              </Grid>
            )}

            <Alert severity="info" sx={{ mt: 3 }}>
              <Lock sx={{ mr: 1 }} />
              Your payment information is secure and encrypted.
            </Alert>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            {/* Order Summary */}
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            {items.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: 60, objectFit: 'cover' }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="h6">${item.totalPrice.toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Shipping Information */}
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Typography variant="body1">
              {shippingInfo.firstName} {shippingInfo.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shippingInfo.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shippingInfo.country}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Payment Information */}
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1">
              {paymentInfo.paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}
            </Typography>
            {paymentInfo.paymentMethod === 'card' && (
              <Typography variant="body2" color="text.secondary">
                **** **** **** {paymentInfo.cardNumber.slice(-4)}
              </Typography>
            )}
          </Box>
        );
      
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/cart')}
          sx={{ mb: 2 }}
        >
          Back to Cart
        </Button>
        <Typography variant="h3" component="h1" gutterBottom>
          Checkout
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Checkout Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handlePlaceOrder}
                  startIcon={<Lock />}
                >
                  Place Order
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Order Summary Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Subtotal ({totalQuantity} items):
                </Typography>
                <Typography variant="body1">
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Shipping:
                </Typography>
                <Typography variant="body1" color="success.main">
                  Free
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Tax:
                </Typography>
                <Typography variant="body1">
                  ${tax.toFixed(2)}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                  Total:
                </Typography>
                <Typography variant="h6" color="primary">
                  ${finalTotal.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Alert severity="success" sx={{ mt: 2 }}>
              <LocalShipping sx={{ mr: 1 }} />
              Free shipping included!
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
