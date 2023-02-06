import { createRoot } from 'react-dom/client';
import App from './pages/App';

import './index.css';

const rootReactElement = (
  <App />
);

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);
