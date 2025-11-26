import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { toast } from 'react-hot-toast';
import { type AuthResponse } from '../types';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState(''); // Backend expects username, not email
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiClient.post<AuthResponse>('/user/login/', { username, password });
      login(response.data);
      toast.success(`Welcome back, ${response.data.user.username}!`);
      
      // Role based redirect
      const role = response.data.user.role;
      if (role === 'Doctor') navigate('/doctor/dashboard');
      else if (role === 'Patient') navigate('/patient/dashboard');
      else if (role === 'Nurse') navigate('/nurse/dashboard');
      else if (role === 'Admin' || role === 'Staff') navigate('/admin/dashboard');
      else navigate('/dashboard');

    } catch (err: any) {
      const msg = err.response?.data?.non_field_errors?.[0] || 'Login failed.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-light-background dark:bg-dark-background'>
      <Card className='w-full max-w-sm'>
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle className='text-2xl'>HMS Login</CardTitle>
            <CardDescription>Enter your credentials to access the system.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <label htmlFor='username'>Username</label>
              <Input id='username' type='text' required value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
            </div>
            <div className='grid gap-2'>
              <label htmlFor='password'>Password</label>
              <Input id='password' type='password' required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-4'>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className='text-center text-sm'>
              Need an account? <Link to='/signup' className='text-light-primary hover:underline'>Sign up</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;