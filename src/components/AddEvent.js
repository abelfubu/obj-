import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import { apiData } from '../apiGoogleconfig';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {
  Box,
  TextField,
  Typography,
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
} from '@material-ui/core/';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
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
    summary: 'Google I/O 2015',
    location: '800 Howard St., San Francisco, CA 94103',
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: fullDate,
      timeZone: 'Europe/Madrid',
    },
    end: {
      dateTime: fullDate,
      timeZone: 'Europe/Madrid',
    },

    attendees: [{ email: 'lpage@example.com' }, { email: 'sbrin@example.com' }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
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

  const crearEvento = () => {
    const request = gapi.client.calendar.events.insert({
      calendarId: calendar ? calendar : 'primary',
      resource: newEvent,
    });

    request.execute((err) => {
      if (err) {
        console.log(err);
      }
      props.get();
    });
    handleAddClose();
  };

  return (
    <div className={classes.root}>
      <Button
        fullWidth
        variant='contained'
        startIcon={<EventAvailableIcon />}
        color='primary'
        onClick={handleAddOpen}>
        Añadir Nuevo
      </Button>
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
                      fullWidth
                      id='standard-basic'
                      label='Objetivo'
                      onChange={handleTitle}
                      onKeyDownCapture={handleEnter}
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
                        disableToolbar
                        onKeyPress={handleEnter}
                        variant='inline'
                        format='dd/MM/yyyy'
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
                      onChange={handleDesc}
                      fullWidth
                      id='standard-basic'
                      label='Objetivo'
                      onKeyPress={handleEnter}
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
              <Typography>¿Creamos el Objetivo?</Typography>
              <Button
                autoFocus
                variant='contained'
                color='primary'
                onClick={crearEvento}
                className={classes.button}>
                Crear
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
