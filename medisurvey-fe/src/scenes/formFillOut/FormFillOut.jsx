import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  TextField as MuiTextField,
  RadioGroup,
  FormControl,
  Button,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import Headeer from "../../components/Headeer";
import FormService from "../../services/doctorServices/FormService";
import SnackbarComponent from "../../components/SnackbarComponent";

export default function FormFillOut() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id, formId } = useParams();
  const location = useLocation();
  const selectedPatients = location.state?.selectedPatients || [];
  const formService = new FormService();
  const [formInfo, setFormInfo] = useState([]);
  console.log("Selected Patient To Fill Ou Form", selectedPatients);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const fetchFormInfo = async () => {
      try {
        const response = await formService.getFormInfo(formId);
        setFormInfo(response);
        console.log(response);
      } catch (error) {
        console.log("Form bilgileri getirilirken bir sorun oluştu: ", error);
      }
    };
    fetchFormInfo();
  }, []);

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
    console.log(answers);
  };

  const handleSave = async () => {
    try {
      const formattedQuestions = formInfo?.questions?.map((q, index) => ({
        question: q.question,
        answer: answers[index] || "", // cevabı state’ten alıyoruz
        type: q.type,
        level: 10,
        level_answers: 1,
      }));

      const data = {
        name: formInfo?.name,
        description: formInfo?.description,
        questions: formattedQuestions,
        type: formInfo?.type, 
        form_id: formInfo?.id || formId,
        patient_id: selectedPatients[0]?.id,
      };debugger;

      const response = await formService.formAnswer(data);
      console.log("Form başarıyla gönderildi:", response);
      setShowAlert(true)
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error("Form gönderilemedi:", error);
      alert("Form gönderilirken hata oluştu.");
    }
  };

  const handleCloseSnackbar =()=>{
    setShowAlert(false)
  }
  return (
    <Box>
      <Headeer
        title={"Fill Out Form"}
        subtitle={"Fill Out the Patient-Specific Form"}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            backgroundColor: colors.primary[400],
            width: "90%",
            p: 2,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", width: "90%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography sx={{ width: "30%" }}>Patient Name:</Typography>
              <TextField
                sx={{ width: "60%" }}
                value={selectedPatients[0]?.firstName}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography sx={{ width: "30%" }}>Patient Surname :</Typography>
              <TextField
                sx={{ width: "60%" }}
                value={selectedPatients[0]?.lastName}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", width: "90%", mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography sx={{ width: "30%" }}>File Name:</Typography>
              <TextField sx={{ width: "60%" }} value={formInfo?.File?.name} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Typography sx={{ width: "30%" }}>Form Name :</Typography>
              <TextField sx={{ width: "60%" }} value={formInfo?.name} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/*Form Kısmı Doldur*/}

      <Box sx={{ width: "90%", ml: 7, mt: 5 }}>
        <Box
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: `2px solid ${colors.primary[100]}`,
            borderTop: `4px solid ${colors.redAccent[300]}`,
            borderLeft: `4px solid ${colors.greenAccent[400]}`,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={formInfo?.name}
            InputProps={{
              style: { fontSize: "25px" },
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="standard"
            value={formInfo?.description}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 1 }}
          />
        </Box>
        <Box>
          {formInfo?.questions?.map((field, index) => (
            <Box key={index} sx={{ marginBottom: 3 }}>
              <Typography sx={{ mb: 1 }} variant="h6">
                Question {index + 1} :
              </Typography>
              <Box
                sx={{
                  borderRadius: 5,
                  boxShadow: 10,
                  border: `2px solid ${colors.primary[100]}`,
                  borderTop: `3px solid`,
                  borderLeft: `4px solid ${colors.greenAccent[400]}`,
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  sx={{ width: "80%", m: 2 }}
                  value={field.question}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {field.type === "text" && (
                  <TextField
                    onChange={(e) => {
                      handleAnswerChange(index, e.target.value);
                    }}
                    placeholder="Answer"
                    sx={{ width: "80%", m: 2 }}
                    fullWidth
                    variant="outlined"
                  />
                )}

                {field.type === "multiple_choice" && (
                  <Box sx={{ margin: 3 }}>
                    <FormControl fullWidth>
                      <RadioGroup
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                        value={answers[index] || ""}
                      >
                        {field.options.map((option, optionIdx) => (
                          <FormControlLabel
                            key={optionIdx}
                            value={option}
                            control={<Radio color="success" />}
                            label={option}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          onClick={handleSave}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <Button sx={{ backgroundColor: colors.greenAccent[400] }}>
            Save
          </Button>
        </Box>
        <SnackbarComponent severity={"success"} message={"Form Saved Successfully"} open={showAlert} autoHideDuration={3000} onClose={handleCloseSnackbar} />
      </Box>
    </Box>
  );
}
