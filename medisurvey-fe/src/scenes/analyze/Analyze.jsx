import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  CircularProgress,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Headeer from "../../components/Headeer";
import MrService from "../../services/doctorServices/MrService";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

export default function Analyze() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { mrId } = useParams();
  const mrService = new MrService();

  const [selectedSegments, setSelectedSegments] = useState({
    merged: false,
    femur: false,
    tibia: false,
    fibula: false,
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSegments((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setResults([]);
    try {
      const requests = [];
      const resultsTemp = [];

      if (selectedSegments.merged) {
        requests.push(
          mrService.segmentMerged(mrId).then((res) => {
            resultsTemp.push({ type: "merged", result: res.analysis });
          })
        );
      }
      if (selectedSegments.femur) {
        requests.push(
          mrService.segmentFemur(mrId).then((res) => {
            resultsTemp.push({ type: "femur", result: res.analysis });
          })
        );
      }
      if (selectedSegments.tibia) {
        requests.push(
          mrService.segmentTibia(mrId).then((res) => {
            resultsTemp.push({ type: "tibia", result: res.analysis });
          })
        );
      }
      if (selectedSegments.fibula) {
        requests.push(
          mrService.segmentFibula(mrId).then((res) => {
            resultsTemp.push({ type: "fibula", result: res.analysis });
          })
        );
      }

      await Promise.all(requests);
      setResults(resultsTemp);
    } catch (err) {
      console.error("Analiz sırasında hata:", err);
      alert("Analiz sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Headeer title="MR Analyze" subtitle="Select segment(s) to analyze" />

      <FormGroup row sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSegments.femur}
              onChange={handleCheckboxChange}
              name="femur"
              color="success"
            />
          }
          label="Femur"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSegments.tibia}
              onChange={handleCheckboxChange}
              name="tibia"
              color="success"
            />
          }
          label="Tibia"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSegments.fibula}
              onChange={handleCheckboxChange}
              name="fibula"
              color="success"
            />
          }
          label="Fibula"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedSegments.merged}
              onChange={handleCheckboxChange}
              name="merged"
              color="success"
            />
          }
          label="All (Merged)"
        />
      </FormGroup>

      <Button
        variant="contained"
        onClick={handleAnalyze}
        disabled={loading}
        sx={{ backgroundColor: colors.greenAccent[600] }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Analyze Selected"
        )}
      </Button>

      {results.map((res, idx) => (
        <Paper
          key={idx}
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: colors.primary[400],
            width: "95%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{ display: "flex", width: "45%", flexDirection: "column" }}
            >
              {res.result.output_image && (
                <Box>
                  <Typography
                    sx={{
                      mt: 2,
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    <ImageSearchIcon sx={{ mr: 1 }} /> Analysis Image :
                  </Typography>

                  <Box
                    component="img"
                    src={`http://localhost:4000/output/${res.result.output_image}`}
                    alt={`${res.type} result`}
                    sx={{
                      width: "100%",
                      maxWidth: 600,
                      mt: 1,
                      borderRadius: 2,
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "45%",
                alignItems: "center",
                justifyContent: "center",
                mr: 4,
              }}
            >
              <Typography variant="h2" sx={{ mb: 2 }}>
                🔍 {res.type.toUpperCase()} Analysis Result
              </Typography>

              <Typography sx={{ mt: 2, fontWeight: "bold" }}>Boxes</Typography>

              <Table sx={{ mt: 1 }} size="small" aria-label="bounding boxes">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Bone</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>X</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Y</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Width</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Height</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {res.result.boxes?.map((box, i) => (
                    <TableRow key={i}>
                      <TableCell>{box.bone}</TableCell>
                      <TableCell align="right">{box.box[0]}</TableCell>
                      <TableCell align="right">{box.box[1]}</TableCell>
                      <TableCell align="right">{box.box[2]}</TableCell>
                      <TableCell align="right">{box.box[3]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
