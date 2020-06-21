import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { apiData } from '../apiGoogleconfig';
import { Button, LinearProgress } from '@material-ui/core/';
import { mainContext } from '../main-context';
import {
  MenuItem,
  Box,
  TextField,
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
  const [newItem, setNewItem] = useState(' ');

  const handleAddOpen = () => {
    setOpen(true);
  };

  const handleAddClose = () => {
    setOpen(false);
  };

  const handleNewCalendar = (e) => {
    console.log(e.target.value);
    setNewItem();
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      crearCalendario();
      setOpen(false);
    }
  };

  const crearCalendario = () => {
    main.update({ ...main, loading: true });
    return gapi.client.calendar.calendars
      .insert({
        resource: {
          summary: newItem,
          description: 'Calendario creado desde obj++',
          timeZone: 'Europe/Madrid',
        },
      })
      .then(
        function (response) {
          setOpen(false);
          console.log(response.result.id);
          props.add(response.result.id);
          console.log('newCalendar', response);
          main.update({ ...main, loading: false });
        },
        function (err) {
          console.error('Execute error', err);
        },
      );
  };

  return (
    <div className={classes.root}>
      <MenuItem
        color='primary'
        onClick={handleAddOpen}
        value='Crea un calendario nuevo'>
        Crea un calendario nuevo
      </MenuItem>

      <Dialog open={open} onClose={handleAddClose} fullWidth maxWidth='sm'>
        <DialogTitle>Nuevo Calendario</DialogTitle>
        <DialogContent>
          <div className={classes.actionsContainer}>
            <Box m={3}>
              <TextField
                autoFocus
                fullWidth
                label='Titulo'
                value={newItem}
                onChange={handleNewCalendar}
                onKeyPress={handleEnter}
              />
            </Box>
            <div>
              <Button onClick={handleAddClose} className={classes.button}>
                Cancelar
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={crearCalendario}
                className={classes.button}>
                Crear
              </Button>
            </div>
            <Box my={2} />
            {main.loading && <LinearProgress />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddCalendar;
