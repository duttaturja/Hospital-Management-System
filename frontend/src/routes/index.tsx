import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import ProfileSettingsPage from '../pages/ProfileSettingsPage';

// Landing / Shared
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';

// Role Specific Dashboards
import PatientDashboardPage from '../pages/patient/PatientDashboardPage';
import DoctorDashboardPage from '../pages/doctor/DoctorDashboardPage';

import MyAppointmentsPage from '../pages/patient/MyAppointmentsPage';
import BookAppointmentPage from '../pages/patient/BookAppointmentPage';
import MyAdmissionsPage from '../pages/patient/MyAdmissionsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          // General Dashboard (Redirects based on role in component or shows generic)
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'profile',
            element: <ProfileSettingsPage />,
          },
          
          // Patient Routes
          {
            path: 'patient/dashboard',
            element: <PatientDashboardPage />,
          },
          {
            path: 'patient/appointments',
            element: <MyAppointmentsPage />,
          },
          {
            path: 'patient/book-appointment',
            element: <BookAppointmentPage />,
          },
          {
            path: 'patient/admissions',
            element: <MyAdmissionsPage />,
          },
          
          // Doctor Routes
          {
            path: 'doctor/dashboard',
            element: <DoctorDashboardPage />,
          },

          // Placeholders for future implementation
          {
            path: 'nurse/dashboard',
            element: <div className="p-8">Nurse Dashboard (Coming Soon)</div>,
          },
          {
            path: 'admin/dashboard',
            element: <div className="p-8">Admin Dashboard (Coming Soon)</div>,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;