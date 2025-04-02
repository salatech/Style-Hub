import { Box, Skeleton, Card } from '@mui/material';

const ProductCardSkeleton = () => {
  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 2,
      '&:hover': {
        transform: 'translateY(-4px)',
        transition: 'transform 0.3s ease-in-out'
      }
    }}>
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={200}
        sx={{ borderRadius: 2, mb: 2 }}
      />
      <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="40%" height={24} sx={{ mb: 1 }} />
      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 1 }} />
      </Box>
    </Card>
  );
};

export default ProductCardSkeleton; 