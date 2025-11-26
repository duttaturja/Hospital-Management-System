import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import useFetch from '../hooks/useFetch';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';

// Example data structure for dashboard stats
interface StatsData {
  users: number;
  projects: number;
  tasks: number;
}

const DashboardPage: React.FC = () => {
  // We use a non-existent endpoint to demonstrate the loading and error states.
  // When a real backend is connected, this will fetch real data.
  const { data, isLoading, error, refetch } = useFetch<StatsData>('/stats');

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-light-text-primary dark:text-dark-text-primary'>
          Dashboard
        </h1>
        <Button onClick={refetch} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader size={24} />
            ) : error ? (
              <p className='text-sm text-light-error dark:text-dark-error'>
                Failed to load data.
              </p>
            ) : (
              <p className='text-2xl font-bold'>{data?.users ?? 'N/A'}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader size={24} />
            ) : error ? (
              <p className='text-sm text-light-error dark:text-dark-error'>
                Failed to load data.
              </p>
            ) : (
              <p className='text-2xl font-bold'>{data?.projects ?? 'N/A'}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader size={24} />
            ) : error ? (
              <p className='text-sm text-light-error dark:text-dark-error'>
                Failed to load data.
              </p>
            ) : (
              <p className='text-2xl font-bold'>{data?.tasks ?? 'N/A'}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {error && (
        <Card className='border-light-error/50 bg-light-error/10 dark:border-dark-error/50 dark:bg-dark-error/10'>
          <CardHeader>
            <CardTitle className='text-light-error dark:text-dark-error'>
              Error Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className='text-xs text-light-text-secondary dark:text-dark-text-secondary'>
              <code>{error.message}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;