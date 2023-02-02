import { useAuth0 } from '@auth0/auth0-react';
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useEffect } from 'react';
import LandingPage from './LandingPage';
import Home from './Home';
import Restaurant from './Restaurant';
import Header from '../components/Header/Header';
import Meal from './Meal';
import { callbackUri } from '../auth/auth.config.ts';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    CapApp.addListener('appUrlOpen', async ({ url }) => {
      if (url.startsWith(callbackUri)) {
        if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
          await handleRedirectCallback(url);
        }
        await Browser.close();
      }
    });
  }, [handleRedirectCallback]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className={`${isAuthenticated && user.user_metadata.colorscheme ? '' : 'dark'}`}>
      <div className="bg-[#fff] dark:bg-[#1E1E1E] ">
        <div className="APP bg-whiteVariantColor dark:bg-darkBackgroundColor flex flex-col h-[100vh] w-[100vw] overflow-hidden lg:w-[60rem] m-auto shadow-[0px_0px_15px_5px_rgba(0,0,0,0.3)]">
          { !isAuthenticated
            ? (<LandingPage />)
            : (
              <>
                <Header />
                {console.log({ user })}
                {user.user_metadata.currentPage === 'home' && <Home />}
                {user.user_metadata.currentPage.split('-')[0] === 'restaurant' && <Restaurant />}
                {user.user_metadata.currentPage.split('-')[0] === 'meal' && <Meal />}
                {/* <Route path="/profil" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/addmemento/:source" element={<FormMemento />} />
                  <Route path="/editmemento/:idmemento" element={<FormMemento />} />

                  <Route path="/restaurant/:restaurantSlug/meal/:mealSlug" element={<Meal type="meal" />} />
                  <Route path="/restaurant/:restaurantSlug/meal/:mealSlug/edit" element={<EditPage type="meal" addOrEdit="edit" />} />
                  <Route path="/restaurant/:restaurantSlug/edit" element={<EditPage type="restaurant" addOrEdit="edit" />} />
                  <Route path="/restaurant/add" element={<EditPage type="restaurant" addOrEdit="add" />} />
                  <Route path="/meal/add/:idrestaurant" element={<EditPage type="meal" addOrEdit="add" />} />
                  <Route path="/*" element={<NotFound />} /> */}
              </>
            )}

        </div>
      </div>
    </div>
  );
}

export default App;
