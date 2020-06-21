import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import { apiData } from '../apiGoogleconfig';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import {
  Box,
  TextField,
  Typography,
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
} from '@material-ui/core/';
import { IconButton } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));
const fullDate = new Date().toISOString();
export default function VerticalLinearStepper(props) {
  const { gapi } = apiData;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [calendar, setCalendar] = useState('');
  const [open, setOpen] = useState(false);
  const steps = ['1', '2', '3'];
  const [newEvent, setNewEvent] = useState({
    summary: props.title,
    description: props.desc,
    end: {
      dateTime: props.date,
      timeZone: 'Europe/Madrid',
    },
    start: {
      dateTime: fullDate,
      timeZone: 'Europe/Madrid',
    },
  });

  useEffect(() => {
    setCalendar(props.cal);
  }, [props.cal]);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleNext();
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(props);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAddOpen = () => {
    setOpen(true);
  };

  const handleAddClose = () => {
    setOpen(false);
  };

  const handleDateChangeEnd = (date) => {
    setNewEvent({ ...newEvent, end: { dateTime: date } });
  };

  const handleTitle = (event) => {
    setNewEvent({ ...newEvent, summary: event.target.value });
    console.log(newEvent.summary);
  };

  const handleDesc = (event) => {
    setNewEvent({ ...newEvent, description: event.target.value });
    console.log(newEvent.description);
  };

  const editarEvento = () => {
    return gapi.client.calendar.events
      .update({
        eventId: props.id,
        calendarId: calendar ? calendar : 'primary',
        resource: newEvent,
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          props.get();
          console.log('Response', response);
        },
        function (err) {
          console.error('Execute error', err);
        },
        handleAddClose(),
      );
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleAddOpen}
        color='secondary'
        aria-label='edit event'>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleAddClose} fullWidth maxWidth='sm'>
        <DialogTitle>Nuevo Objetivo</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation='vertical'>
            <Step>
              <StepLabel>Titulo</StepLabel>
              <StepContent>
                <div className={classes.actionsContainer}>
                  <Box m={3}>
                    <TextField
                      autoFocus
                      onKeyPress={handleEnter}
                      fullWidth
                      id='standard-basic'
                      label='Objetivo'
                      onChange={handleTitle}
                      value={newEvent.summary}
                    />
                  </Box>

                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}>
                      Back
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleNext}
                      className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Fecha</StepLabel>
              <StepContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Box m={3}>
                    <Grid container direction='column'>
                      <KeyboardDatePicker
                        name='end'
                        onKeyPress={handleEnter}
                        disableToolbar
                        variant='inline'
                        format='MM/dd/yyyy'
                        margin='dense'
                        id='date-picker-inline'
                        label='Fecha de final'
                        value={newEvent.end.dateTime}
                        onChange={handleDateChangeEnd}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </Box>
                </MuiPickersUtilsProvider>

                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}>
                      Back
                    </Button>
                    <Button
                      autoFocus
                      variant='contained'
                      color='primary'
                      onClick={handleNext}
                      className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Comentarios</StepLabel>
              <StepContent>
                <div className={classes.actionsContainer}>
                  <Box m={3}>
                    <TextField
                      autoFocus
                      onKeyPress={handleEnter}
                      onChange={handleDesc}
                      value={newEvent.description}
                      fullWidth
                      id='standard-basic'
                      label='Objetivo'
                    />
                  </Box>

                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}>
                      Back
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleNext}
                      className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>Ya lo tienes!</Typography>
              <Button
                autoFocus
                variant='contained'
                color='primary'
                onClick={editarEvento}
                className={classes.button}>
                Guardar
              </Button>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
