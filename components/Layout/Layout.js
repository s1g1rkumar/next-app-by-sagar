import Head from 'next/head';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  Switch
} from '@material-ui/core';
import useStyles from '../../utils/Styles/Styles';
import Link from 'next/link';
import { ShoppingCart, LockOpen } from '@material-ui/icons';
import { Tooltip } from '@mui/material';
// import theme from '../../utils/theme/theme';
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import Cookies from 'js-cookie'





export default function Loyout({ title, children, description }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { darkMode,cart} = state;
  console.log("values-cart",cart)
  
  
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      type:darkMode?'dark': 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  const OnChangeHandler = ()=>{
    dispatch({type:darkMode?'DARK_MODE_OFF':"DARK_MODE_ON"});
    const newDarkMode = !darkMode;
    Cookies.set('darkMode',newDarkMode ? 'ON':'OFF');
  }
  return (
    <div>
      <Head>
        <title>{title ? `${title} - My app` : 'Test app'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <AppBar className={classes.navbar} position="static">
          <Toolbar className={classes.navbarsItems}>
            <Typography>
              <Link href="/">Sagar my-app</Link>
            </Typography>
            <div>
              <div>
              <Switch checked={darkMode} onChange={OnChangeHandler} ></Switch>
              <IconButton>
                  <Tooltip title="Go to cart" placement="bottom" arrow>
                    <Badge badgeContent={cart.cartItems.length > 0 ? cart.cartItems.length : 0} color="secondary">
                      <ShoppingCart color="primary" />
                    </Badge>
                  </Tooltip>
                </IconButton>
                <IconButton>
                  <Tooltip title="Login" placement="bottom" arrow>
                    <LockOpen color="secondary" />
                  </Tooltip>
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Sagar my-app</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
