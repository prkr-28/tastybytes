import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import About from './components/about.jsx';
import Contact from './components/contact.jsx';
import Body from './components/body.jsx';
//import RestroMenu from './components/resmenu.jsx';
import { lazy, Suspense } from 'react';
import Cart from './components/cart.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const RestroMenu = lazy(() => import('./components/resmenu.jsx'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/restromenu/:resid',
        element: (
          <Suspense
            fallback={
              <div className="h-screen flex justify-center items-center bg-white">
                <div className="text-xl font-semibold text-purple-600 animate-pulse">
                  Loading...
                </div>
              </div>
            }
          >
            <RestroMenu />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter} />
);
