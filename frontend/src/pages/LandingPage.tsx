import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { CheckCircle, Zap, Shield, Star } from 'lucide-react';

// Animation variants
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

const featureList = [
  {
    icon: <Zap className='h-8 w-8 text-light-accent dark:text-dark-accent' />,
    title: 'Blazing Fast',
    description: 'Built with Vite for a lightning-fast development experience and optimized builds.',
  },
  {
    icon: <Shield className='h-8 w-8 text-light-accent dark:text-dark-accent' />,
    title: 'Type-Safe',
    description: 'Written in TypeScript to catch errors early and improve code quality and maintainability.',
  },
  {
    icon: <CheckCircle className='h-8 w-8 text-light-accent dark:text-dark-accent' />,
    title: 'Production Ready',
    description: 'Includes routing, authentication, and a reusable component library out of the box.',
  },
];

const testimonialList = [
  {
    name: 'Alex Johnson',
    role: 'Full-Stack Developer',
    quote:
      'FrontGen saved me days of setup time on my last project. The component library is clean and the auth flow is solid. Highly recommend!',
  },
  {
    name: 'Sarah Chen',
    role: 'Freelancer',
    quote:
      "I use this for all my client projects now. It's so flexible and easy to connect to any backend, whether it's Node, Django, or FastAPI.",
  },
  {
    name: 'Mike P.',
    role: 'Startup CTO',
    quote:
      'The perfect boilerplate. It has just enough to get you started, without being overly opinionated. The dark mode and theme setup is a huge plus.',
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className='w-full'>
      {/* Hero Section */}
      <motion.section
        className='flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center text-center'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className='text-5xl font-extrabold tracking-tight text-light-text-primary dark:text-dark-text-primary md:text-6xl lg:text-7xl'
          variants={itemVariants}
        >
          Build Your Next Project with{' '}
          <span className='bg-gradient-to-r from-light-primary to-light-accent bg-clip-text text-transparent dark:from-dark-primary dark:to-dark-accent'>
            FrontGen
          </span>
        </motion.h1>
        <motion.p
          className='mx-auto mt-4 max-w-2xl text-lg text-light-text-secondary dark:text-dark-text-secondary'
          variants={itemVariants}
        >
          A reusable React boilerplate with everything you need to build modern, full-stack applications.
          Effortlessly connect to MERN, Django, or FastAPI backends.
        </motion.p>
        <motion.div className='mt-8 flex gap-4' variants={itemVariants}>
          <Button asChild size='lg'>
            <Link to='/dashboard'>Get Started</Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <a href='https://github.com' target='_blank' rel='noopener noreferrer'>
              View on GitHub
            </a>
          </Button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id='features'
        className='py-20'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className='container mx-auto text-center'>
          <motion.h2 className='text-4xl font-bold text-light-text-secondary dark:text-dark-text-secondary' variants={itemVariants}>
            Why Choose FrontGen?
          </motion.h2>
          <motion.p
            className='mx-auto mt-2 max-w-2xl text-light-text-secondary dark:text-dark-text-secondary'
            variants={itemVariants}
          >
            FrontGen provides a solid foundation with best practices, so you can focus on building features, not boilerplate.
          </motion.p>
          <div className='mt-12 grid gap-8 md:grid-cols-3'>
            {featureList.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className='h-full text-left'>
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className='mt-4'>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-light-text-secondary dark:text-dark-text-secondary'>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section (NEW) */}
      <motion.section
        id='testimonials'
        className='py-20'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className='container mx-auto text-center'>
          <motion.h2 className='text-4xl font-bold text-light-text-secondary dark:text-dark-text-secondary' variants={itemVariants}>
            Loved by Developers
          </motion.h2>
          <motion.p
            className='mx-auto mt-2 max-w-2xl text-light-text-secondary dark:text-dark-text-secondary'
            variants={itemVariants}
          >
            See what others are saying about FrontGen.
          </motion.p>
          <div className='mt-12 grid gap-8 md:grid-cols-3'>
            {testimonialList.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className='h-full text-left'>
                  <CardContent className='p-6'>
                    <div className='flex'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className='h-5 w-5 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                    <blockquote className='mt-4 text-light-text-secondary dark:text-dark-text-secondary'>
                      "{testimonial.quote}"
                    </blockquote>
                    <div className='mt-4'>
                      <p className='font-semibold text-light-text-primary dark:text-dark-text-primary'>
                        {testimonial.name}
                      </p>
                      <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className='py-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className='container mx-auto rounded-lg bg-light-surface p-12 text-center shadow-lg dark:bg-dark-surface'>
          <h2 className='text-3xl font-bold text-light-text-primary dark:text-dark-text-primary'>
            Ready to Start Building?
          </h2>
          <p className='mt-2 text-light-text-secondary dark:text-dark-text-secondary'>
            Clone the repository and launch your next big idea in minutes.
          </p>
          <Button asChild size='lg' className='mt-6'>
            <Link to='/dashboard'>Get Started Now</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;