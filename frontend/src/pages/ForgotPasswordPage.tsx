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
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // MOCK API CALL: Simulate sending a reset email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Sending password reset email to:', email);
    toast.success('If an account exists, a reset link has been sent.');
    setIsLoading(false);
    setEmail('');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-light-background dark:bg-dark-background'>
      <Card className='w-full max-w-sm'>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className='text-2xl'>Forgot Password?</CardTitle>
            <CardDescription>
              Enter your email and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <label htmlFor='email'>Email</label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-4'>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
            <div className='text-center text-sm'>
              Remembered your password?{' '}
              <Link
                to='/login'
                className='font-medium text-light-primary underline-offset-4 hover:underline dark:text-dark-primary'
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;