import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.origin);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
      // authorizationParams={{
      //   redirect_uri: window.location.origin,
      // }}
    >
      {children}
    </Auth0Provider>
  );
}

Auth0ProviderWithNavigate.propTypes = {
  children: PropTypes.node,
};

Auth0ProviderWithNavigate.defaultProps = {
  children: '',
};

export default Auth0ProviderWithNavigate;
