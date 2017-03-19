import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import App from './containers/App';

const unauthedRoutes = [
  { path: '/',
    exact: true,
    component: () => (<Redirect to='/tidbits'/>)
  },
  { path: '/tidbits',
    exact: true,
    component: require('./containers/Tidbits').default
  }
];

// export to be reused when routes need to be nested inside containers
export const RouteSubRoutes = (r) => (
  <Route
    path={r.path}
    exact={r.exact}
    render={props => {
      try {
        document.querySelector('div.app').scrollTop = 0;
      } catch (e) {}

      return(
        <r.component
          routes={r.routes}
          {...props}
        />
      )
    }}
  />
)

const Routes = () => (
  <Router >
    <App
      SwitchComponent={({ authenticated }) => {
        const routes = unauthedRoutes;

        return (
          <Switch>
            {/* Routes routes generated from determined authentication */}
            {routes.map((r, i) => <RouteSubRoutes key={i} {...r}/>)}

            {/* Routes that can be accessed when authentication does not matter */}

            {/*  Force redirect to root when path does not match */}
            <Route component={() => <Redirect to='/'/>}/>
          </Switch>
        );
      }}
    />
  </Router>
);

export default Routes;
