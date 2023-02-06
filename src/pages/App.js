import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Home from './Home';
import Place from './Place';
import Header from '../components/Header/Header';
import Note from './Note';
import Profile from '../auth/profile';
import Loading from '../components/Loading/Loading';
// import callbackUri from '../auth/auth.config.ts';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const { handleRedirectCallback } = useAuth0();

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
    return <div>Loading ...</div>;
  }
  console.log(user);

  return (
    <div className={`${isAuthenticated && user.colorscheme ? '' : 'dark'}`}>
      <div className="bg-[#fff] dark:bg-[#1E1E1E] ">
        <div className="APP bg-whiteVariantColor dark:bg-darkBackgroundColor flex flex-col h-[100vh] w-[100vw] overflow-hidden lg:w-[60rem] m-auto shadow-[0px_0px_15px_5px_rgba(0,0,0,0.3)]">
          { !isAuthenticated
            ? (<LandingPage />)
            : (
              <>
                <Header />
                <Routes>
                  <Route path="/" element={(<Home />)} />
                  {/* <Route
                    path="/"
                    element={withAuthenticationRequired(Home)}
                  /> */}
                  <Route path="/profil" element={<Profile />} />
                  <Route path="/place" element={<Place />} />
                  <Route path="/note" element={(<Note />)} />
                </Routes>
                {console.log({ user })}
                {/* {user.currentPage === 'home' && <Home />}
                {user.currentPage.split('-')[0] === 'place' && <Place />}
                {user.currentPage.split('-')[0] === 'note' && <Note />} */}
                {/* <Route path="/profil" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/addmemento/:source" element={<FormMemento />} />
                  <Route path="/editmemento/:idmemento" element={<FormMemento />} />

                  <Route path="/place/:placeSlug/note/:noteSlug" element={<Note type="note" />} />
                  <Route path="/place/:placeSlug/note/:noteSlug/edit" element={<EditPage type="note" addOrEdit="edit" />} />
                  <Route path="/place/:placeSlug/edit" element={<EditPage type="place" addOrEdit="edit" />} />
                  <Route path="/place/add" element={<EditPage type="place" addOrEdit="add" />} />
                  <Route path="/note/add/:idplace" element={<EditPage type="note" addOrEdit="add" />} />
                  <Route path="/*" element={<NotFound />} /> */}
              </>
            )}

        </div>
      </div>
    </div>
  );
}

export default App;
