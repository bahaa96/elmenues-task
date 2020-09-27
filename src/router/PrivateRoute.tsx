import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../context/AuthContext';
import { ROUTES } from './Model';


interface IProps {

}

const PrivateRoute: React.FC<IProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
          to={{
            pathname: ROUTES.LOGIN,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


export default PrivateRoute;