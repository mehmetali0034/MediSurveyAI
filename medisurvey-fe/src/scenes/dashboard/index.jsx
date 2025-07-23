import React, { useEffect, useState } from "react";
import Headeer from "../../components/Headeer";
import { Box, Button, IconButton, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import StatBox from "../../components/StatBox";
import EmailIcon from "@mui/icons-material/Email";
import LineChart from "../../components/LineChart";
import { mockTransactions } from "../../data/mockData";
import BarChart from "../../components/BarChart";
import GeoChart from "../../components/GeoChart";
import ProgressCircle from "../../components/ProgressCircle";
import DoctorService from "../../services/doctorService";
import Groups2Icon from "@mui/icons-material/Groups2";
import FileService from "../../services/doctorServices/FileService";
import FolderIcon from "@mui/icons-material/Folder";
import PatientService from "../../services/doctorServices/patientService";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import FormService from "../../services/doctorServices/FormService";
import DescriptionIcon from "@mui/icons-material/Description";
import GenderPieChart from "../../components/GenderPieChart";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const doctorId = localStorage.getItem("doctorId");
  const [doctorInfo, setDoctorInfo] = useState(null);
  const doctorService = new DoctorService();
  const patientServce = new PatientService();
  const fileService = new FileService();
  const formService = new FormService();
  const [files, setFiles] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctorsForms, setDoctorsForms] = useState([]);
  const [last8Patients, setLast8Patients] = useState([]);
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const info = await doctorService.getDoctorInfo();
        setDoctorInfo(info);
        console.log(info);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };
    const fetchAllFiles = async () => {
      try {
        const response = await fileService.getAllFiles();
        const doctorsFiles = response.filter(
          (file) => file.created_by === doctorId
        );
        setFiles(doctorsFiles);
      } catch (error) {
        console.log("File bilgilerini çekerken bir hata oluştu:", error);
      }
    };
    const fetchAllPatients = async () => {
      try {
        const response = await patientServce.getAllPatients();
        const doctorsPatients = response.patients.filter(
          (filter) => filter.doctorId === doctorId
        );
        setPatients(doctorsPatients);
        const sortedPatients = response.patients.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        const last8Patients = sortedPatients.slice(0, 8);
        setLast8Patients(last8Patients);
      } catch (error) {
        console.log("Hastalar getirilirken bir sorun yaşandı.", error);
      }
    };
    const fetchAllForms = async () => {
      try {
        const response = await formService.getAllForms();
        const doctorsForms = response.filter(
          (filter) => filter.created_by === doctorId
        );
        setDoctorsForms(doctorsForms);
      } catch (error) {
        console.log("Hastalar getirilirken bir sorun yaşandı.", error);
      }
    };
    fetchDoctorInfo();
    fetchAllFiles();
    fetchAllPatients();
    fetchAllForms();
  }, []);

  const formatDateTime = (isoString) => {
    const [date, time] = isoString.split("T");
    const [hour, minute] = time.split(":");
    return `${date}    ${hour}:${minute}`;
  };
  return (
    <Box marginLeft={2} marginRight={2}>
      <Box display="flex" justifyContent="space-between">
        <Headeer title="Dashboard" subtitle="Welcome to Your Dashboard" />
        <Box mt={2}>
          {/**  <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button> */}
          
        </Box>
      </Box>
      {/*Section 2*/}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="30px">
        <Box sx={{ gridColumn: "span 1" }}>
          <StatBox
            title={doctorInfo?.subDoctors?.length ?? ""}
            subtitle="Number Of Sub Doctors"
            icon={
              <Groups2Icon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box sx={{ gridColumn: "span 1" }}>
          <StatBox
            title={patients?.length ?? " "}
            subtitle="Total Number Of Patients"
            icon={
              <Diversity3Icon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
            progress="0.75"
            increase="14"
          />
        </Box>
        <Box sx={{ gridColumn: "span 1" }}>
          <StatBox
            title={files?.length ?? " "}
            subtitle="Total Number Of Files"
            icon={
              <FolderIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
            progress="0.75"
            increase="21"
          />
        </Box>
        <Box sx={{ gridColumn: "span 1" }}>
          <StatBox
            title={doctorsForms?.length ?? ""}
            subtitle="Total Number Of Forms"
            icon={
              <DescriptionIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      {/*Section 3*/}
      <Box mt={2}>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="30px">
            {/**
             * 
             * <Box display="flex" justifyContent="space-between">
              <Box margin={2} mb={0}>
                <Typography variant="h5">Revenue Generated</Typography>
                <Typography
                  color={colors.greenAccent[400]}
                  fontWeight="bold"
                  variant="h4"
                >
                  $59,324,234
                </Typography>
              </Box>
              <Box margin={2}>
                <IconButton>
                  <DownloadIcon sx={{ color: colors.greenAccent[400] }} />
                </IconButton>
              </Box>
            </Box>
             */}
          <Box
            sx={{ backgroundColor: colors.primary[400] }}
            gridColumn="span 2"
          >
            <Typography p={3} variant="h5">
              Gender Discrimination
            </Typography>
             <GenderPieChart patients={patients} />
          </Box>
          <Box
            sx={{
              gridColumn: "span 1",
              backgroundColor: colors.primary[400],
              overflowY: "auto", // Dikey scrollbar eklemek için
              maxHeight: "400px", // İsteğe bağlı: Maksimum yüksekliği sınırlamak için
            }}
          >
            <Box>
              <Typography
                variant="h4"
                ml={2}
                mt={2}
                fontWeight="bold"
                letterSpacing={1}
                sx={{
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                  display: "inline-block",
                  pb: 1,
                }}
              >
                Recent Registrations
              </Typography>
            </Box>
            {last8Patients.map((m, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                m={2}
              >
                {/* İsim - Soyisim Kutusu */}
                <Box sx={{ flexBasis: "30%", minWidth: "60px" }}>
                  <Typography fontWeight="bold">{m.firstName}</Typography>
                  <Typography>{m.lastName}</Typography>
                </Box>

                {/* Tarih Kutusu */}
                <Box
                  sx={{
                    flexBasis: "30%",
                    minWidth: "120px",
                    textAlign: "center",
                  }}
                >
                  <Typography color="textSecondary">
                    {formatDateTime(m.created_at)}
                  </Typography>
                </Box>

                {/* Dosya Sayısı Kutusu */}
                <Box
                  sx={{
                    flexBasis: "10%",
                    minWidth: "60px",
                    backgroundColor: colors.greenAccent[400],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1,
                    py: 0.5,
                  }}
                >
                  <Typography>{m.fileIds?.length}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        {/*Section 4*/}
        <Box
          mt={2}
          display="grid"
          gridTemplateColumns="repeat(3,1fr)"
          gap="30px"
        >
          
           {/*
           <Box
            sx={{ backgroundColor: colors.primary[400] }}
            gridColumn="span 1"
          >
            <Typography p={2} pb={0} variant="h5">
              Sales Quantity
            </Typography>
            <Box height="250px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
           */}
          
          {/**
           *  <Box
            sx={{ backgroundColor: colors.primary[400] }}
            gridColumn="span 1"
          >
            <Typography p={2} variant="h5">
              Geography Based Traffic
            </Typography>
            <Box height="200px">
              <GeoChart isDashboard={true} />
            </Box>
          </Box>
           */}
         
        </Box>
      </Box>
    </Box>
  );
}
