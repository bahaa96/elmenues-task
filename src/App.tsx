import React from 'react';
import { ThemeProvider } from 'styled-components'


import Router from './router';

import 'semantic-ui-css/semantic.min.css'
import theme from './theme';


const App = () => {
  return (
    <ThemeProvider {...{theme}} >
      <Router />   
    </ThemeProvider>
  );
}

export default App;
