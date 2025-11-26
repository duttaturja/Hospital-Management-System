import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Calendar, Activity, DollarSign, Users } from 'lucide-react';

// Role-Specific Dashboard Components could be separated into files
const PatientStats = () => (
  <div className='grid gap-4 md:grid-cols-3'>
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Upcoming Appointments</CardTitle>
        <Calendar className='h-4 w-4 text-light-muted' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>2</div>
      </CardContent>
    </Card>
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Total Invoices</CardTitle>
        <DollarSign className='h-4 w-4 text-light-muted' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>$150.00</div>
      </CardContent>
    </Card>
  </div>
);

const DoctorStats = () => (
    <div className='grid gap-4 md:grid-cols-3'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Pending Appointments</CardTitle>
          <Calendar className='h-4 w-4 text-light-muted' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>8</div>
        </CardContent>
      </Card>
    </div>
  );

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold text-light-text-primary dark:text-dark-text-primary'>
        Dashboard
      </h1>
      <p className='text-light-text-secondary dark:text-dark-text-secondary'>
        Welcome back, {user?.first_name || user?.username}. You are logged in as <strong>{user?.role}</strong>.
      </p>

      {user?.role === 'Patient' && <PatientStats />}
      {user?.role === 'Doctor' && <DoctorStats />}
      {/* Add Admin/Nurse stats logic here */}
    </div>
  );
};

export default DashboardPage;