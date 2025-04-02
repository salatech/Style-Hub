import { Box, Skeleton, Paper, Avatar } from '@mui/material';

const ProductReviewsSkeleton = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Skeleton variant="text" width="40%" height={32} sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {[...Array(3)].map((_, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="20%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ProductReviewsSkeleton; 