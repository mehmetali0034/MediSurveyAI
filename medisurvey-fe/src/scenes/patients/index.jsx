import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DataGrid ,GridToolbar  } from '@mui/x-data-grid';
import Headeer from '../../components/Headeer';
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';
import Buttonn from '../../components/Buttonn';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from 'react-router-dom';
import PatientService from '../../services/patientService';

export default function Patients() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const patientService = new PatientService();
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 5,
    });
  const clickToAddPatients =()=>{
    navigate("/AddPatient")
  }

  
  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await patientService.getAllPatients();
        const formattedPatients = response.patients.map(patient => ({
          ...patient,
          doctorName: patient.Doctor ? `${patient.Doctor.name} ${patient.Doctor.surname}` : "N/A"
        }));
        setPatients(formattedPatients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPatients();
  }, []);
  
  const columns = [
    {
      field: 'firstName',
      headerName: 'Name',
      cellClassName: "name-column--cell",
      flex:1
     
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      cellClassName: "name-column--cell",
      flex:1
     
    },
    /* {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left', // Sütun başlığının sola hizalanması
      align: 'left', 
    }, */
    {
      field: 'email',
      headerName: 'Email',
      flex:1
    },
  
    {
      field: 'primaryPhone',
      headerName: 'Primary Phone',
      description: 'This column was created for users phone number',
      flex:1
    },
    {
      field: 'secondaryPhone',
      headerName: 'Secondary Phone',
      description: 'This column was created for users phone number',
      flex:1
    },
    {
      field: 'dateOfBirth',
      headerName: 'Date Of Birth',
      flex:1
      },
    {
      field: 'gender',
      headerName: 'Gender',
      flex:1
    },
    {
      field: 'doctorName',
      headerName: 'Doctor',
      flex:1
    },
  ];

  const handleCellClick =(params)=>{
    if(params.field === "firstName"){
      navigate(`/patients/${params.id}`)
    }

  }
  return (
    <Box sx={{ marginRight:2 }} >
      <Box sx={{display:"flex", justifyContent:"space-between",alignItems: "center"}}>
      <Headeer title="PATIENTS" subtitle="List of Contacts for Future Reference"/>
      <Buttonn onClick={clickToAddPatients}>
          Add Patients
          <AddCircleIcon sx={{ marginLeft: "8px" }} />
        </Buttonn>
      </Box>
  
      <Box
      height="120vh"
      sx={{
        "& .MuiDataGrid-columnHeaders":{
          backgroundColor: colors.blueAccent[700],
          borderBottom:"none"
        },
        "& .MuiDataGrid-footerContainer":{
          backgroundColor: colors.blueAccent[700],
          borderTop:"none"
        },
        "& .MuiCheckbox-root" : {
          color: colors.greenAccent[200],
        },
        "& .name-column--cell" : {
          color: colors.greenAccent[400]
        },
        "& .MuiButtonBase-root" : {
          color: colors.greenAccent[200]
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },//tablonun arka plan rengimni değiştirdim
        "& .MuiDataGrid-root" : {
          border : "none" //Tablo kenarı çizgelrin kaırılmaısnı sağlar
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",//Her satırın altındaki çizgilerin kaldırılmasını sağlar
        },

      }}>
        <DataGrid onCellClick={handleCellClick} checkboxSelection rows={patients}
        autoHeight
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowsPerPageOptions={[5]}
        columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  )
}
