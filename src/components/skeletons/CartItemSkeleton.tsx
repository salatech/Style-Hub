import { Box, Skeleton, Paper } from '@mui/material';

const CartItemSkeleton = () => {
  return (
    <Paper sx={{ 
      p: { xs: 2, md: 3 },
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: { xs: 2, sm: 3 },
      alignItems: { sm: 'center' }
    }}>
      <Box sx={{ 
        width: { xs: '100%', sm: '180px' },
        height: { xs: '200px', sm: '180px' }
      }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          sx={{ borderRadius: 2 }}
        />
      </Box>
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="30%" height={24} />
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          mt: { xs: 1, md: 2 }
        }}>
          <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
    </Paper>
  );
};

export default CartItemSkeleton; 