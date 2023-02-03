import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  // const login = async () => {
  //   await loginWithRedirect({
  //     async openUrl(url) {
  //       await Browser.open({
  //         url,
  //         windowName: '_self',
  //       });
  //     },
  //   });
  // };

  const login = () => loginWithRedirect({
    redirectUri: window.location.origin,
  });

  return <button type="button" onClick={login}>Log In</button>;
}

export default LoginButton;