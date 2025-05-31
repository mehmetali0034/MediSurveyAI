import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import Headeer from "../../components/Headeer";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function Faq() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ marginRight: 2 }}>
      <Headeer title="FAQ" subtitle="Frequently Asked Questions Page" />
      <Box>
        <Accordion >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color={colors.greenAccent[500]}>
            Can a doctor playing the doctor role who is not an admin create a master file?
            </Typography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Typography>
            The doctor in the Normal Doctor role cannot create a master file. Only the doctors with the Admin doctor role can create a master file.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
            <Typography variant="h5" color={colors.greenAccent[500]}>
              How Can I Display Answered Form By Patient? 
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can See Form that Answered by Patient in the Patient Profile Page.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color={colors.greenAccent[500]}>
              Which Type of MR Segmentation Can I Have? 
            </Typography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Typography>
              You Can Have Tibia, Femur, Fibule and Merged Type of MR Segmentation.
            </Typography>
          </AccordionDetails>
        </Accordion >
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color={colors.greenAccent[500]}>
              What is the Purpose of the Created form by Doctor in the File?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Purpose of the Created Form is Filling by Asking Patient and Filling by Doctor
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color={colors.greenAccent[500]}>
              The Final Question
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
