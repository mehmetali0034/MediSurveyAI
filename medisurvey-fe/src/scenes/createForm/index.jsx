import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField as MuiTextField,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import Headeer from "../../components/Headeer";
import { useParams } from "react-router-dom";
import FormService from "../../services/doctorServices/FormService";

export default function Index() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const formService = new FormService();

  const [title, setTitle] = useState("Untitled Form");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);
  const [forPatients, setForPatients] = useState("");

  const initialValues = {
    name: "",
    description: "",
    type: "for patients",
    questions: [],
    file_id: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: title,
      description: description,
      questions: fields.map((field) => {
        const questionData = {
          question: field.question,
          type: field.type,
        };
        if (field.type === "multiple_choice") {
          questionData.options = field.options;
        }
        return questionData;
      }),
      type: forPatients,
      file_id: id,
    };

    const handleCreateForm = async (data) => {
      try {
        const response = await formService.createForm(data);
        console.log("Form başarıyla oluşturuldu:", response);
        alert("Form başarıyla gönderildi!");
        setTitle("Untitled Form"); 
        setDescription("");
        setFields([]);
      } catch (err) {
        console.error("Form oluşturulurken hata:", err);
        alert("Form oluşturulurken bir hata oluştu!");
      }

    };
    handleCreateForm(data);debugger
  };

  const handleAddTextQuestion = () => {
    const newField = {
      type: "text",
      question: "",
    };
    setFields([...fields, newField]);
  };

  const handleAddMultipleChoiceQuestion = () => {
    const newField = {
      type: "multiple_choice",
      options: ["Seçenek 1", "Seçenek 2", "Seçenek 3"],
      question: "",
    };
    setFields([...fields, newField]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].question = value;
    setFields(updatedFields);
  };

  const handleAddOption = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].options.push("");
    setFields(updatedFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = value;
    setFields(updatedFields);
  };

  const handleButtonClick = (type) => {
    setForPatients(type === "sendToPatient" ? "for patients" : "for me");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Headeer title={"Create Form"} subtitle={"Create Form For Patients"} />

      <form onSubmit={handleSubmit}>
        <Box>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{
                style: { fontSize: "25px" },
              }}
            />
            <TextField
              fullWidth
              variant="standard"
              label="Form Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mt: 1 }}
            />
          </Box>

          <Box>
            {fields.map((field, index) => (
              <Box key={index} sx={{ marginBottom: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Soru {index + 1}
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
                    label="Soru Metnini Girin"
                    sx={{ width: "80%", m: 2 }}
                    value={field.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                  />

                  {field.type === "multiple_choice" && (
                    <Box sx={{ margin: 3 }}>
                      <FormControl fullWidth>
                        <RadioGroup>
                          {field.options.map((option, optionIdx) => (
                            <FormControlLabel
                              key={optionIdx}
                              value={option}
                              control={<Radio disabled />}
                              label={
                                <MuiTextField
                                  value={option}
                                  onChange={(e) =>
                                    handleOptionChange(index, optionIdx, e.target.value)
                                  }
                                  label={`Seçenek ${optionIdx + 1}`}
                                  variant="outlined"
                                  fullWidth
                                />
                              }
                            />
                          ))}
                        </RadioGroup>

                        <Button
                          sx={{ mt: 2 }}
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleAddOption(index)}
                        >
                          Seçenek Ekle
                        </Button>
                      </FormControl>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}

            {fields.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ m: 1, backgroundColor: colors.greenAccent[600] }}
                  onClick={() => handleButtonClick("sendToPatient")}
                >
                  Create to Send Patient
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ m: 1, backgroundColor: colors.greenAccent[600] }}
                  onClick={() => handleButtonClick("fillYourself")}
                >
                  Create to Fill Yourself
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleAddTextQuestion}
              sx={{ marginRight: 2, backgroundColor: colors.blueAccent[600], color: "white" }}
            >
              Metin Sorusu Ekle
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleAddMultipleChoiceQuestion}
              sx={{ backgroundColor: colors.blueAccent[600], color: "white" }}
            >
              Çoktan Seçmeli Soru Ekle
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
