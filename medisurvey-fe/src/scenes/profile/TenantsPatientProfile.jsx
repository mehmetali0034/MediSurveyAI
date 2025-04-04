import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TenantService from '../../services/tenantService';
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';

export default function TenantsPatientProfile() {
     const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const tenantService = new TenantService();
      const token = localStorage.getItem("tokenTenant")
    const {id} = useParams();
    const [patientInfo, setPatientInfo] = useState([])

    useEffect(()=>{
        const fetchPatientInfo = async ()=>{
            try{
                const response = await tenantService.getPatinetInfo(id,token);
                setPatientInfo(response)
                console.log(response)
            }catch(error){
                console.log("Sorun var")
            }
        }
        fetchPatientInfo();
    },[])
  return (
    <div>
        <Typography variant='h3'>test</Typography>
    </div>
  )
}
