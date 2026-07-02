import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { DataProvider } from './context/DataContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </DataProvider>
  </StrictMode>,
);
