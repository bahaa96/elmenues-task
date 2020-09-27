import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { ROUTES, IRoute } from './Model';
import PrivateRoute from './PrivateRoute';


const Router:React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {
          Object.keys(ROUTES).map( (routeKey, index) => {
            const route: IRoute = ROUTES[routeKey]
            if (route.protected) {
              return (
                <PrivateRoute {...route} key={index} />
              )
            }
            return (
              <Route {...route} key={index} />
            ) 
          })
        }
      </Switch>
    </BrowserRouter>
  )
}

export default Router;