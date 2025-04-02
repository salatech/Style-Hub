import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  message: yup.string().required('Message is required'),
});

const About = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // In a real application, you would send this to your backend
      console.log('Contact form submission:', values);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      resetForm();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    },
  });

  return (
    <Box sx={{  }}>
      <Box sx={{ display: 'flex', gap: 6 , width:"85%", margin:"auto", py:4 }}>
        {/* About Section */}
        <Box sx={{ flex: '0 0 50%' }}>
          <Typography variant="h4" gutterBottom>
            About Home Deco
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Home Deco, your premier destination for modern and
            comfortable furniture. Since our establishment in 2010, we've been
            dedicated to helping our customers create their dream living spaces
            with carefully curated collections of high-quality furniture.
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to provide exceptional furniture pieces that combine
            style, comfort, and durability at affordable prices. We believe that
            everyone deserves to live in a space they love, and we're here to
            help make that possible.
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>Curated selection of high-quality furniture</li>
              <li>Competitive prices and regular promotions</li>
              <li>Expert customer service</li>
              <li>Fast and reliable delivery</li>
              <li>Easy returns and exchanges</li>
            </ul>
          </Typography>
        </Box>

        {/* Contact Form Section */}
        <Box sx={{ flex: '0 0 50%' }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </Typography>

            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for your message. We'll get back to you soon!
              </Alert>
            )}

            <Box component="form" onSubmit={formik.handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Your Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  fullWidth
                  id="message"
                  name="message"
                  label="Message"
                  multiline
                  rows={4}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.message && Boolean(formik.errors.message)
                  }
                  helperText={formik.touched.message && formik.errors.message}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default About; 