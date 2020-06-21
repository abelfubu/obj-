import React, { useContext } from 'react';
import SelectCalendar from './SelectCalendar';
import AddEvent from './AddEvent';
import { apiData } from '../apiGoogleconfig';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { mainContext } from '../main-context';
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
    height: 850,
    minHeight: 400,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + process.env.PUBLIC_URL + 'Fondo.png)',
  },
  topImgDark: {
    marginTop: '0',
    width: '100%',
    minWidth: '100%',
    height: '850px',
    backgroundSize: 'cover',
    backgroundImage: 'url(' + process.env.PUBLIC_URL + 'FondoDark.png )',
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
                  <Button
                    fullWidth
                    variant='contained'
                    color='secondary'
                    startIcon={<EventBusyIcon />}
                    onClick={(e) => handleLogout(e)}>
                    Log Out
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    startIcon={<EventAvailableIcon />}
                    onClick={handleLogin}>
                    Log In
                  </Button>
                )}
                <Box my={2} />
                <AddEvent get={props.get} cal={props.cal} />
                <Box my={2} />
                {props.cals.length > 0 ? (
                  <SelectCalendar
                    changeCalendar={props.handleChange}
                    cals={props.cals}
                  />
                ) : null}
              </Grid>
            </Box>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
};

export default Hero;
