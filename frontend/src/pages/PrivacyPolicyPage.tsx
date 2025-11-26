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

const PrivacyPolicyPage: React.FC = () => {
  return (
    <motion.div
      className='space-y-4'
      initial='hidden'
      animate='visible'
      variants={itemVariants}
    >
      <h1 className='text-4xl font-bold text-light-text-primary dark:text-dark-text-primary'>
        Privacy Policy
      </h1>
      <div className='space-y-2 text-light-text-secondary dark:text-dark-text-secondary'>
        <p>This is the Privacy Policy page.</p>
        <p>
          You can replace this placeholder content with your full privacy policy.
        </p>
        <h2 className='pt-4 text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          1. Information We Collect
        </h2>
        <p>
          We may collect personal identification information (Name, email
          address, etc.) when you register on the site, fill out a form, or
          use our services.
        </p>
        <h2 className='pt-4 text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary'>
          2. How We Use Information
        </h2>
        <p>
          We may use the information we collect to personalize your experience,
          improve our website, and send periodic emails (if you opt-in).
        </p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;