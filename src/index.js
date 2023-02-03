import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './pages/App';

import './index.css';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;

const rootReactElement = (
  <Auth0Provider
    domain={domain}
    clientId={client_id}
    authorizationParams={{ redirect_uri: window.location.origin }}
    // cacheLocation="localstorage"
    // useRefreshTokens
  >
    <App />
  </Auth0Provider>
);

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);
