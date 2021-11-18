import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const steps = ['Task Details', 'Data Type & Upload', 'Price & Payment'];

export default function LinearStepper({ createNewTask, cancelTask }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [newFileName, setNewFileName] = useState('');

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      createNewTask();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', paddingLeft: 20, paddingTop: 5, paddingRight: 20 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key={steps[0]}>
          <StepLabel>{steps[0]}</StepLabel>
          <StepContent>
            <Box sx={{ mb: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="tasK_name"
                label="Task Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setNewFileName(e.target.value);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="task_description"
                label="Task Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setNewFileName(e.target.value);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="num_labeler"
                label="Number of Labelers"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setNewFileName(e.target.value);
                }}
              />
              <Box
                sx={{
                  height: 20
                }}
              />
              <div>
                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
        <Step key={steps[1]}>
          <StepLabel>{steps[1]}</StepLabel>
          <StepContent>
            <Box sx={{ mb: 2 }}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="classification" />
                <FormControlLabel control={<Checkbox />} label="bounding-box annotation" />
              </FormGroup>
              <Box
                sx={{
                  height: 20
                }}
              />
              <Button variant="contained"> Upload Data </Button>
              <Box
                sx={{
                  height: 20
                }}
              />
              <div>
                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
        <Step key={steps[2]}>
          <StepLabel>{steps[2]}</StepLabel>
          <StepContent>
            <Box sx={{ mb: 2 }}>
              <Button variant="contained"> Connect Celo Wallet </Button>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setNewFileName(e.target.value);
                }}
              />
              <Button variant="contained"> Pay </Button>
              <Box
                sx={{
                  height: 20
                }}
              />
              <div>
                <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
}
