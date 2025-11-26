import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, type Variants } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Card, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

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

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    // Get EmailJS keys from .env
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      toast.error('EmailJS is not configured. Please check your .env file.');
      return;
    }

    setIsLoading(true);

    emailjs
      .sendForm(serviceID, templateID, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          toast.success('Message sent successfully!');
          form.current?.reset();
        },
        (error) => {
          console.error('FAILED...', error);
          toast.error(`Failed to send message: ${error.text}`);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <motion.div
      className='space-y-8'
      initial='hidden'
      animate='visible'
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={itemVariants}>
        <h1 className='text-4xl font-bold text-light-text-primary dark:text-dark-text-primary'>
          Get in Touch
        </h1>
        <p className='mt-2 text-light-text-secondary dark:text-dark-text-secondary'>
          We'd love to hear from you. Fill out the form below or use one of our
          contact methods.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        {/* Contact Form */}
        <motion.div className='md:col-span-2' variants={itemVariants}>
          <Card>
            <CardContent className='p-6'>
              <form ref={form} onSubmit={sendEmail} className='space-y-4'>
                <div className='grid gap-2'>
                  <label htmlFor='from_name'>Name</label>
                  <Input
                    id='from_name'
                    name='from_name'
                    type='text'
                    placeholder='Your Name'
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className='grid gap-2'>
                  <label htmlFor='from_email'>Email</label>
                  <Input
                    id='from_email'
                    name='from_email'
                    type='email'
                    placeholder='your@email.com'
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className='grid gap-2'>
                  <label htmlFor='message'>Message</label>
                  <textarea
                    id='message'
                    name='message'
                    placeholder='Your message...'
                    required
                    disabled={isLoading}
                    rows={6}
                    className='flex w-full rounded-md border border-light-border bg-transparent px-3 py-2 text-sm text-light-text-primary ring-offset-light-background placeholder:text-light-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border dark:text-dark-text-primary dark:ring-offset-dark-background dark:placeholder:text-dark-muted dark:focus-visible:ring-dark-primary'
                  />
                </div>
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div className='space-y-4' variants={itemVariants}>
          <Card>
            <CardContent className='flex items-center gap-4 p-6'>
              <Mail className='h-6 w-6 flex-shrink-0 text-light-primary dark:text-dark-primary' />
              <div>
                <h3 className='font-semibold'>Email</h3>
                <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                  hello@frontgen.com
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='flex items-center gap-4 p-6'>
              <Phone className='h-6 w-6 flex-shrink-0 text-light-primary dark:text-dark-primary' />
              <div>
                <h3 className='font-semibold'>Phone</h3>
                <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                  +1 (234) 567-890
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='flex items-center gap-4 p-6'>
              <MapPin className='h-6 w-6 flex-shrink-0 text-light-primary dark:text-dark-primary' />
              <div>
                <h3 className='font-semibold'>Address</h3>
                <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                  123 Code Street, Dev City
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;