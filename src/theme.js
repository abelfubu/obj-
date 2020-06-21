import { createMuiTheme } from '@material-ui/core/styles';

import lime from '@material-ui/core/colors/lime';

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: lime[400],
    },
    secondary: {
      main: '#fcbf49',
    },
    type: 'light',
  },
  typography: {
    body1: {
      fontSize: '1rem',
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: lime[400],
    },
    secondary: {
      main: '#fcbf49',
    },
    type: 'dark',
  },
  typography: {
    body1: {
      fontSize: '1rem',
    },
  },
});
