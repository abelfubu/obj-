import React, { useEffect, useState, useContext } from 'react';
import { mainContext } from '../main-context';
import Item from './Item';
import Hero from './Hero';
import {
  Grid,
  LinearProgress,
  Container,
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { apiData } from '../apiGoogleconfig';

const fullDate = new Date();
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
// console.log(fullDate.toLocaleDateString('es-ES', options));
console.log(
  new Date(fullDate.toISOString()).toLocaleDateString('es-ES', options),
);

const useStyles = makeStyles({
  Content: { maxWidth: '100%', margin: 'auto' },
});

const Content = (props) => {
  const { gapi, clientId, apiKey, scope, discoveryDocs } = apiData;
  const classes = useStyles();
  const main = useContext(mainContext);
  const [userName, setUserName] = useState('');
  const [state, setstate] = useState([]);
  const [calendar, setCalendar] = useState(null);
  const [calendars, setCalendars] = useState(['primary']);

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, [calendar, gapi, main.search]);

  const initClient = () => {
    gapi.client
      .init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: discoveryDocs,
        scope: scope,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          setUserName(gapi.auth2.getAuthInstance().currentUser.le.Rt.AW);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          return gapi.client.calendar.calendarList
            .list({
              minAccessRole: 'owner',
            })
            .then(
              function (response) {
                setCalendars(response.result.items);
                console.log('Response', response.result.items);
                main.update((prevValue) => ({ ...prevValue, auth: true }));
              },
              function (err) {
                console.error('Execute error', err);
                main.update((prevValue) => ({ ...prevValue, auth: false }));
              },
            );
        },
        function (error) {},
      );
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      getEvents();
      main.update((prevValue) => ({ ...prevValue, auth: true }));
    } else {
      main.update((prevValue) => ({ ...prevValue, auth: false }));
    }
  };

  const getEvents = (search) => {
    main.update((prevValue) => ({ ...prevValue, loading: true }));
    gapi.client.calendar.events
      .list({
        calendarId: calendar ? calendar : 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        q: main.search,
        orderBy: 'startTime',
      })
      .then((response) => {
        const events = response.result.items;
        setstate(events);
        console.log(response);
        main.update((prevValue) => ({ ...prevValue, loading: false }));
      });
  };

  const handleDeletion = (id) => {
    const eventDelete = gapi.client.calendar.events.delete({
      calendarId: calendar ? calendar : 'primary',
      eventId: id,
    });
    eventDelete.execute(() => {
      getEvents();
    });
  };

  const handleChangeCalendar = (chosenCalendar) => {
    setCalendar(chosenCalendar);
  };

  const logOut = () => {
    setstate([]);
    setUserName('');
    setCalendars('');
    setCalendar(null);
  };

  return (
    <div className={main.dark ? 'dark' : 'light'}>
      <Grid
        container
        alignContent='center'
        alignItems='center'
        className={classes.Content}>
        <Hero
          get={getEvents}
          set={logOut}
          cal={calendar}
          cals={calendars}
          handleChange={handleChangeCalendar}
          username={userName}
        />
        <Container>
          {main.loading && <LinearProgress />}
          <Box mx={6}>
            {userName.length > 0 && (
              <Box my={2}>
                <Typography variant='h3' color='initial'>
                  {userName}, bienvenido
                </Typography>
              </Box>
            )}

            <Grid container spacing={4}>
              {state.length === 0 ? (
                <Typography variant='h2' color='initial'>
                  Empieza creando un nuevo objetivo
                </Typography>
              ) : (
                state.map((item) => (
                  <Item
                    cal={calendar}
                    key={item.id}
                    id={item.id}
                    click={() => handleDeletion(item.id)}
                    link={item.htmlLink}
                    title={item.summary}
                    get={getEvents}
                    date={item.end.dateTime}
                    desc={item.description}>
                    {state.text}
                  </Item>
                ))
              )}
            </Grid>
          </Box>
        </Container>
      </Grid>
    </div>
  );
};

export default React.memo(Content);
