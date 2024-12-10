import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material'
import React from 'react'
import { tokens } from '../theme';
export default function Headeer(props) {
    const {title,subtitle} = props;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
  return (
    <Box  marginBottom={5} >
        <Typography
        variant='h2'
        color={colors.grey[100]}
        fontWeight="bold"
        marginLeft={1}>
            {title}
        </Typography>
        <Typography
        variant="h5" color={colors.greenAccent[400]} marginLeft={1}>
            {subtitle}
        </Typography>
    </Box>
  )
}
