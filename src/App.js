import React from 'react';
import { useTranslation } from 'react-i18next';
import withRoot from './withRoot'
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import './App.css';
import routes from './config/routes';
import AppRoute from './components/AppRoute/AppRoute';
import { AuthProvider } from './context/auth';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { enUS, he } from "date-fns/locale";

function App()  {
    const { i18n } = useTranslation();
    document.body.dir = i18n.dir();


    return (
      <MuiPickersUtilsProvider locale={i18n.language === 'he' ? he : enUS} utils={DateFnsUtils}>
        <AuthProvider>
          <Router>
            <Switch>
              {routes.map((route) => (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                  isPrivate={route.isPrivate}
                />
              ))}
            </Switch>
          </Router>
        </AuthProvider>
      </MuiPickersUtilsProvider>
    );
}

export default withRoot(App);