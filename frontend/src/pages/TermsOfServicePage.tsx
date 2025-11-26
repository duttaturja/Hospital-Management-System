import React from 'react';
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

const TermsOfServicePage: React.FC = () => {
  return (
    <motion.div
      className='space-y-4'
      initial='hidden'
      animate='visible'
      variants={itemVariants}
    >
      <h1 className='text-4xl font-bold text-light-text-primary dark:text-dark-text-primary'>
        Terms of Service
      </h1>
      <div className='space-y-2 text-light-text-secondary dark:text-dark-text-secondary'>
        <p>This is the Terms of Service page.</p>
        <p>
          You can replace this placeholder content with your full terms of
          service.
        </p>
        <h2 className='pt-4 text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using FrontGen, you agree to be bound by these terms.
          If you disagree with any part of the terms, you may not access the
          service.
        </p>
        <h2 className='pt-4 text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          2. Use License
        </h2>
        <p>
          Permission is granted to temporarily download one copy of the materials
          on FrontGen's website for personal, non-commercial transitory viewing
          only.
        </p>
      </div>
    </motion.div>
  );
};

export default TermsOfServicePage;