import { createBrowserRouter } from 'react-router';
import NotFound from '@/pages/NotFound/NotFound';
import Root from '@/layout/Root';
import Home from '@/pages/Home/Home';
import ExploreGardeners from '@/pages/Gardeners/ExploreGardeners';
import BrowseTips from '@/pages/BrowseTips/BrowseTips';
import PrivateRoute from './PrivateRoutes';
import ShareTip from '@/pages/ShareTip/ShareTip';
import MyTips from '@/pages/MyTips/MyTips';
import TipDetails from '@/pages/TipDetails/TipDetails';
import UpdateTip from '@/pages/UpdateTip/UpdateTip';
import Dashboard from '@/pages/dashboard/Dashboard';
import SignUp from '@/pages/signUp/SignUp';
import SignIn from '@/pages/signIn/SignIn';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/gardeners',
        element: <ExploreGardeners />,
      },
      {
        path: '/browse-tips',
        element: <BrowseTips />,
      },
      {
        path: '/share-tip',
        element: (
          <PrivateRoute>
            <ShareTip />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-tips',
        element: (
          <PrivateRoute>
            <MyTips />
          </PrivateRoute>
        ),
      },
      {
        path: '/tip/:id',
        element: (
          <PrivateRoute>
            <TipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-tip/:id',
        element: (
          <PrivateRoute>
            <UpdateTip />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
    ],
  },
]);
