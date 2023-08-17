import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithNavigate from './auth/auth0-provider-with-navigate';
import App from './pages/App';
import './index.css';
import './i18n';

const rootReactElement = (
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);
