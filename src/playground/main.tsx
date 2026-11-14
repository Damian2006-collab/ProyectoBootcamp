import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Playground from './Playground';
import './css/playground.css';

const root = document.getElementById('root');
if (!root) throw new Error('No se encontró el elemento #root en playground.html');

createRoot(root).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
