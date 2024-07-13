// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Splash from './components/Splash/Splash'
import SpotDetails from './components/SpotDetails/SpotDetails'
import CreateASpot from './components/CreateASpot/CreateASpot';
import * as sessionActions from './store/session';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Header isLoaded={isLoaded}/>
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />
      },
      {
        path: '/spots/:id',
        element: <SpotDetails />
      },
      {
        path: '/spots',
        element: <CreateASpot />
      },
      {
        path: '/*',
        element: <NotFoundPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;