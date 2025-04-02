import { Box, Skeleton } from '@mui/material';

interface ProductImageSkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
}

const ProductImageSkeleton = ({ 
  width = '100%', 
  height = '100%',
  borderRadius = 2 
}: ProductImageSkeletonProps) => {
  return (
    <Box sx={{ position: 'relative', width, height }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{
          borderRadius,
          bgcolor: 'rgba(0, 0, 0, 0.08)',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            transform: 'translateX(-100%)',
            backgroundImage: `linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.2) 20%,
              rgba(255, 255, 255, 0.5) 60%,
              rgba(255, 255, 255, 0)
            )`,
            animation: 'shimmer 2s infinite',
          },
        }}
      />
    </Box>
  );
};

export default ProductImageSkeleton; 