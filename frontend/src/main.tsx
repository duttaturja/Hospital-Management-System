import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ThemeProvider from './context/ThemeContext.tsx';
import { ModalProvider } from './components/ui/Modal.tsx';
import AppRouter from './routes/index.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  </StrictMode>
);