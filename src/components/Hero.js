import React, { useContext } from 'react';
import SelectCalendar from './SelectCalendar';
import AddEvent from './AddEvent';
import { apiData } from '../apiGoogleconfig';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { mainContext } from '../main-context';
import { orange } from '@material-ui/core/colors';
import Fondo from '../images/Fondo.png';
import FondoDark from '../images/FondoDark.png';
import {
  makeStyles,
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  topImg: {
    marginTop: '0',

    width: '100%',
    maxHeight: 850,
    height: 600,
    minHeight: 400,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + Fondo + ')',
  },
  topImgDark: {
    marginTop: '0',
    width: '100%',
    minWidth: '100%',
    maxHeight: 850,
    height: 600,
    minHeight: 400,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + FondoDark + ')',
  },
  orange: {
    backgroundColor: orange[300],
    color: 'grey',
  },

  Content: { maxWidth: '100%', width: '100%' },
});

const Hero = (props) => {
  const classes = useStyles();
  const main = useContext(mainContext);
  const { gapi } = apiData;

  const handleLogout = (e) => {
    gapi.auth2.getAuthInstance().signOut();
    props.set();
    main.update({ ...main, auth: false });
  };

  const handleLogin = (e) => {
    gapi.auth2.getAuthInstance().signIn();
    main.update({ ...main, auth: true });
  };

  return (
    <div className={classes.Content}>
      <Paper
        square={true}
        elevation={0}
        className={!main.dark ? classes.topImg : classes.topImgDark}>
        <Container>
          <Grid container direction='column'>
            <Box my={6} />
            <Box mx={6}>
              <Typography variant='h1' color='initial'>
                Objetivos
              </Typography>
              <Box my={2} />
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant='subtitle1' color='inherit' width='xs'>
                  Un lugar donde declarar tus objetivos y llevar un control de
                  los tiempos y los logros
                </Typography>
                <Typography variant='subtitle1' color='inherit'>
                  Haz login para sincronizar con Google Calendar
                </Typography>

                <Box my={2} />
                {main.auth ? (
                  <>
                    <Button
                      color='secondary'
                      fullWidth
                      variant='contained'
                      className={classes.orange}
                      startIcon={<EventBusyIcon />}
                      onClick={(e) => handleLogout(e)}>
                      Log Out
                    </Button>
                    <Box my={2} />
                    <AddEvent get={props.get} cal={props.cal} />
                    <Box my={2} />
                    <SelectCalendar
                      changeCalendar={props.handleChange}
                      cals={props.cals}
                    />
                  </>
                ) : (
                  <Button
                    fullWidth
                    className={classes.white}
                    variant='contained'
                    color='primary'
                    startIcon={<EventAvailableIcon />}
                    onClick={handleLogin}>
                    Log In
                  </Button>
                )}
              </Grid>
            </Box>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};

export default Hero;
