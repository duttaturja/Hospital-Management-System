import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center text-center'>
      <h1 className='text-9xl font-bold text-light-primary dark:text-dark-primary'>404</h1>
      <h2 className='mt-4 text-3xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
        Page Not Found
      </h2>
      <p className='mt-2 text-light-text-secondary dark:text-dark-text-secondary'>
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button asChild className='mt-6'>
        <Link to='/'>Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;