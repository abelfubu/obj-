import React, { useContext } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { mainContext } from '../main-context';
import { grey } from '@material-ui/core/colors';
import {
  Link,
  makeStyles,
  ListItemText,
  List,
  ListItem,
  ListItemIcon,
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  Content: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: grey[800],
    position: 'relative',
    flexGrow: 1,
    padding: '60px 0',
    color: 'white',
  },

  ContentDark: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: grey[800],
    position: 'relative',
    flexGrow: 1,
    padding: '60px 0',
    color: 'white',
  },
});

const Footer = (props) => {
  const classes = useStyles();
  const main = useContext(mainContext);

  return (
    <>
      <Paper
        square={true}
        elevation={0}
        className={main.dark ? classes.ContentDark : classes.Content}>
        <Container>
          <Box mx={6}>
            <Grid
              container
              spacing={2}
              justify='center'
              alignItems='center'
              alignContent='center'>
              <Grid item xs={12} md={6} lg={4}>
                <div>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText primary='Email: abelfubu@gmail.com' />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText primary='Tel: 617 36 61 35' />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='Creado por Abel de la Fuente' />
                    </ListItem>
                  </List>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <div>
                  <List dense>
                    <ListItem>
                      <ListItemText primary='Política de Privacidad' />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='Términos y condiciones' />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='Aviso Legal' />
                    </ListItem>
                  </List>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <div>
                  <List dense>
                    <ListItem button>
                      <Link
                        href='https://abelfubu.github.io/react-nums/'
                        target='_blank'
                        rel='noreferrer'>
                        <ListItemText primary='Numerología' />
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link
                        href='https://abelfubu.github.io/codeins'
                        target='_blank'
                        rel='noreferrer'>
                        <ListItemText primary='Código' />
                      </Link>
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </>
  );
};

export default Footer;
