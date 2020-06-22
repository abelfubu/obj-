import React, { useEffect, useState, useContext } from 'react';
import { mainContext } from '../main-context';
import Item from './Item';
import AddEvent from './AddEvent';
import Hero from './Hero';
import {
  CardHeader,
  Avatar,
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
  inline: { display: 'flex' },
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
      .then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
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
        if (userName === '') {
          setUserName(gapi.auth2.getAuthInstance().currentUser.le.Rt.AW);
        }
      });
    return gapi.client.calendar.calendarList
      .list({
        minAccessRole: 'owner',
      })
      .then(function (response) {
        setUserName(gapi.auth2.getAuthInstance().currentUser.le.Rt.Bd);
        console.log('calendar', gapi.auth2.getAuthInstance());
        setCalendar(response.result.items[0].summary);
        setCalendars(response.result.items);
        main.update((prevValue) => ({ ...prevValue, auth: true }));
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
    setCalendar('primary');
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
          <Box m={6}>
            {userName.length > 0 && (
              <div className={classes.inline}>
                <Box my={2}>
                  <CardHeader
                    style={{ textTransform: 'uppercase' }}
                    avatar={
                      <Avatar
                        variant='square'
                        src={gapi.auth2.getAuthInstance().currentUser.le.Rt.dL}
                      />
                    }
                    title={userName + '  |  ' + calendar}
                    subheader={new Date(fullDate).toLocaleDateString(
                      'es-ES',
                      options,
                    )}
                  />
                </Box>
              </div>
            )}

            <Grid container spacing={4}>
              {state.length === 0 ? (
                <Box mx={3}>
                  <Typography variant='subtitle2' color='secondary'>
                    No hay objetivos para mostrar
                  </Typography>
                  <AddEvent />
                </Box>
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
          <Box my={10} />
        </Container>
      </Grid>
    </div>
  );
};

export default React.memo(Content);
