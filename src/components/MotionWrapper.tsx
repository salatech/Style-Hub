import { motion } from 'framer-motion';
import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';
import { pageTransition, fadeIn, slideUp, slideIn, scaleIn } from '../utils/animationVariants';

interface MotionWrapperProps extends BoxProps {
  children: ReactNode;
  delay?: number;
  variant?: 'page' | 'fade' | 'slideUp' | 'slideIn' | 'scale';
  custom?: any;
}

const MotionWrapper = ({ 
  children, 
  delay = 0, 
  variant = 'fade',
  custom,
  ...props 
}: MotionWrapperProps) => {
  const variants = {
    page: pageTransition,
    fade: fadeIn,
    slideUp: slideUp,
    slideIn: slideIn,
    scale: scaleIn,
  };

  return (
    <Box
      component={motion.div}
      variants={variants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={custom}
      transition={{ delay }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default MotionWrapper; 