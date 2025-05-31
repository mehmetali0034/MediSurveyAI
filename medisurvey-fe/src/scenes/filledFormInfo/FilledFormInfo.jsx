import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import FormService from "../../services/doctorServices/FormService";
import { useParams } from "react-router-dom";
import { Box, TextField, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Headeer from "../../components/Headeer";

export default function FilledFormInfo() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formService = new FormService();
  const { formId } = useParams();
  const [formInfo, setFormInfo] = useState(null);

  useEffect(() => {
    const fetchFormInfo = async () => {
      try {
        const response = await formService.getAnsweredFormInfo(formId);
        setFormInfo(response);
      } catch (error) {
        console.log("Form bilgileri getirilirken bir sorun oluştu: ", error);
      }
    };
    fetchFormInfo();
  }, [formId]);

  if (!formInfo) return <div>Loading...</div>;

  // Form'daki sorular
  const questions = formInfo.questions;
  // Form tanımındaki sorular (options burada)
  const formQuestions = formInfo.Form?.questions || [];

  return (
    <Box>
      <Headeer title={"Form Information"} subtitle={"Filled Form Information Page"} />
      
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
          {questions.map((field, index) => {
            // Aynı indexteki formQuestions ile eşleştiriyoruz
            const formQuestion = formQuestions[index] || {};
            return (
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
                      value={field.answer}
                      sx={{ width: "80%", m: 2 }}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}

                  {field.type === "multiple_choice" && (
                    <Box sx={{ margin: 3 }}>
                      <FormControl fullWidth>
                        <RadioGroup value={field.answer}>
                          {(formQuestion.options || []).map((option, optionIdx) => (
                            <FormControlLabel
                              key={optionIdx}
                              value={option}
                              control={<Radio color="success" />}
                              label={option}
                              disabled
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
