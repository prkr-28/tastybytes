// import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

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
    <AuthProvider>
      <Provider store={appStore}>
        <main className="">
          <Header />
          <Toaster position="top-center" />
          <Outlet />
        </main>
        <Footer />
      </Provider>
    </AuthProvider>
  );
};

export default App;
