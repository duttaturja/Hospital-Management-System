import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from './Button';

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

interface ModalProps {
  children: ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ children, title }) => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-light-background/80 backdrop-blur-sm dark:bg-dark-background/80'
      onClick={closeModal}
    >
      <div
        className={cn(
          'relative w-full max-w-lg rounded-lg border border-light-border bg-light-surface p-6 shadow-lg dark:border-dark-border dark:bg-dark-surface'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-light-text-primary dark:text-dark-text-primary'>
            {title}
          </h2>
          <Button variant='ghost' size='sm' onClick={closeModal}>
            <X className='h-4 w-4' />
          </Button>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};