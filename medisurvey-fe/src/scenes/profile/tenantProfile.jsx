import React, { useEffect, useState } from 'react'
import TopbarOfTenant from '../tenant-global/TopbarTenant'
import { Box, Typography } from '@mui/material'
import TenantService from '../../services/tenantService'

export default function TenantProfile() {

  const [tenantInfo, setTenantInfo] = useState([])
  
  const tenantService = new TenantService();
  const tenantId = localStorage.getItem("tenantId") 
  const token = localStorage.getItem("tokenTenant")

  useEffect(()=>{
    tenantService.getTenantInfo(tenantId, token)
    .then((data=>{
      setTenantInfo(data);
      console.log(data)
  }))
  .catch((error) => {
    console.log("Doktor bilgileri çekilirken hata oluştu");
    // Daha ayrıntılı hata mesajı
    if (error.response) {
        console.log("Response error:", error.response);
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
    } else {
        console.log("Error message:", error.message);
    }
});

  },[token]);debugger

  return (
    <Box sx={{ width: "100%" }}>
        <TopbarOfTenant/>
        <Typography variant='h5'>
          Doktor Info : {tenantInfo.name}
        </Typography>
    </Box>
  )
}
