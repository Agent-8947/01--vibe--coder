
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { dnaData } from './dnaData';

(window as any).__DNA_STATE__ = dnaData;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
