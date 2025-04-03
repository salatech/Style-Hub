import { Box, Container, Typography, TextField, Button, Link, Snackbar, Alert } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleSubscribe = async () => {
    if (!email) {
      setSnackbar({
        open: true,
        message: 'Please enter your email address',
        severity: 'error'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address',
        severity: 'error'
      });
      return;
    }

    try {
      // Create a hidden form to submit the email
      const form = document.createElement('form');
      form.method = 'mailto:solahudeenbabatunde@gmail.com';
      form.action = 'mailto:solahudeenbabatunde@gmail.com';
      form.style.display = 'none';

      // Add subject and body as hidden inputs
      const subjectInput = document.createElement('input');
      subjectInput.type = 'hidden';
      subjectInput.name = 'subject';
      subjectInput.value = 'New Newsletter Subscription';
      form.appendChild(subjectInput);

      const bodyInput = document.createElement('input');
      bodyInput.type = 'hidden';
      bodyInput.name = 'body';
      bodyInput.value = `New subscription from: ${email}`;
      form.appendChild(bodyInput);

      // Add the form to the document and submit it
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      setSnackbar({
        open: true,
        message: 'Thank you for subscribing!',
        severity: 'success'
      });
      setEmail(''); // Clear the input
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to subscribe. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ bgcolor: '#1A1A1A', color: 'white', pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: '2fr repeat(3, 1fr)'
          },
          gap: { xs: 4, sm: 6, md: 4 },
          mb: { xs: 6, md: 8 }
        }}>
          {/* Brand and Description */}
          <Box sx={{ 
            gridColumn: { xs: '1', sm: '1 / -1', md: '1' }
          }}>
            <Typography variant="h4" sx={{ 
              mb: { xs: 2, md: 3 },
              fontSize: { xs: '1.75rem', md: '2rem' },
              fontWeight: 500
            }}>
              FurniSphere
            </Typography>
            <Typography sx={{ 
              color: 'rgba(255,255,255,0.7)',
              mb: { xs: 3, md: 4 },
              maxWidth: '400px',
              lineHeight: 1.7,
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}>
              We specialize in buying and selling high-quality, marketable furniture, each piece reflecting our unique aesthetic.
            </Typography>
            
            {/* Newsletter Subscription */}
            <Typography variant="h6" sx={{ 
              mb: 2,
              fontWeight: 500,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}>
              Subscribe to newsletter
            </Typography>
            <Box sx={{ 
              display: 'flex',
              bgcolor: 'rgba(255,255,255,0.1)',
              borderRadius: '50px',
              p: '4px',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 }
            }}>
              <Box sx={{ 
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                gap: 1,
                px: 2
              }}>
                <EmailIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                <TextField
                  placeholder="Enter your email"
                  variant="standard"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubscribe();
                    }
                  }}
                  sx={{
                    '& .MuiInput-root': {
                      color: 'white',
                      '&:before, &:after': { display: 'none' }
                    },
                    '& .MuiInput-input': {
                      p: 1,
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.5)',
                        opacity: 1
                      }
                    }
                  }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={handleSubscribe}
                sx={{
                  borderRadius: '50px',
                  px: 3,
                  py: { xs: 1, md: 1.5 },
                  bgcolor: 'white',
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)'
                  },
                  minWidth: { xs: '100%', sm: 'auto' }
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>

          {/* Quick Menu */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: { xs: 2, md: 3 },
              fontWeight: 500,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}>
              Quick Menu
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1.5, md: 2 }
            }}>
              {['Home', 'About us', 'Product', 'Collection', 'Contact us'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    '&:hover': { color: 'white' }
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Legal */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: { xs: 2, md: 3 },
              fontWeight: 500,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}>
              Legal
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1.5, md: 2 }
            }}>
              {['Privacy policy', 'Term and condition', 'Cookies policy'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    '&:hover': { color: 'white' }
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Resources */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: { xs: 2, md: 3 },
              fontWeight: 500,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}>
              Resources
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 1.5, md: 2 }
            }}>
              {['Documentation', 'Blog', 'Papers'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    '&:hover': { color: 'white' }
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Footer Bottom */}
        <Box sx={{ 
          pt: { xs: 3, md: 4 },
          mt: { xs: 3, md: 4 },
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: { xs: 3, sm: 0 }
        }}>
          <Typography sx={{ 
            color: 'rgba(255,255,255,0.7)',
            fontSize: { xs: '0.875rem', md: '1rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            © {new Date().getFullYear()} Copyright by Salatech
          </Typography>

          <Box sx={{ 
            display: 'flex',
            gap: { xs: 3, md: 2 },
            justifyContent: { xs: 'center', sm: 'flex-end' }
          }}>
            {[
              { icon: <TwitterIcon />, label: 'Twitter', link:"https://x.com/salatech2" },
              { icon: <FacebookIcon />, label: 'Facebook',link:"https://www.facebook.com/solahudeen.abdrahmon/" },
              { icon: <InstagramIcon />, label: 'Instagram',link:"https://instagram.com/salatech2" },
              { icon: <LinkedInIcon />, label: 'LinkedIn',link:"www.linkedin.com/in/solahudeen-abdulrahmon-000a41215" }
            ].map((social) => (
              <Link
                key={social.label}
                href={social.link}
                color="inherit"
                aria-label={social.label}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  p: { xs: 1.5, md: 1 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {social.icon}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer; 