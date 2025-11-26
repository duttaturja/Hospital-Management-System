import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import Button from '../components/ui/Button';
import MainLayout from '../layouts/MainLayout';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <MainLayout>
      <div className='flex h-full flex-col items-center justify-center text-center'>
        <h1 className='text-9xl font-bold text-light-primary dark:text-dark-primary'>
          Oops!
        </h1>
        <h2 className='mt-4 text-3xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          Sorry, an unexpected error has occurred.
        </h2>
        <p className='mt-2 text-light-text-secondary dark:text-dark-text-secondary'>
          <i>{error.statusText || error.message}</i>
        </p>
        <Button asChild className='mt-6'>
          <Link to='/'>Go back home</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default ErrorPage;