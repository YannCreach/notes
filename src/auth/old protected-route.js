import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../components/Loading/Loading';

function ProtectedRoute({ component, ...args }) {
  return (
    <Route
      element={withAuthenticationRequired(component, {
        onRedirecting: () => <Loading />,
      })}
      {...args}
    />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default ProtectedRoute;
