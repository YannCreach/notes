import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithNavigate from './auth/auth0-provider-with-navigate';
import App from './pages/App';
import './index.css';

const rootReactElement = (
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);
