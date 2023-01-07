import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './pages/App';

import './index.css';

const rootReactElement = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);
