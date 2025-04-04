import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TopbarOfTenant from '../tenant-global/TopbarTenant'
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import TenantService from '../../services/tenantService';
import { useParams } from 'react-router-dom';

export default function TenantsDoctorProfile() {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const { id } = useParams();
      const tenantService = new TenantService();
      const token = localStorage.getItem("tokenTenant") 
      const [doctorInfo, setDoctorInfo] = useState([])

    useEffect(()=>{
        const fetchDoctorInfo = async ()=>{
            try{
                const response = await tenantService.getDoctorInfo(id,token);
                setDoctorInfo(response)
                console.log(response)
            }catch(error){
                console.log("Bir sorun oluştu")
            }
        }
        fetchDoctorInfo();
    },)
  return (
    <Box sx={{width:"100%"}}>
        <TopbarOfTenant/>
        <Typography variant='h6'>{doctorInfo.name}</Typography>
    </Box>
  )
}
