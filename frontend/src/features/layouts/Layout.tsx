import React, { FC, ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Container, ThemeProvider } from '@mui/material';
import {theme} from '../../theme/overrides/typography'

interface LayoutInterface {
    children: ReactNode
}

const Layout: FC<LayoutInterface> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme} >
        <Header />
          {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;