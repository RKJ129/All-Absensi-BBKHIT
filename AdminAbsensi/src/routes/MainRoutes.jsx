import { lazy } from 'react';

import AdminLayout from 'layouts/AdminLayout';
import GuestLayout from 'layouts/GuestLayout';
import PrivateRoute from '../components/Routes/privateRoute';
import User from '../views/user';
import ManageAdmin from '../views/admin';
import TunjanganPegawai from '../views/tunjangan';

const DashboardSales = lazy(() => import('../views/dashboard/DashSales/index'));

const Typography = lazy(() => import('../views/ui-elements/basic/BasicTypography'));
const Color = lazy(() => import('../views/ui-elements/basic/BasicColor'));

const FeatherIcon = lazy(() => import('../views/ui-elements/icons/Feather'));
const FontAwesome = lazy(() => import('../views/ui-elements/icons/FontAwesome'));
const MaterialIcon = lazy(() => import('../views/ui-elements/icons/Material'));

const Login = lazy(() => import('../views/auth/login'));
const Register = lazy(() => import('../views/auth/register'));

const Sample = lazy(() => import('../views/sample'));

const Rekap = lazy(() => import('../views/rekap'));

const MainRoutes = {
  // element
  path: '/',
  children: [
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: '/',
          element: <AdminLayout />,
          children: [
            {
              index: true,
              path: '/dashboard/sales',
              element: <DashboardSales />
            },
            {
              path: '/rekap',
              element: <Rekap />
            },
            {
              index: true,
              path: '/pengguna',
              element: <User />
            },
            {
              index: true,
              path: '/admin',
              element: <ManageAdmin />
            },
            {
              index: true,
              path: '/tunjangan',
              element: <TunjanganPegawai />
            },
            {
              path: '/typography',
              element: <Typography />
            },
            {
              path: '/color',
              element: <Color />
            },
            {
              path: '/icons/Feather',
              element: <FeatherIcon />
            },
            {
              path: '/icons/font-awesome-5',
              element: <FontAwesome />
            },
            {
              path: '/icons/material',
              element: <MaterialIcon />
            },
    
            {
              path: '/sample-page',
              element: <Sample />
            },
            {
              path: '*',
              element: <h1>Not Found</h1>
            }
          ]
        }
      ]
    },
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        }
      ]
    }
  ]
};

export default MainRoutes;
