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
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../services/api';
import { AxiosError } from 'axios';

const SignUpPage: React.FC = () => {
  // Form state matching your Django User model
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    role: 'Patient', // Default role
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      // Connects to your Django UserRegisterView
      await apiClient.post('/user/register/', formData);
      
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
      
    } catch (err) {
      const error = err as AxiosError<any>;
      let errorMessage = 'Sign up failed.';
      
      // Parse Django REST Framework error response
      if (error.response?.data) {
        // Django sends errors like { username: ["This field is required"], email: [...] }
        const firstErrorKey = Object.keys(error.response.data)[0];
        const firstErrorMsg = error.response.data[firstErrorKey];
        
        if (Array.isArray(firstErrorMsg)) {
          errorMessage = `${firstErrorKey}: ${firstErrorMsg[0]}`;
        } else {
          errorMessage = JSON.stringify(error.response.data);
        }
      } else if (error.message) {
         errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-light-background dark:bg-dark-background py-8'>
      <Card className='w-full max-w-md'>
        <form onSubmit={handleSignUp}>
          <CardHeader>
            <CardTitle className='text-2xl'>Create an Account</CardTitle>
            <CardDescription>
              Enter your details to register for the Hospital Management System.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            
            {/* Name Fields */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <label htmlFor='first_name'>First Name</label>
                <Input
                  id='first_name'
                  name='first_name'
                  type='text'
                  placeholder='John'
                  value={formData.first_name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
              <div className='grid gap-2'>
                <label htmlFor='last_name'>Last Name</label>
                <Input
                  id='last_name'
                  name='last_name'
                  type='text'
                  placeholder='Doe'
                  value={formData.last_name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Username & Role */}
            <div className='grid gap-2'>
              <label htmlFor='username'>Username</label>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='johndoe123'
                required
                value={formData.username}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            <div className='grid gap-2'>
              <label htmlFor='role'>Role</label>
              <div className="relative">
                <select
                  id='role'
                  name='role'
                  value={formData.role}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="flex h-10 w-full rounded-md border border-light-border bg-transparent px-3 py-2 text-sm text-light-text-primary ring-offset-light-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border dark:text-dark-text-primary dark:ring-offset-dark-background dark:focus-visible:ring-dark-primary"
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Email & Password */}
            <div className='grid gap-2'>
              <label htmlFor='email'>Email</label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='m@example.com'
                required
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div className='grid gap-2'>
              <label htmlFor='password'>Password</label>
              <Input
                id='password'
                name='password'
                type='password'
                required
                value={formData.password}
                onChange={handleInputChange}
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