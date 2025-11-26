import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Calendar, FileText, Activity } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const PatientDashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-light-text-primary dark:text-dark-text-primary'>
            Patient Dashboard
          </h1>
          <p className='text-light-text-secondary dark:text-dark-text-secondary'>
            Welcome back, {user?.first_name || user?.username}.
          </p>
        </div>
        <Button asChild>
          <Link to='/patient/book-appointment'>Book Appointment</Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Upcoming Appointments</CardTitle>
            <Calendar className='h-4 w-4 text-light-primary dark:text-dark-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
            <p className='text-xs text-light-text-secondary dark:text-dark-text-secondary'>
              Next: None scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Prescriptions</CardTitle>
            <Activity className='h-4 w-4 text-light-primary dark:text-dark-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending Invoices</CardTitle>
            <FileText className='h-4 w-4 text-light-primary dark:text-dark-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$0.00</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className='grid gap-4 md:grid-cols-2'>
        <Card className='col-span-1'>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
              No recent appointments found.
            </p>
          </CardContent>
        </Card>
        <Card className='col-span-1'>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
              No medical records available.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboardPage;