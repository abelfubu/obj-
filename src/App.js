import React, { useContext, useState } from 'react';
import Navbar from './components/Navbar';
import { ThemeProvider, Fab } from '@material-ui/core';
import { mainContext } from './main-context';
import { lightTheme, darkTheme } from './theme';
import Cajon from './components/Cajon';
import Content from './components/Content';
import ScrollTop from './components/ScrollTop';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

function App(props) {
  const main = useContext(mainContext);
  const [input, setInput] = useState('');

  const handleSearch = (search) => {
    setInput(search);
  };

  return (
    <div>
      <ThemeProvider theme={main.dark ? darkTheme : lightTheme}>
        <Navbar enter={handleSearch} />

        <Cajon />

        <Content searchinput={input} />
        <ScrollTop {...props}>
          <Fab color='secondary' size='small' aria-label='scroll back to top'>
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </ThemeProvider>
    </div>
  );
}

export default App;
