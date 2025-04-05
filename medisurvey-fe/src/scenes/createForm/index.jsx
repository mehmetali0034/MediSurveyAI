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
import { useFormik } from "formik";
import * as Yup from "yup";
import { tokens } from "../../theme";
import Headeer from "../../components/Headeer";

export default function Index() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Soruları saklayacak state
  const [title, setTitle] = useState("Başlıksız Form");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);

  // Formik initialValues
  const initialValues = {formTitle:title,formDescription:description};
  const validationSchemaFields = {};

  fields.forEach((field) => {
    initialValues[field.label] = "";
    // Metin soruları için validation yapılmasın
    if (field.type !== "text" && field.required) {
      validationSchemaFields[field.label] =
        Yup.string().required("Zorunlu alan");
    }
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaFields),
    onSubmit: (values, { resetForm }) => {
      console.log("Formik Errors:", formik.errors); // Hata mesajlarını kontrol et
      console.log("Form verisi:", values);
      alert("Form başarıyla gönderildi!");
      resetForm();
      setFields([]);
    },
  });

  // Metin sorusu ekleme
  const handleAddTextQuestion = () => {
    const newField = {
      label: `Text Soru ${fields.length + 1}`,
      type: "text",
      required: true,
      question: "", // Soru metnini tutacak alan
      isEditable: false, // Cevap yazma özelliği kapalı
    };
    setFields([...fields, newField]);
    formik.setValues({ ...formik.values, [newField.label]: "" });
  };

  // Çoktan seçmeli soru ekleme
  const handleAddMultipleChoiceQuestion = () => {
    const newField = {
      label: `Çoktan Seçmeli Soru ${fields.length + 1}`,
      type: "multiple_choice",
      options: ["Seçenek 1", "Seçenek 2", "Seçenek 3"], // Başlangıçta 3 seçenek
      required: true,
      question: "", // Soru metnini tutacak alan
      isEditable: true, // Cevap yazılabilir
    };
    setFields([...fields, newField]);
    formik.setValues({ ...formik.values, [newField.label]: "" });
  };

  // Seçenek ekleme
  const handleAddOption = (fieldLabel) => {
    const updatedFields = fields.map((field) =>
      field.label === fieldLabel
        ? { ...field, options: [...field.options, ""] } // Yeni bir boş seçenek ekliyoruz
        : field
    );
    setFields(updatedFields);
  };

  // Seçeneği güncelleme
  const handleOptionChange = (fieldLabel, index, value) => {
    const updatedFields = fields.map((field) =>
      field.label === fieldLabel
        ? {
            ...field,
            options: field.options.map((option, i) =>
              i === index ? value : option
            ),
          }
        : field
    );
    setFields(updatedFields);
  };

  // Soru metnini değiştirme
  const handleQuestionChange = (fieldLabel, value) => {
    const updatedFields = fields.map((field) =>
      field.label === fieldLabel
        ? {
            ...field,
            question: value, // Soru metnini güncelle
          }
        : field
    );
    setFields(updatedFields);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Headeer
        title={"Create Form"}
        subtitle={"Create Form To Send Patients"}
      />

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{mb:3,borderRadius:3}}>
        <TextField
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            style: { fontSize: "25px",  }, // Font büyüklüğünü artır
          }}
        />

        <TextField
          fullWidth
          variant="standard"
          value={description}
          label="From Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          
        />
        </Box>
        {fields.map((field, index) => (
          <div key={index} style={{ marginBottom: 20 }}>
            <Typography variant="h6" gutterBottom>
              {field.label}
            </Typography>
            <Box
              sx={{
                borderRadius: 5,
                boxShadow: 10,
                border: `2px solid ${colors.primary[100]}`,
                borderTop: `3px solid`,
              }}
            >
              {/* Soru metni için input */}
              <TextField
                fullWidth
                variant="outlined"
                label="Soru Metnini Girin"
                sx={{ width: "80%", m: 2 }}
                value={field.question}
                onChange={(e) =>
                  handleQuestionChange(field.label, e.target.value)
                }
                margin="normal"
              />

              {field.type === "text" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  name={field.label}
                  sx={{ width: "80%", m: 2, mt: 0 }}
                  value={formik.values[field.label]}
                  InputProps={{
                    readOnly: !field.isEditable, // Eğer isEditable false ise input alanı readonly olur
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[field.label] &&
                    Boolean(formik.errors[field.label])
                  }
                  helperText={
                    formik.touched[field.label] && formik.errors[field.label]
                  }
                  placeholder="Cevap yazın"
                />
              )}

              <Box sx={{ margin: 3 }}>
                {field.type === "multiple_choice" && (
                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      name={field.label}
                      value={formik.values[field.label]}
                      onChange={formik.handleChange}
                    >
                      {field.options.map((option, idx) => (
                        <FormControlLabel
                          key={idx}
                          value={option}
                          control={<Radio disabled />}
                          label={
                            <MuiTextField
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(
                                  field.label,
                                  idx,
                                  e.target.value
                                )
                              }
                              label={`Seçenek ${idx + 1}`}
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
                      onClick={() => handleAddOption(field.label)}
                    >
                      Seçenek Ekle
                    </Button>
                  </FormControl>
                )}
              </Box>
            </Box>
          </div>
        ))}

        {/* Yeni soru ekleme butonları */}

        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleAddTextQuestion}
            sx={{
              marginRight: 2,
              backgroundColor: colors.blueAccent[600],
              color: "white",
            }}
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
        {fields.length > 0 && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginBottom: 2,
              marginLeft: "auto",
              display: "block",
              backgroundColor: colors.greenAccent[600],
            }}
          >
            Create
          </Button>
        )}
      </form>
    </Box>
  );
}
