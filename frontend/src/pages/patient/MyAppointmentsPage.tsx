import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';

// Define the shape based on your Django Serializer
interface Appointment {
  id: number;
  doctor: number; // The serializer returns the ID currently
  appointment_date: string;
  symptoms: string;
  status?: string; // If added to the model later
}

const MyAppointmentsPage: React.FC = () => {
  const { data: appointments, isLoading, error } = useFetch<Appointment[]>('/patient/appointments/');

  if (isLoading) return <div className="flex justify-center p-8"><Loader /></div>;

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-light-text-primary dark:text-dark-text-primary'>
          My Appointments
        </h1>
        <Button asChild>
          <Link to='/patient/book-appointment'>
            <Plus className='mr-2 h-4 w-4' />
            New Appointment
          </Link>
        </Button>
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md border border-red-200">
          Failed to load appointments.
        </div>
      )}

      {!isLoading && (!appointments || appointments.length === 0) ? (
        <Card>
          <CardContent className='flex flex-col items-center justify-center p-12 text-center'>
            <Calendar className='h-12 w-12 text-light-muted mb-4' />
            <h3 className='text-lg font-semibold'>No appointments found</h3>
            <p className='text-light-text-secondary'>You haven't booked any appointments yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className='grid gap-4'>
          {appointments?.map((apt) => (
            <Card key={apt.id}>
              <CardContent className='p-6 flex justify-between items-center'>
                <div>
                  <div className='font-semibold text-lg'>Doctor ID: {apt.doctor}</div>
                  <div className='text-sm text-light-text-secondary'>
                    Date: {new Date(apt.appointment_date).toLocaleString()}
                  </div>
                  <div className='mt-2 text-sm bg-light-secondary/10 inline-block px-2 py-1 rounded text-light-secondary'>
                    Symptoms: {apt.symptoms}
                  </div>
                </div>
                <div className='text-right'>
                  <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800'>
                    Scheduled
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointmentsPage;