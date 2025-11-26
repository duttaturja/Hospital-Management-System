import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Slot } from '@radix-ui/react-slot';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-light-text-primary dark:text-dark-text-primary',
  {
    variants: {
      variant: {
        default:
          'bg-light-primary text-white hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90',
        destructive:
          'bg-light-error text-white hover:bg-light-error/90 dark:bg-dark-error dark:hover:bg-dark-error/90',
        outline:
          'border border-light-border bg-transparent hover:bg-light-background dark:border-dark-border dark:hover:bg-dark-surface',
        secondary:
          'bg-light-secondary/20 text-light-secondary hover:bg-light-secondary/30 dark:bg-dark-secondary/20 dark:text-dark-secondary dark:hover:bg-dark-secondary/30',
        ghost: 'hover:bg-light-background dark:hover:bg-dark-surface',
        link: 'underline-offset-4 hover:underline text-light-primary dark:text-dark-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;