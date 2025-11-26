import React from 'react';
import {
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  User,
  Users,
  Search,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

const Sidebar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className='hidden w-64 flex-shrink-0 flex-col justify-between overflow-y-auto border-r border-light-border bg-light-surface p-4 dark:border-dark-border dark:bg-dark-surface md:flex'>
      <div>
        <div className='text-lg font-semibold text-light-text-primary dark:text-dark-text-primary'>
          Navigation
        </div>
        <nav className='mt-4'>
          <ul>
            <li>
              <Link
                to='/'
                className='flex items-center space-x-2 rounded-md p-2 text-light-text-secondary hover:bg-light-background dark:text-dark-text-secondary dark:hover:bg-dark-background'
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='flex items-center space-x-2 rounded-md p-2 text-light-text-secondary hover:bg-light-background dark:text-dark-text-secondary dark:hover:bg-dark-background'
              >
                <Users size={20} />
                <span>About</span>
              </Link>
            </li>
            <li>
                <Link
                  to='/components'
                  className='flex items-center space-x-2 rounded-md p-2 text-light-text-secondary hover:bg-light-background dark:text-dark-text-secondary dark:hover:bg-dark-background'
                >
                  <Search size={20} />
                  <span>Components</span>
                </Link>
              </li>
            <li>
              <Link
                to='/contact'
                className='flex items-center space-x-2 rounded-md p-2 text-light-text-secondary hover:bg-light-background dark:text-dark-text-secondary dark:hover:bg-dark-background'
              >
                <Mail size={20} />
                <span>Contact</span>
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    to='/dashboard'
                    className='flex items-center space-x-2 rounded-md p-2 text-light-text-secondary hover:bg-light-background dark:text-dark-text-secondary dark:hover:bg-dark-background'
                  >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/chat'
                    className='flex items-center space-x-2 rounded-md p-2 text-light-text-secondary hover:bg-light-background dark:text-dark-text-secondary dark:hover:bg-dark-background'
                  >
                    <MessageSquare size={20} />
                    <span>Chat</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div>
        {isAuthenticated ? (
          <div className='space-y-2'>
            <div className='text-sm text-light-text-primary dark:text-dark-text-primary'>
              Signed in as <span className='font-semibold'>{user?.name}</span>
            </div>
            <Button asChild variant='ghost' className='w-full justify-start'>
              <Link to='/profile'>
                <User size={16} className='mr-2' />
                Profile Settings
              </Link>
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={handleLogout}
            >
              <LogOut size={16} className='mr-2' />
              Logout
            </Button>
          </div>
        ) : (
          <Button asChild variant='outline' className='w-full'>
            <Link to='/login'>
              <LogIn size={16} className='mr-2' />
              Login
            </Link>
          </Button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;