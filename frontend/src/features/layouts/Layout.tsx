import React, { FC, ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Container, ThemeProvider } from '@mui/material';
import {theme} from '../../theme/overrides/typography'
import { Provider } from 'react-redux';
import { store } from '../../app/baseStore';

interface LayoutInterface {
    children: ReactNode
}

const Layout: FC<LayoutInterface> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme} >
        <Provider store={store}>
          <Header />
            {children}
          <Footer />
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default Layout;