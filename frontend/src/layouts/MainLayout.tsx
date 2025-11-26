import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col bg-light-background dark:bg-dark-background'>
      <Navbar />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto p-4 sm:p-6 md:p-8'>
          {children}
        </main>
      </div>
      <Footer />
      <Toaster
        position='bottom-right'
        toastOptions={{
          className:
            'border border-light-border bg-light-surface text-light-text-primary dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary',
          success: {
            iconTheme: {
              primary: '#10B981', // light.accent
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444', // light.error
              secondary: '#FFFFFF',
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;