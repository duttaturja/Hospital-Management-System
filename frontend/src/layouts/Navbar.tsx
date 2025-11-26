import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className='sticky top-0 z-10 border-b border-light-border bg-light-surface/80 px-4 py-3 shadow-sm backdrop-blur-md dark:border-dark-border dark:bg-dark-surface/80'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link
          to='/'
          className='text-xl font-bold text-light-text-primary dark:text-dark-text-primary'
        >
          FrontGen
        </Link>
        <div className='flex items-center space-x-4'>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className='rounded-full p-2 text-light-text-secondary transition-colors hover:bg-light-border hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-border dark:hover:text-dark-text-primary'
            aria-label='Toggle theme'
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='rounded-md p-2 text-light-text-secondary hover:bg-light-border hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-border dark:hover:text-dark-text-primary'
              aria-label='Open main menu'
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='mt-4 md:hidden'>
          <ul className='flex flex-col space-y-2 text-light-text-primary dark:text-dark-text-primary'>
            <li>
              <Link
                to='/about'
                className='block rounded p-2 hover:bg-light-background dark:hover:bg-dark-surface'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='block rounded p-2 hover:bg-light-background dark:hover:bg-dark-surface'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    to='/dashboard'
                    className='block rounded p-2 hover:bg-light-background dark:hover:bg-dark-surface'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to='/chat'
                    className='block rounded p-2 hover:bg-light-background dark:hover:bg-dark-surface'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Chat
                  </Link>
                </li>
                <li>
                  <Link
                    to='/profile'
                    className='block rounded p-2 hover:bg-light-background dark:hover:bg-dark-surface'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <li>
                <Link
                  to='/login'
                  className='block rounded p-2 hover:bg-light-background dark:hover:bg-dark-surface'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;