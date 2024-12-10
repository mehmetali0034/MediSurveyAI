import React from "react";
import Headeer from "../../components/Headeer";
import { Box, Button, IconButton, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import StatBox from "../../components/StatBox";
import EmailIcon from "@mui/icons-material/Email";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import { mockTransactions } from "../../data/mockData";
import BarChart from "../../components/BarChart";
import GeoChart from "../../components/GeoChart";
import ProgressCircle from "../../components/ProgressCircle";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box marginLeft={2} marginRight={2}>
      <Box display="flex" justifyContent="space-between">
        <Headeer title="Dashboard" subtitle="Welcome to Your Dashboard" />
        <Box mt={2}>
          <Button
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
          </Button>
        </Box>
      </Box>
      {/*Section 2*/}
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="30px">
        <Box sx={{ gridColumn: "span 1" }}>
          <StatBox
            title="12,361"
            subtitle="Email Sent"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
            progress="0.75"
            increase="14"
          />
        </Box>
        <Box sx={{ gridColumn: "span 1" }}>
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            icon={
              <MonetizationOnOutlinedIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
            progress="0.75"
            increase="21"
          />
        </Box>
        <Box sx={{ gridColumn: "span 1" }}>
          <StatBox
            title="32,441"
            subtitle="New Clients"
            icon={
              <PersonAddAltIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
            progress="0.30"
            increase="5"
          />
        </Box>
        <Box sx={{ gridColumn: "span 1" }}>
          <StatBox
            title="1,325,134"
            subtitle="Traffic Recaived"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[400], fontSize: "26px" }}
              />
            }
            progress="0.55"
            increase="43"
          />
        </Box>
      </Box>
      {/*Section 3*/}
      <Box mt={2}>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="30px">
          <Box
            sx={{ gridColumn: "span 2", backgroundColor: colors.primary[400] }}
          >
            <Box display="flex" justifyContent="space-between">
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
            <Box height="250px">
              <LineChart isDashboard={true} />
            </Box>
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
              <Typography variant="h6" ml={2} mt={2}>
                Recent Transaction
              </Typography>
            </Box>
            {mockTransactions.map((m, index) => (
              <Box
                m={2}
                display="flex"
                justifyContent="space-between"
                key={index}
              >
                <Box>
                  <Typography>{m.txId}</Typography>
                  <Typography>{m.user}</Typography>
                </Box>
                {m.date}
                <Box
                  sx={{
                    backgroundColor: colors.greenAccent[400],
                    width: 60,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  {m.cost}
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
          <Box
            sx={{ backgroundColor: colors.primary[400] }}
            gridColumn="span 1"
          >
            <Typography p={3} variant="h5">
              Campagain
            </Typography>
            <Box mt={7} display="flex" alignItems="center" justifyContent="center">
              <ProgressCircle progress="0.44" size="125"/>
            </Box>
          </Box>
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
          <Box
            sx={{ backgroundColor: colors.primary[400] }}
            gridColumn="span 1"
            
          >
            <Typography p={2} variant="h5">Geography Based Traffic</Typography>
            <Box  height="200px"  >
              <GeoChart  isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
