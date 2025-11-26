import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { motion, type Variants } from 'framer-motion';

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
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingProfile(true);
    
    // MOCK API CALL: Simulate updating user profile
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Updating profile with:', { name, email });

    // Update the user in our auth context (and localStorage)
    if (user) {
      const updatedUser = { ...user, name, email };
      // We'd get a new token in a real app, but we'll reuse the old one
      const token = localStorage.getItem('token') || '';
      login(updatedUser, token);
    }
    
    toast.success('Profile updated successfully!');
    setIsLoadingProfile(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingPassword(true);

    // MOCK API CALL: Simulate changing password
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Changing password...');

    toast.success('Password changed successfully!');
    setIsLoadingPassword(false);
    setOldPassword('');
    setNewPassword('');
  };

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

      {/* Edit Profile Card */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className='space-y-4'>
              <div className='grid gap-2'>
                <label htmlFor='name'>Name</label>
                <Input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoadingProfile}
                />
              </div>
              <div className='grid gap-2'>
                <label htmlFor='email'>Email</label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoadingProfile}
                />
              </div>
              <Button type='submit' disabled={isLoadingProfile}>
                {isLoadingProfile ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Change Password Card */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className='space-y-4'>
              <div className='grid gap-2'>
                <label htmlFor='oldPassword'>Old Password</label>
                <Input
                  id='oldPassword'
                  type='password'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={isLoadingPassword}
                />
              </div>
              <div className='grid gap-2'>
                <label htmlFor='newPassword'>New Password</label>
                <Input
                  id='newPassword'
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoadingPassword}
                />
              </div>
              <Button type='submit' variant='secondary' disabled={isLoadingPassword}>
                {isLoadingPassword ? 'Saving...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSettingsPage;
