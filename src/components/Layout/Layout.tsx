import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100vw'
    }}>
      <Header />
      <Box 
        component="main" 
        sx={{ 
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ 
          width: '100%',
          mx: 'auto'
        }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 