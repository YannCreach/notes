import { useAuth0 } from '@auth0/auth0-react';
// import { App as CapApp } from '@capacitor/app';
// import { Browser } from '@capacitor/browser';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Home from './Home';
import Place from './Place';
import Header from '../components/Header/Header';
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

  // ! mettre l'ancienne geoloc en cache

  if (isLoading) {
    return <Loading />;
  }

  const [colorscheme, setColorscheme] = useState(user?.colorscheme);
  const [lng, setLng] = useState(2.3120158);
  const [lat, setLat] = useState(48.8588495);

  console.log(user);

  const getGeoloc = async () => {
    await navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  };

  useEffect(() => {
    getGeoloc();
  }, []);

  useEffect(() => {
    console.log(lat, lng);
  }, [lat]);

  return (
    <div className={`${colorscheme ? '' : 'dark'}`}>
      <div className="bg-whiteVariantColor dark:bg-darkBackgroundColor ">
        <div className="APP flex flex-col lg:w-[60rem] h-[100vh]">
          { !isAuthenticated
            ? (<LandingPage />)
            : (
              <>
                <Header colorscheme={colorscheme} setColorscheme={setColorscheme} />
                <Routes>
                  <Route path="/" element={(<Home lat={lat} lng={lng} />)} />
                  <Route path="/place/:slug" element={(<Place />)} />
                  <Route path="/category/:categorylabel" element={(<Category lat={lat} lng={lng} />)} />
                </Routes>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
