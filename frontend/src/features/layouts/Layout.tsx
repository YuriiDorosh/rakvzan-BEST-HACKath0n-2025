import React, { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/material';

interface LayoutInterface {
    children: ReactNode
}

const Layout: FC<LayoutInterface> = ({ children }) => {
  return (
    <>
      <Header />
      <Container component="main" sx={{ py: 4 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;