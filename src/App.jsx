// import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import { Auth0Provider } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
*Header
-logo
-nav items
*Body
-searchbar
-restrocintainer
  --restrocards
*Footer
*/

const App = () => {
  return (
    <Auth0Provider
      domain="dev-jdschtlsrcttw7th.us.auth0.com"
      clientId="pkRMuzd5nS7ptlGINYNqCLN9Vmq2QyKO"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={appStore}>
        <main className="">
          <Header />
          <ToastContainer />
          <Outlet />
        </main>
        <Footer />
      </Provider>
    </Auth0Provider>
  );
};

export default App;
