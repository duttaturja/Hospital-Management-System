import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Calendar, Users, Clock } from 'lucide-react';

const DoctorDashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-light-text-primary dark:text-dark-text-primary'>
          Doctor Dashboard
        </h1>
        <p className='text-light-text-secondary dark:text-dark-text-secondary'>
          Dr. {user?.last_name || user?.username} - Today's Overview
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Appointments Today</CardTitle>
            <Calendar className='h-4 w-4 text-light-primary dark:text-dark-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Patients</CardTitle>
            <Users className='h-4 w-4 text-light-primary dark:text-dark-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending Reports</CardTitle>
            <Clock className='h-4 w-4 text-light-primary dark:text-dark-primary' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;