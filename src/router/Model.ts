import { RouteProps } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { $fixme } from "../typings/fixme";


export interface IRoute extends RouteProps {
  protected: true 
}

enum RouteKeys { LOGIN = 'LOGIN', HOME = 'HOME', NOTFOUND = 'NOTFOUND' }

// interface IRoutes {
//   [key: RouteKeys]: IRoute
// }



export const ROUTES: $fixme  = {
  LOGIN: {
    path: '/login',
    component: Login,
  },
  HOME: {
    path: '/',
    component: Home,
    exact: true,
    protected: true,
  },
  NOTFOUND: {
    component: NotFound,
  },
}
