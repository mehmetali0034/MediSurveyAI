import { useTheme } from '@emotion/react';
import React from 'react'
import { tokens } from '../theme';
import { Box, Button } from '@mui/material';

export default function Buttonn({onClick,disabled,children }) {
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Button 
      onClick={onClick} 
      disabled={disabled || false}
      sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': {
            backgroundColor: colors.blueAccent[600], // Hover durumunda biraz daha açık renk
          },
            }}>{children}</Button>

    </Box>
  )
}
