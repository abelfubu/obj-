import React, { useContext } from 'react';
import { apiData } from '../apiGoogleconfig';
import { mainContext } from '../main-context';
import { grey } from '@material-ui/core/colors';
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
  Content: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: grey[400],
    height: 200,
    position: 'relative',
    bottom: 0,
  },
});

const Footer = (props) => {
  const classes = useStyles();

  return (
    <>
      <Paper square={true} elevation={0} className={classes.Content}>
        <Container>
          <Paper />
        </Container>
      </Paper>
    </>
  );
};

export default Footer;
