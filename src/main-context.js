import React, { useState } from 'react';

export const mainContext = React.createContext({
  drawer: null,
  dark: null,
  auth: null,
  loading: null,
  calendars: null,
  search: null,
  update: () => {},
});

export default (props) => {
  const [mainData, setMainData] = useState({
    drawer: false,
    dark: false,
    auth: false,
    loading: false,
    calendars: [],
    search: '',
  });

  const updateMain = (data) => {
    setMainData(data);
  };

  return (
    <mainContext.Provider
      value={{
        drawer: mainData.drawer,
        update: updateMain,
        dark: mainData.dark,
        auth: mainData.auth,
        loading: mainData.loading,
        calendars: mainData.calendars,
        search: mainData.search,
      }}>
      {props.children}
    </mainContext.Provider>
  );
};
