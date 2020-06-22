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
  const [addOpen, setAddOpen] = useState(false);
  const [newItem, setNewItem] = useState('');

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleNewCalendar = (e) => {
    setNewItem(e.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      crearCalendario();
      setAddOpen(false);
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
      .then((response) => {
        setAddOpen(false);
        props.add(response.result.id);
        main.update({ ...main, loading: false });
      });
  };

  return (
    <div className={classes.root}>
      <MenuItem color='primary' onClick={handleAddOpen}>
        Crea un calendario nuevo
      </MenuItem>

      <Dialog open={addOpen} onClose={handleAddClose} fullWidth maxWidth='sm'>
        <DialogTitle>Nuevo Calendario</DialogTitle>
        <DialogContent>
          <div className={classes.actionsContainer}>
            <Box m={3}>
              <TextField
                autoFocus
                margin='dense'
                id='Title'
                label='Título'
                type='text'
                fullWidth
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
