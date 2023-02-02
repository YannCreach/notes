import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { callbackUri } from './auth.config.ts';

function LogoutButton() {
  const { logout } = useAuth0();

  const doLogout = async () => {
    console.log('callbackUri', callbackUri);
    await logout({
      async openUrl(url) {
        await Browser.open({
          url,
          windowName: '_self',
        });
      },
      logoutParams: {
        returnTo: callbackUri,
      },
    });
  };

  return <button type="button" onClick={doLogout}>Log Out</button>;
}

export default LogoutButton;
