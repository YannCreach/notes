// import { useAuth0 } from '@auth0/auth0-react';

// function LoginButton() {
//   const { loginWithRedirect } = useAuth0();

//   return <button type="button" onClick={() => loginWithRedirect()}>Log In</button>;
// }

// export default LoginButton;

import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const login = async () => {
    await loginWithRedirect({
      async openUrl(url) {
        // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: '_self',
        });
      },
    });
  };

  // return <IonButton onClick={login}>Log in</IonButton>;
  return <button type="button" onClick={login}>Log In</button>;
}

export default LoginButton;
