import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import FormService from "../../services/doctorServices/FormService";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  TextField as MuiTextField,
  RadioGroup,
  FormControl,
  Button,
} from "@mui/material";
import Headeer from "../../components/Headeer";
import ConfirmationDialog from "../../components/ConfirmationDialog";

export default function FormEdit() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formService = new FormService();
  const { id, formId } = useParams();
  const [formInfo, setFormInfo] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormInfo = async () => {
      try {
        const response = await formService.getFormInfo(formId);
        setFormInfo(response);
      } catch (error) {
        console.log("Form bilgileri getirilirken bir sorun oluştu: ", error);
      }
    };
    fetchFormInfo();
  }, []);
  const handleDialogOpen =(type)=>{
    setDialogOpen(true)
    setDialogType(type)
  }
  const handleCloseDialog=()=>{
    setDialogOpen(false)
  }
  const handleCancel =()=>{
    navigate(-1)
  }
  const handleSave = async()=>{
    try{
      const response = await formService.updateForm(formId,formInfo);
      console.log("Form başarıyla güncellendi: ",response)
      navigate(-1)
    }catch(error){
      console.log("Form güncellenirken bir hata oluştu.")
    }
  }
  return (
    <Box>
      <Box>
        <Headeer title={"Form Edit"} subtitle={"You Can Edit Form Easily"} />
      </Box>
      <Box sx={{ width: "90%", ml: 6 }}>
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
          <TextField fullWidth variant="outlined" value={formInfo?.name}
          onChange={(e)=>{
            setFormInfo({...formInfo,name:e.target.value})
          }} />
          <TextField
            fullWidth
            variant="standard"
            value={formInfo?.description}
            onChange={(e)=>{
              setFormInfo({...formInfo,description:e.target.value})
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
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  sx={{ width: "80%", m: 2 }}
                  placeholder="Question"
                  value={field.question}
                  onChange={(e) => {
                    const updatedQuestions = [...formInfo.questions];
                    updatedQuestions[index].question = e.target.value;
                    setFormInfo({ ...formInfo, questions: updatedQuestions });
                  }}
                />

                {field.type === "multiple_choice" && (
                  <Box sx={{ margin: 3 }}>
                    <FormControl fullWidth>
                      <RadioGroup>
                        {field.options.map((option, optionIdx) => (
                          <Box
                            key={optionIdx}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <MuiTextField
                              value={option}
                              label={`${optionIdx + 1}`}
                              variant="outlined"
                              fullWidth
                              onChange={(e) => {
                                const updatedQuestions = [
                                  ...formInfo.questions,
                                ];
                                updatedQuestions[index].options[optionIdx] =
                                  e.target.value;
                                setFormInfo({
                                  ...formInfo,
                                  questions: updatedQuestions,
                                });
                              }}
                            />
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                ml: 1,
                                backgroundColor: colors.redAccent[600],
                                color: "white",
                              }}
                              onClick={() => {
                                const updatedQuestions = [
                                  ...formInfo.questions,
                                ];
                                if (updatedQuestions[index].options.length > 2) {
                                updatedQuestions[index].options.splice(
                                  optionIdx,
                                  1
                                );
                              }
                                setFormInfo({
                                  ...formInfo,
                                  questions: updatedQuestions,
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </Box>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Button
                        sx={{ backgroundColor: colors.greenAccent[600] }}
                        variant="outlined"
                        onClick={() => {
                          const updatedQuestions = [...formInfo.questions];
                          updatedQuestions[index].options.push("");
                          setFormInfo({
                            ...formInfo,
                            questions: updatedQuestions,
                          });
                        }}
                      >
                        Add Option
                      </Button>
                    </Box>
                  </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    onClick={() => {
                      const updatedQuestions = [...formInfo.questions];
                      updatedQuestions.splice(index, 1);
                      setFormInfo({ ...formInfo, questions: updatedQuestions });
                    }}
                    variant="outlined"
                    size="small"
                    sx={{
                      backgroundColor: colors.redAccent[600],
                      color: "white",
                      width: "10%",
                      m: 2,
                    }}
                  >
                    Delete Question
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
          <Box sx={{display:"flex",justifyContent:"end"}}>
            <Button
            onClick={()=>{
              const updatedQuestions = [...formInfo.questions]
              const newQuestion = {
                question:"",
                type:"text"
              }
              updatedQuestions.push(newQuestion);
              setFormInfo({...formInfo,questions:updatedQuestions})
            }} sx={{ backgroundColor: colors.blueAccent[600],mr:2,color:"white"}}>
              Add Text Question
            </Button>
            <Button sx={{ backgroundColor: colors.blueAccent[600],color:"white" }}
            onClick={()=>{
              const updatedQuestions = [...formInfo.questions]
              const newQuestion={
                options:[" ", " "],
                question:"",
                type:"multiple_choice"
              }
              updatedQuestions.push(newQuestion);
              setFormInfo({...formInfo,questions:updatedQuestions})
            }}>
              Add Multiple Choice Question
            </Button>
          </Box>
        </Box>
        <Box sx={{display:"flex",justifyContent:"end",mt:3}}>
          <Button
          onClick={()=>{handleDialogOpen("cancel")}}
          sx={{backgroundColor:colors.redAccent[600],color:"white",mr:2}}>
            Cancel
          </Button>
          <Button
          onClick={()=>{handleDialogOpen("save")}}
          sx={{backgroundColor:colors.greenAccent[600],color:"white"}}>
            Save
          </Button>
        </Box>
      <ConfirmationDialog 
      title={dialogType==="cancel" ? "Are you sure you want to cancel the transactions?":"Are you sure you want to save the change?"}
      description={"If you click yes you won't go back"}
      open={dialogOpen}
      onClose={handleCloseDialog}
      onConfirm={dialogType==="cancel" ? handleCancel: handleSave}
      />
    
      </Box>
    </Box>
  );
}
