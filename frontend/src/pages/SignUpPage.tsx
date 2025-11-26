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
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../services/api';
import { AxiosError } from 'axios';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setIsLoading(true);

    try {
      // MOCK API CALL: Replace with a real sign-up call
      // const response = await apiClient.post('/auth/register', { name, email, password });
      // const { user, token } = response.data;
      
      // --- Start Mock Logic ---
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = { id: '2', name, email };
      const mockToken = 'fake-jwt-token-from-signup';
      // --- End Mock Logic ---
      
      login(mockUser, mockToken);
      toast.success('Account created successfully!');
      navigate('/dashboard');
      
    } catch (err) {
      const error = err as AxiosError | Error;
      let errorMessage = 'Sign up failed. Please try again.';
      if ('isAxiosError' in error && error.isAxiosError && error.response) {
         errorMessage = (error.response.data as { message: string }).message || errorMessage;
      } else {
         errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-light-background dark:bg-dark-background'>
      <Card className='w-full max-w-sm'>
        <form onSubmit={handleSignUp}>
          <CardHeader>
            <CardTitle className='text-2xl'>Create an Account</CardTitle>
            <CardDescription>
              Enter your details below to create your new account.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <label htmlFor='name'>Name</label>
              <Input
                id='name'
                type='text'
                placeholder='Your Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
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
            <div className='grid gap-2'>
              <label htmlFor='password'>Password</label>
              <Input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-4'>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            <div className='text-center text-sm'>
              Already have an account?{' '}
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

export default SignUpPage;