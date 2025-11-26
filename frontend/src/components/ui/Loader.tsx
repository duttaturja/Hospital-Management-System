import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LoaderProps {
  className?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ className, size = 48 }) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2
        className='animate-spin text-light-primary dark:text-dark-primary'
        size={size}
      />
    </div>
  );
};

export default Loader;