import { Box } from '@mui/material'
import React from 'react'
import Headeer from '../../components/Headeer'
import GeoChart from '../../components/GeoChart'
import { tokens } from '../../theme'
import { useTheme } from '@emotion/react'

export default function Geo() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  return (
    <Box marginLeft={2} marginRight={2}>
      <Headeer title="Geo Chart" subtitle="Simple Geography Chart" />
      <Box         height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px">
        <GeoChart/>
      </Box>


    </Box>
  )
}
