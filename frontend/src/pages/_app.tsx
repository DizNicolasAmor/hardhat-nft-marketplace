import React from 'react';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NavbarCustom from '../components/NavbarCustom';
import 'bootstrap/dist/css/bootstrap.css';

interface MyAppProps extends AppProps {
  Component: {
    children?: React.ReactNode;
  } & NextComponentType<NextPageContext, any, {}>;
}

export default function App({ Component, pageProps }: MyAppProps) {
  return (
    <Provider store={store}>
      <NavbarCustom />
      <Component {...pageProps} />
    </Provider>
  );
}
