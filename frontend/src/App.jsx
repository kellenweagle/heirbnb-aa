// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import * as sessionActions from './store/session';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import SpotDetails from './screens/SpotDetails/components/SpotDetails';
import Splash from './screens/SplashScreen/Components/Splash';
import ManageSpots from './screens/ManageSpots/ManageSpots';
import CreateASpot from './screens/CreateASpot/CreateASpot';
import UpdateASpot from './screens/UpdateASpot/UpdateASpot';

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
        path: '/spots/manage',
        element: <ManageSpots />
      },
      {
        path: '/spots/:id/update',
        element: <UpdateASpot />
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
