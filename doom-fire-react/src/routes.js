import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';

const Routes = () => {
  return(
    <BrowserRouter>
      <Route path='/' component={Main}/>
    </BrowserRouter>
  );
}

export default Routes;
