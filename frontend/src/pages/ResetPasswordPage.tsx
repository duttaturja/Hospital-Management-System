import React, { useState } from 'react';
import Button from '../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/Card';
import Input from '../components/ui/Input';
import { Link, useParams } from 'react-router-dom'; // GEAR
import { toast } from 'react-hot-toast';

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams<{ token: string }>(); // Example of getting token from URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    
    // MOCK API CALL: Simulate resetting the password
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Resetting password with token:', token);
    toast.success('Password reset successfully!');
    setIsLoading(false);
    // navigate('/login');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-light-background dark:bg-dark-background'>
      <Card className='w-full max-w-sm'>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className='text-2xl'>Reset Your Password</CardTitle>
            <CardDescription>
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <label htmlFor='password'>New Password</label>
              <Input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className='grid gap-2'>
              <label htmlFor='confirm-password'>Confirm New Password</label>
              <Input
                id='confirm-password'
                type='password'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-4'>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save New Password'}
            </Button>
            <div className='text-center text-sm'>
              <Link
                to='/login'
                className='font-medium text-light-primary underline-offset-4 hover:underline dark:text-dark-primary'
              >
                Back to Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;