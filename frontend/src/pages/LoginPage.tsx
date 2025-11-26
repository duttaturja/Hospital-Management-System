import React, { useState, useEffect } from 'react';
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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    setIsLoading(true);

    try {
      // MOCK API CALL: Replace this with a real API call
      // const response = await apiClient.post('/auth/login', { email, password });
      // const { user, token } = response.data;
      
      // --- Start Mock Logic ---
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      if (email === 'test@example.com' && password === 'password') {
        const mockUser = { id: '1', name: 'John Doe', email: email };
        const mockToken = 'fake-jwt-token-from-api';
        login(mockUser, mockToken);
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
         throw new Error('Invalid credentials');
      }
      // --- End Mock Logic ---
      
    } catch (err) {
      const error = err as AxiosError | Error;
      let errorMessage = 'Login failed. Please try again.';
      if ('isAxiosError' in error && error.isAxiosError && error.response) {
         // Assuming backend sends { message: '...' }
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
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <label htmlFor='email'>Email</label>
              <Input
                id='email'
                type='email'
                placeholder='test@example.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center justify-between'>
                <label htmlFor='password'>Password</label>
                <Link
                  to='/forgot-password'
                  className='text-sm font-medium text-light-primary underline-offset-4 hover:underline dark:text-dark-primary'
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-4'>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className='text-center text-sm'>
              Don't have an account?{' '}
              <Link
                to='/signup'
                className='font-medium text-light-primary underline-offset-4 hover:underline dark:text-dark-primary'
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;