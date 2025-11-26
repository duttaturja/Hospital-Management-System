import * as React from 'react';
import { cn } from '../../utils/cn';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    if (type === 'password') {
      return (
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            className={cn(
              'flex h-10 w-full rounded-md border border-light-border bg-transparent px-3 py-2 pr-10 text-sm text-light-text-primary ring-offset-light-background placeholder:text-light-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border dark:text-dark-text-primary dark:ring-offset-dark-background dark:placeholder:text-dark-muted dark:focus-visible:ring-dark-primary',
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-0 flex items-center pr-3 text-light-text-secondary hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className='h-5 w-5' />
            ) : (
              <Eye className='h-5 w-5' />
            )}
          </button>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-light-border bg-transparent px-3 py-2 text-sm text-light-text-primary ring-offset-light-background placeholder:text-light-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border dark:text-dark-text-primary dark:ring-offset-dark-background dark:placeholder:text-dark-muted dark:focus-visible:ring-dark-primary',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export default Input;