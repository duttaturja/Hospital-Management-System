import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../utils/cn';

// Mock data
const contacts = [
  { id: 1, name: 'AI Assistant', lastMessage: 'How can I help you today?', online: true },
  { id: 2, name: 'Support Team', lastMessage: 'We received your ticket.', online: false },
  { id: 3, name: 'Jane Doe', lastMessage: 'See you at 2 PM!', online: true },
  { id: 4, name: 'Project Alpha', lastMessage: 'Milestone 3 is due...', online: false },
];

const messages = [
  { id: 1, sender: 'other', text: 'Hello! How can I help you today?' },
  { id: 2, sender: 'me', text: 'Hi! I have a question about my account.' },
  { id: 3, sender: 'other', text: 'Sure, I can help with that. What is your question?' },
];

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(contacts[0].id);
  const [message, setMessage] = useState('');

  const selectedChat = contacts.find(c => c.id === selectedChatId);

  return (
    <motion.div
      className='flex h-[calc(100vh-10rem)] w-full' // Adjust height to fit within layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className='flex w-full overflow-hidden'>
        {/* Sidebar (Contact List) */}
        <div
          className={cn(
            'flex h-full w-full flex-col border-r border-light-border dark:border-dark-border md:w-1/3 lg:w-1/4',
            selectedChatId ? 'hidden md:flex' : 'flex'
          )}
        >
          <div className='border-b border-light-border p-4 dark:border-dark-border'>
            <h2 className='text-xl font-semibold'>Chats</h2>
            <div className='relative mt-4'>
              <Input placeholder='Search...' className='pr-10' />
              <Search className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-muted dark:text-dark-muted' />
            </div>
          </div>
          <div className='flex-1 overflow-y-auto'>
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={cn(
                  'flex cursor-pointer items-center gap-4 border-b border-light-border p-4 transition-colors hover:bg-light-background dark:border-dark-border dark:hover:bg-dark-surface',
                  selectedChatId === contact.id && 'bg-light-background dark:bg-dark-surface'
                )}
                onClick={() => setSelectedChatId(contact.id)}
              >
                <div className='relative'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-light-secondary/20 text-light-secondary dark:bg-dark-secondary/20 dark:text-dark-secondary'>
                    {contact.name[0]}
                  </div>
                  {contact.online && (
                    <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-light-surface bg-light-accent dark:border-dark-surface dark:bg-dark-accent' />
                  )}
                </div>
                <div className='w-full overflow-hidden'>
                  <h3 className='font-semibold'>{contact.name}</h3>
                  <p className='truncate text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Pane */}
        <div
          className={cn(
            'flex h-full w-full flex-col',
            selectedChatId ? 'flex' : 'hidden md:flex'
          )}
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className='flex items-center gap-4 border-b border-light-border p-4 dark:border-dark-border'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='md:hidden'
                  onClick={() => setSelectedChatId(null)}
                >
                  <ArrowLeft className='h-5 w-5' />
                </Button>
                <div className='relative'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-light-secondary/20 text-light-secondary dark:bg-dark-secondary/20 dark:text-dark-secondary'>
                    {selectedChat.name[0]}
                  </div>
                  {selectedChat.online && (
                    <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-light-surface bg-light-accent dark:border-dark-surface dark:bg-dark-accent' />
                  )}
                </div>
                <div>
                  <h3 className='font-semibold'>{selectedChat.name}</h3>
                  <p className='text-xs text-light-text-secondary dark:text-dark-text-secondary'>
                    {selectedChat.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className='flex-1 space-y-4 overflow-y-auto p-4'>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex max-w-[75%]',
                      msg.sender === 'me' ? 'ml-auto justify-end' : 'mr-auto justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-lg px-4 py-2',
                        msg.sender === 'me'
                          ? 'bg-light-primary text-white dark:bg-dark-primary'
                          : 'bg-light-surface shadow-sm dark:bg-dark-surface'
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className='border-t border-light-border p-4 dark:border-dark-border'>
                <form
                  className='flex items-center gap-2'
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button type='submit' size='sm' className='h-10 w-10 p-0'>
                    <Send className='h-5 w-5' />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className='flex h-full items-center justify-center text-light-text-secondary dark:text-dark-text-secondary'>
              Select a chat to start messaging
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ChatPage;
