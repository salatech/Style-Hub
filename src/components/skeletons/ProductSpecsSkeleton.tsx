import { Box, Skeleton, Paper } from '@mui/material';

const ProductSpecsSkeleton = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Skeleton variant="text" width="40%" height={32} sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[...Array(4)].map((_, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="text" width="30%" height={24} />
            <Skeleton variant="text" width="70%" height={24} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ProductSpecsSkeleton; 