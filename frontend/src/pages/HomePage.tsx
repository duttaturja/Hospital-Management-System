import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/Card';
import { Modal, useModal } from '../components/ui/Modal';
import { toast } from 'react-hot-toast';
import Loader from '../components/ui/Loader';

function HomePage() {
  const { openModal } = useModal();

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-4xl font-bold text-light-text-primary dark:text-dark-text-primary'>
          UI Components
        </h1>
        <p className='mt-2 text-light-text-secondary dark:text-dark-text-secondary'>
          A collection of reusable components for FrontGen.
        </p>
      </div>

      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          Buttons
        </h2>
        <div className='flex flex-wrap items-center gap-4'>
          <Button>Default</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='link'>Link</Button>
        </div>
      </div>

      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          Inputs
        </h2>
        <div className='max-w-sm space-y-4'>
          <Input type='email' placeholder='Email' />
          <Input type='text' placeholder='Disabled' disabled />
        </div>
      </div>

      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          Cards
        </h2>
        <div className='max-w-sm'>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          Modals
        </h2>
        <Button onClick={openModal}>Open Modal</Button>
        <Modal title='Modal Title'>
          <p>This is the modal content. You can put any React components here.</p>
          <div className='mt-4 flex justify-end'>
            <Button variant='secondary'>Confirm</Button>
          </div>
        </Modal>
      </div>

      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          Toasts
        </h2>
        <div className='flex flex-wrap items-center gap-4'>
          <Button onClick={() => toast.success('Successfully created!')}>
            Success Toast
          </Button>
          <Button
            variant='destructive'
            onClick={() => toast.error('This is an error!')}
          >
            Error Toast
          </Button>
        </div>
      </div>

      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          Loaders
        </h2>
        <div className='flex items-center gap-8'>
          <Loader size={24} />
          <Loader size={48} />
          <Loader size={64} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;