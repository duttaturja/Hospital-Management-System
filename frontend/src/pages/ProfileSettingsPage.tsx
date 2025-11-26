import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { motion, type Variants } from 'framer-motion';
import apiClient from '../services/api';
import { AxiosError } from 'axios';

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const ProfileSettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Combined state for user (User model) and profile (Profile model) fields
  const [formData, setFormData] = useState({
    // User Model Fields
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    
    // Common Profile Fields
    contact_number: '',
    address: '',
    
    // Patient Specific
    date_of_birth: '',
    emergency_contact: '',
    medical_history: '',
    
    // Doctor/Nurse/Staff Specific
    specialization: '',
    department: '',
    job_title: '',
    experience: '', // Doctor uses 'experience', Nurse/Staff uses 'experience_years'
    experience_years: '', 
    fees: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  // Determine the correct profile endpoint based on role
  const getProfileEndpoint = () => {
    if (!user) return '';
    switch (user.role) {
      case 'Patient': return `/patient/profile/${user.id}/`;
      case 'Doctor': return `/doctor/profile/${user.id}/`;
      case 'Staff': return `/staff/profiles/${user.id}/`; // Note: 'profiles' plural in staff url
      case 'Nurse': return `/nurse/profile/${user.id}/`;
      case 'Admin': return ''; // Admins might not have a specific profile model in this setup
      default: return '';
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const endpoint = getProfileEndpoint();
        
        // Base user data
        let initialData: any = {
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',
          username: user.username || '',
        };

        // If role has a profile endpoint, fetch additional details
        if (endpoint) {
          const response = await apiClient.get(endpoint);
          const profile = response.data;
          
          // Merge profile data
          initialData = {
            ...initialData,
            ...profile,
            // Normalize experience field which has different names in different models
            experience: profile.experience || profile.experience_years || '', 
            experience_years: profile.experience_years || profile.experience || '',
          };
        }

        setFormData((prev) => ({ ...prev, ...initialData }));
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    const endpoint = getProfileEndpoint();

    try {
      // 1. Update User Model (First Name, Last Name, Email)
      // Note: Depending on backend, this might need a separate endpoint or be handled by the profile view.
      // Assuming standard profile view PATCH handles this or we treat them separately.
      // For this implementation, we will send the payload to the profile endpoint.
      
      if (endpoint) {
        await apiClient.patch(endpoint, formData);
        
        // Update local user context if basic info changed
        const updatedUser = {
            ...user,
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email
        };
        updateUser(updatedUser); // You need to expose this in AuthContext
        
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Profile updates are not supported for this role.');
      }
    } catch (err) {
      const error = err as AxiosError | Error;
      console.error(error);
      toast.error('Failed to update profile. Please check your inputs.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for password change logic
    toast.error('Password change API not currently available.');
    setPasswordData({ oldPassword: '', newPassword: '' });
  };

  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <Loader size={48} />
      </div>
    );
  }

  return (
    <motion.div
      className='space-y-8'
      initial='hidden'
      animate='visible'
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.h1 
        className='text-3xl font-bold text-light-text-primary dark:text-dark-text-primary'
        variants={itemVariants}
      >
        Profile & Settings
      </motion.h1>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className='space-y-6'>
              {/* Common Fields */}
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Username</label>
                  <Input
                    name='username'
                    value={formData.username}
                    disabled
                    className='bg-light-background/50'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Email</label>
                  <Input
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>First Name</label>
                  <Input
                    name='first_name'
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Last Name</label>
                  <Input
                    name='last_name'
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Patient Specific Fields */}
              {user?.role === 'Patient' && (
                <>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Date of Birth</label>
                      <Input
                        name='date_of_birth'
                        type='date'
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Contact Number</label>
                      <Input
                        name='contact_number'
                        value={formData.contact_number}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Emergency Contact</label>
                      <Input
                        name='emergency_contact'
                        value={formData.emergency_contact}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Address</label>
                    <textarea
                      name='address'
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      className='flex w-full rounded-md border border-light-border bg-transparent px-3 py-2 text-sm text-light-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary dark:border-dark-border dark:text-dark-text-primary'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Medical History</label>
                    <textarea
                      name='medical_history'
                      rows={3}
                      value={formData.medical_history}
                      onChange={handleInputChange}
                      className='flex w-full rounded-md border border-light-border bg-transparent px-3 py-2 text-sm text-light-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary dark:border-dark-border dark:text-dark-text-primary'
                    />
                  </div>
                </>
              )}

              {/* Doctor Specific Fields */}
              {user?.role === 'Doctor' && (
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Specialization</label>
                    <Input
                      name='specialization'
                      value={formData.specialization}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Experience (Years)</label>
                    <Input
                      name='experience'
                      type='number'
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Consultation Fees</label>
                    <Input
                      name='fees'
                      type='number'
                      value={formData.fees}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {/* Staff/Nurse Specific Fields */}
              {(user?.role === 'Staff' || user?.role === 'Nurse') && (
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Department</label>
                    <Input
                      name='department'
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                  </div>
                  {user.role === 'Staff' && (
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Job Title</label>
                      <Input
                        name='job_title'
                        value={formData.job_title}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Experience (Years)</label>
                    <Input
                      name='experience_years'
                      type='number'
                      value={formData.experience_years}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Contact Number</label>
                    <Input
                      name='contact_number'
                      value={formData.contact_number}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <div className='flex justify-end'>
                <Button type='submit' disabled={isSaving}>
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Change Password Section */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPassword} className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Current Password</label>
                  <Input
                    name='oldPassword'
                    type='password'
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>New Password</label>
                  <Input
                    name='newPassword'
                    type='password'
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className='flex justify-end'>
                <Button type='submit' variant='secondary' disabled={true}>
                  Update Password (Disabled)
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSettingsPage;