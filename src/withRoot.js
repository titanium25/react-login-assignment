import React, {Suspense} from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';

import {
  MuiThemeProvider,
  StylesProvider,
  jssPreset,
  createTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import i18n from "./i18n";
import {blue,blueGrey} from '@material-ui/core/colors';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


function withRoot(Component) {
  function WithRoot(props) {
    let theme = createTheme({
      direction: i18n.dir(),
      palette: {
        primary: blue,
        secondary:blueGrey
      },
     
    }); 
    theme = responsiveFontSizes(theme);
    // JssProvider allows customizing the JSS styling solution.
    return (
    <Suspense fallback={<div>Loading... </div>}>
      <StylesProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
          <Component {...props} />
        </MuiThemeProvider>
      </StylesProvider>
      </Suspense>
    );
  }

  return WithRoot;
}

export default withRoot;