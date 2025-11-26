import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import { Bed } from 'lucide-react';

interface Admission {
  id: number;
  admission_date: string;
  discharge_date: string | null;
  reason: string;
  room: number | null;
}

const MyAdmissionsPage: React.FC = () => {
  const { data: admissions, isLoading, error } = useFetch<Admission[]>('/patient/admissions/');

  if (isLoading) return <div className="flex justify-center p-8"><Loader /></div>;

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold text-light-text-primary dark:text-dark-text-primary'>
        My Admissions history
      </h1>

      {!isLoading && (!admissions || admissions.length === 0) ? (
        <Card>
          <CardContent className='flex flex-col items-center justify-center p-12 text-center'>
            <Bed className='h-12 w-12 text-light-muted mb-4' />
            <h3 className='text-lg font-semibold'>No admission records</h3>
            <p className='text-light-text-secondary'>You have no history of hospital admissions.</p>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-4'>
          {admissions?.map((adm) => (
            <Card key={adm.id}>
              <CardHeader>
                <CardTitle className="text-lg">Admission #{adm.id}</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-4 md:grid-cols-2'>
                <div>
                  <span className='text-sm font-medium text-light-text-secondary'>Date Admitted:</span>
                  <p>{new Date(adm.admission_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className='text-sm font-medium text-light-text-secondary'>Discharged:</span>
                  <p>{adm.discharge_date ? new Date(adm.discharge_date).toLocaleDateString() : 'Ongoing'}</p>
                </div>
                <div className='md:col-span-2'>
                  <span className='text-sm font-medium text-light-text-secondary'>Reason:</span>
                  <p className='mt-1'>{adm.reason}</p>
                </div>
                <div>
                  <span className='text-sm font-medium text-light-text-secondary'>Room ID:</span>
                  <p>{adm.room ? adm.room : 'Not assigned'}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAdmissionsPage;