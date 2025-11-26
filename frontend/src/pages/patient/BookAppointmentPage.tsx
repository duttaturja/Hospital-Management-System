import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const BookAppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctor: '', // Ideally this would be a dropdown if we had a list of doctors
    appointment_date: '',
    symptoms: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctor || !formData.appointment_date || !formData.symptoms) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // Convert date to ISO format if needed, or send as is depending on backend expectation
      // Django DateTimeField usually accepts 'YYYY-MM-DDTHH:MM'
      await apiClient.post('/patient/appointments/', {
        doctor: parseInt(formData.doctor),
        appointment_date: formData.appointment_date,
        symptoms: formData.symptoms
      });
      
      toast.success('Appointment booked successfully!');
      navigate('/patient/appointments');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.detail || 'Failed to book appointment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto space-y-6'>
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Book a New Appointment</CardTitle>
          <CardDescription>Fill in the details below to schedule a visit.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Doctor ID</label>
              <Input 
                name="doctor"
                type="number"
                placeholder="Enter Doctor ID (e.g. 1)"
                value={formData.doctor}
                onChange={handleChange}
                required
              />
              <p className='text-xs text-light-text-secondary'>
                * Enter the ID of the doctor you wish to see.
              </p>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Date & Time</label>
              <Input 
                name="appointment_date"
                type="datetime-local"
                value={formData.appointment_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Symptoms</label>
              <textarea
                name="symptoms"
                rows={4}
                placeholder="Describe your symptoms..."
                className="flex w-full rounded-md border border-light-border bg-transparent px-3 py-2 text-sm text-light-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary dark:border-dark-border dark:text-dark-text-primary"
                value={formData.symptoms}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAppointmentPage;