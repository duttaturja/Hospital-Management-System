import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home, User, Users, FileText, Calendar, Activity, LogOut, Briefcase, Bed } from 'lucide-react';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <li>
      <Link
        to={to}
        className={cn(
          'flex items-center space-x-2 rounded-md p-2 transition-colors',
          isActive(to) 
            ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary' 
            : 'text-light-text-secondary hover:bg-light-background dark:text-dark-text-secondary dark:hover:bg-dark-surface'
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    </li>
  );

  return (
    <aside className='hidden w-64 flex-col border-r border-light-border bg-light-surface p-4 dark:border-dark-border dark:bg-dark-surface md:flex'>
      <div className='mb-6 text-xl font-bold text-light-text-primary dark:text-dark-text-primary'>
        HMS Portal
      </div>
      
      <nav className='flex-1 overflow-y-auto'>
        <ul className='space-y-1'>
          {/* Common */}
          <NavItem to='/dashboard' icon={Home} label='Dashboard' />
          <NavItem to='/profile' icon={User} label='Profile' />

          {/* Patient Routes */}
          {user?.role === 'Patient' && (
            <>
              <NavItem to='/patient/appointments' icon={Calendar} label='My Appointments' />
              <NavItem to='/patient/admissions' icon={Bed} label='Admissions' />
              <NavItem to='/bill/invoices' icon={FileText} label='My Invoices' />
            </>
          )}

          {/* Doctor Routes */}
          {user?.role === 'Doctor' && (
            <>
              <NavItem to='/doctor/appointments' icon={Calendar} label='Appointments' />
              <NavItem to='/records' icon={Activity} label='Patient Records' />
            </>
          )}

          {/* Nurse Routes */}
          {user?.role === 'Nurse' && (
            <>
              <NavItem to='/nurse/updates' icon={Activity} label='Patient Updates' />
              <NavItem to='/nurse/rooms' icon={Bed} label='Room Assignments' />
            </>
          )}

          {/* Admin/Staff Routes */}
          {(user?.role === 'Admin' || user?.role === 'Staff') && (
            <>
              <NavItem to='/admin/users' icon={Users} label='User Management' />
              <NavItem to='/bill/manage' icon={FileText} label='Billing & Salaries' />
              <NavItem to='/rooms' icon={Bed} label='Room Management' />
              <NavItem to='/staff/tasks' icon={Briefcase} label='Staff Tasks' />
            </>
          )}
        </ul>
      </nav>

      <div className='border-t border-light-border pt-4 dark:border-dark-border'>
        <div className='mb-2 text-sm font-medium'>{user?.username} ({user?.role})</div>
        <Button variant='outline' className='w-full justify-start' onClick={logout}>
          <LogOut size={16} className='mr-2' /> Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;