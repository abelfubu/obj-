import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { apiData } from '../apiGoogleconfig';
import { Button, LinearProgress, Typography } from '@material-ui/core/';
import { mainContext } from '../main-context';
import 'date-fns';
import {
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core/';

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

function AddCalendar(props) {
  const { gapi } = apiData;
  const classes = useStyles();
  const main = useContext(mainContext);
  const [open, setOpen] = useState(false);

  const handleAddOpen = () => {
    setOpen(true);
  };

  const handleAddClose = () => {
    setOpen(false);
  };

  const borrarCalendario = () => {
    main.update({ ...main, loading: true });
    return gapi.client.calendar.calendars
      .delete({
        calendarId: props.id,
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log('Response', response);
          main.update({ ...main, loading: false });
          setOpen(false);
          props.close();
        },
        function (err) {
          console.error('Execute error', err);
          main.update({ ...main, loading: false });
        },
      );
  };

  let content = null;
  if (props.id === 'primary') {
    content = (
      <Dialog open={open} onClose={handleAddClose} fullWidth maxWidth='sm'>
        <DialogTitle>Borrar Calendario</DialogTitle>
        <DialogContent>
          <div className={classes.actionsContainer}>
            <Box m={3}>
              <Typography variant='body1' color='primary'>
                No puedes Borrar tu calendario principal
              </Typography>
            </Box>
            <div>
              <Button onClick={handleAddClose} className={classes.button}>
                Cancelar
              </Button>
            </div>
            <Box my={2} />
            {main.loading && <LinearProgress />}
          </div>
        </DialogContent>
      </Dialog>
    );
  } else {
    content = (
      <Dialog open={open} onClose={handleAddClose} fullWidth maxWidth='sm'>
        <DialogTitle>Borrar Calendario</DialogTitle>
        <DialogContent>
          <div className={classes.actionsContainer}>
            <Box m={3}>
              <Typography variant='body1' color='primary'>
                ¿Estas seguro que quieres borrar el calendario seleccionado?
              </Typography>
            </Box>
            <div>
              <Button onClick={handleAddClose} className={classes.button}>
                Cancelar
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={borrarCalendario}
                className={classes.button}>
                Borrar
              </Button>
            </div>
            <Box my={2} />
            {main.loading && <LinearProgress />}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className={classes.root}>
      <MenuItem
        color='primary'
        onClick={handleAddOpen}
        value='Crea un calendario nuevo'>
        Borra el calendario seleccionado
      </MenuItem>
      {content}
    </div>
  );
}

export default React.memo(AddCalendar);
