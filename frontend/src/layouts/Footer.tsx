import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='border-t border-light-border bg-light-surface px-4 py-6 dark:border-dark-border dark:bg-dark-surface'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 text-sm text-light-muted dark:text-dark-muted sm:flex-row'>
        <div>
          &copy; {currentYear} FrontGen. All Rights Reserved.
        </div>
        <nav className='flex gap-4 sm:gap-6'>
          <Link
            to='/privacy-policy'
            className='transition-colors hover:text-light-text-primary dark:hover:text-dark-text-primary'
          >
            Privacy Policy
          </Link>
          <Link
            to='/terms-of-service'
            className='transition-colors hover:text-light-text-primary dark:hover:text-dark-text-primary'
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;