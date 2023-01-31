import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './pages/App';

import './index.css';

const rootReactElement = (
  <Auth0Provider
    domain="dev-n0lb4ireiqf83cv2.eu.auth0.com"
    clientId="jqI3I37mU5YoeX6ebSgQCoJlOpqtQxd6"
    authorizationParams={{ redirect_uri: window.location.origin }}
    cacheLocation="localstorage"
    // authorizationParams={{ redirect_uri: 'https://yanncrea.ch' }}
  >
    <App />
  </Auth0Provider>
);

const root = createRoot(document.getElementById('root'));
root.render(rootReactElement);

// import { Auth0Provider } from '@auth0/auth0-react';
// import ReactDOM from 'react-dom';
// import App from './pages/App';

// import './index.css';

// ReactDOM.render(
//   <Auth0Provider
//     domain="dev-n0lb4ireiqf83cv2.eu.auth0.com"
//     clientId="jqI3I37mU5YoeX6ebSgQCoJlOpqtQxd6"
//     authorizationParams={{ redirect_uri: window.location.origin }}
//     // authorizationParams={{ redirect_uri: 'https://yanncrea.ch' }}
//   >
//     <App />
//   </Auth0Provider>,
//   document.getElementById('root'),
// );
