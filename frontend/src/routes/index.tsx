import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import DashboardPage from '../pages/DashboardPage';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ProfileSettingsPage from '../pages/ProfileSettingsPage';
import ChatPage from '../pages/ChatPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';

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
        path: 'components',
        element: <HomePage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'terms-of-service',
        element: <TermsOfServicePage />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'profile',
            element: <ProfileSettingsPage />,
          },
          {
            path: 'chat',
            element: <ChatPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPasswordPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;