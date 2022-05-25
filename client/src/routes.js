import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import User from './pages/User';
import Demande from './pages/UserDemande';
import ALLDemande from './pages/AllDemandes';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import Blog from './pages/Blog';
import DashboardApp from './pages/DashboardApp';

import { useUser } from './hooks';
// ----------------------------------------------------------------------

export default function Router() {
  const { user } = useUser();
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard" />,
    },
    {
      path: '/dashboard/',
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: '', element: <DashboardApp /> },
        // { path: 'users', element: <User /> },
        // { path: 'demande', element: <Demande /> },
       // { path: 'users', element: <ALLDemande statue='verfied' /> },
       
       (user.role === 'CFA') ? { path: 'demande', element: <ALLDemande statue='preVerfied' /> } : { path: 'demande', element: <NotFound /> },

       (user.role === 'VFO') ?  { path: 'demande', element: <ALLDemande statue='pending' /> } : { path: 'demande', element: <NotFound /> },

       (user.role === 'EXP')?  { path: 'demande', element: <Demande /> }: { path: 'demande', element: <NotFound /> },
       //  (user.role === 'CFA') ? { path: 'demande', element: <ALLDemande statue='preVerfied' /> }:   { path: 'users', element: <Demande /> },
        (user.role === 'CFA' || user.role ==='VFO') ? { path: 'users', element: <User /> } :   { path: 'users', element: <NotFound /> },
      //  (user.role === 'VFO') ? { path: 'demande', element: <ALLDemande statue='pending' /> } :   { path: 'users', element: <Demande /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: '*', element: <NotFound /> },
      ],
    },
    {
      path: '/login',
      element: user ? <Navigate to="/dashboard" /> : <Login />,
    },
    {
      path: '/register',
      element: user ? <Navigate to="/dashboard" /> : <Register />,
    },
    { path: '*', element: <NotFound /> },
  ]);
}
