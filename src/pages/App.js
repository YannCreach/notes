import { useAuth0 } from '@auth0/auth0-react';
// import { App as CapApp } from '@capacitor/app';
// import { Browser } from '@capacitor/browser';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Home from './Home';
import Place from './Place';
import Header from '../components/Header/Header';
import Note from './Note';
import Loading from '../components/Loading/Loading';
import Category from './Category';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // useEffect(() => {
  //   CapApp.addListener('appUrlOpen', async ({ url }) => {
  //     if (url.startsWith(callbackUri)) {
  //       if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
  //         await handleRedirectCallback(url);
  //       }
  //       await Browser.close();
  //     }
  //   });
  // }, [handleRedirectCallback]);

  if (isLoading) {
    return <Loading />;
  }
  const [colorscheme, setColorscheme] = useState(user?.colorscheme);
  console.log(user);

  return (
    <div className={`${colorscheme ? '' : 'dark'}`}>
      <div className="h-[100vh] bg-whiteVariantColor dark:bg-darkBackgroundColor ">
        <div className="APP flex flex-col lg:w-[60rem] h-full m-auto relative">
          { !isAuthenticated
            ? (<LandingPage />)
            : (
              <>
                <Header colorscheme={colorscheme} setColorscheme={setColorscheme} />
                <Routes>
                  <Route path="/" element={(<Home />)} />
                  <Route path="/place/:slug" element={(<Place />)} />
                  <Route path="/note/:slug" element={(<Note />)} />
                  <Route path="/category/:category" element={(<Category />)} />
                </Routes>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
