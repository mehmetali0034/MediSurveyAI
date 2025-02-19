import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

export default function Line({ darkMode, setDarkMode }) {
  return (
    <Box m="20px">
      <Header title="Çizgi Grafiği" subtitle="Hasta Takip Verileri" />
      <Box height="75vh">
        <LineChart isDashboard={false} />
      </Box>
    </Box>
  );
}

