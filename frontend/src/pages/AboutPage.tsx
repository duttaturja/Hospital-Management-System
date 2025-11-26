import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/Accordion';
import { Users, Goal, Shield } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

const faqList = [
  {
    question: 'What is FrontGen?',
    answer:
      'FrontGen is a reusable React boilerplate designed to accelerate full-stack development. It provides a complete frontend setup with UI components, authentication, routing, and more.',
  },
  {
    question: 'What backends can I use with FrontGen?',
    answer:
      'FrontGen is backend-agnostic! It can be easily integrated with any API, including MERN (Node.js/Express), Django, or FastAPI.',
  },
  {
    question: 'Is it free to use?',
    answer:
      'Yes, FrontGen is completely free and open-source, distributed under the MIT license. You can use it for personal projects, hackathons, or commercial products.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <motion.div
      className='space-y-12'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* Hero Section */}
      <motion.section
        className='flex flex-col items-center text-center'
        variants={itemVariants}
      >
        <h1 className='text-5xl font-extrabold tracking-tight text-light-text-primary dark:text-dark-text-primary md:text-6xl'>
          About FrontGen
        </h1>
        <p className='mx-auto mt-4 max-w-2xl text-lg text-light-text-secondary dark:text-dark-text-secondary'>
          We build robust, reusable, and developer-friendly tools to help you
          launch your ideas faster.
        </p>
      </motion.section>

      {/* Mission Section */}
      <motion.section className='grid gap-8 md:grid-cols-2' variants={itemVariants}>
        <Card>
          <CardHeader className='flex-row items-center gap-4'>
            <Goal className='h-8 w-8 text-light-primary dark:text-dark-primary' />
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-light-text-secondary dark:text-dark-text-secondary'>
              Our mission is to eliminate the repetitive setup work involved in
              starting a new full-stack project. We provide a production-ready
              foundation so you can focus on what truly matters: building
              your unique features.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex-row items-center gap-4'>
            <Shield className='h-8 w-8 text-light-primary dark:text-dark-primary' />
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-light-text-secondary dark:text-dark-text-secondary'>
              We envision a world where developers can go from idea to
              deployment in record time. FrontGen aims to be the de-facto
              starting point for any modern React-based application, known for
              its quality, flexibility, and ease of use.
            </p>
          </CardContent>
        </Card>
      </motion.section>

      {/* Team Section */}
      <motion.section className='text-center' variants={itemVariants}>
        <h2 className='text-4xl font-bold text-light-text-secondary dark:text-dark-text-secondary'>Meet the Team</h2>
        <p className='mx-auto mt-2 max-w-2xl text-light-text-secondary dark:text-dark-text-secondary'>
          (This is a placeholder for your team section)
        </p>
        <div className='mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3'>
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className='p-6 text-center'>
                <div className='mx-auto h-24 w-24 rounded-full bg-light-border dark:bg-dark-border'></div>
                <h3 className='mt-4 font-semibold'>Team Member {i}</h3>
                <p className='text-sm text-light-primary dark:text-dark-primary'>
                  Role
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className='mx-auto max-w-3xl' variants={itemVariants}>
        <h2 className='mb-4 text-center text-4xl font-bold text-light-text-secondary dark:text-dark-text-secondary'>
          Frequently Asked Questions
        </h2>
        <Accordion type='single' collapsible className='w-full text-light-text-secondary dark:text-dark-text-secondary'>
          {faqList.map((faq, i) => (
            <AccordionItem value={`item-${i + 1}`} key={i}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;