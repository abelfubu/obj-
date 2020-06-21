import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AddCalendar from './AddCalendar';
import RemoveCalendar from './RemoveCalendar';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
}));

export default function DialogSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userCalendars, setUserCalendars] = useState([]);
  const [chosenCalendar, setChosenCalendar] = useState(null);

  useEffect(() => {
    setUserCalendars(props.cals);
  }, [props.cals]);

  const handleChange = (event) => {
    setChosenCalendar(event.target.value);
  };

  const handleNew = (id) => {
    props.changeCalendar(id ? id : 'primary');
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChosen = () => {
    props.changeCalendar(chosenCalendar);
    setOpen(false);
  };

  const calendarId = chosenCalendar ? chosenCalendar : 'primary';

  return (
    <div>
      <Button
        fullWidth
        variant='contained'
        startIcon={<EventAvailableIcon />}
        onClick={handleClickOpen}>
        calendarios
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}>
        <DialogTitle>Tus Calendarios</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-dialog-select-label'>
                Selecciona el calendario de Google
              </InputLabel>
              <Select
                labelId='demo-dialog-select-label'
                id='demo-dialog-select'
                value={chosenCalendar}
                onChange={handleChange}
                input={<Input />}>
                {userCalendars.length > 0 &&
                  userCalendars.map((calendar, index) => (
                    <MenuItem key={index} value={calendar.id}>
                      {calendar.summary}
                    </MenuItem>
                  ))}
                <AddCalendar add={handleNew} />
                <RemoveCalendar close={handleNew} id={calendarId} />
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleChosen} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
