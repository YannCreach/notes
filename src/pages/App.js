import { useEffect, useMemo, useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import UserContext from '../context/UserContext';
import LandingPage from './LandingPage';
import Home from './Home';
import Restaurant from './Restaurant';
import Header from '../components/Header/Header';
// import Meal from './Meal';
// import Search from './Search';
// import EditPage from './EditPage';
// import Profile from './Profile';
// import FormMemento from './FormMemento';
// import NotFound from './NotFound';

function App() {
  const [user, setUser] = useState({ currentPage: 'home' });
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState('home');

  const prefToState = async () => {
    try {
      const { token } = await Preferences.get({ key: 'token' });
      const { userid } = await Preferences.get({ key: 'userid' });
      const { username } = await Preferences.get({ key: 'username' });
      const { email } = await Preferences.get({ key: 'email' });
      const { colorscheme } = await Preferences.get({ key: 'colorscheme' });
      const { photoURL } = await Preferences.get({ key: 'photoURL' });

      // setUser({
      //   ...user, token, userid, username, email, colorscheme, photoURL,
      // });
      setUser({ ...user, token: token });
      setUser({ ...user, userid: userid });
      setUser({ ...user, username: username });
      setUser({ ...user, email: email });
      setUser({ ...user, colorscheme: colorscheme });
      setUser({ ...user, photoURL: photoURL });

      setLoading(false);
      console.log('prefToState OK', user.token);
    }
    catch (error) {
      console.log('prefToState NOK', error);
    }
  };

  useEffect(() => {
    prefToState();
  }, []);

  return (
    (!loading && (
      <UserContext.Provider value={value}>
        <div className={`${user.colorScheme === 'light' ? '' : 'dark'}`}>
          <div className="bg-[#fff] dark:bg-[#1E1E1E] ">
            <div className="APP bg-lightBackgroundColor dark:bg-darkBackgroundColor flex flex-col h-[100vh] w-[100vw] overflow-hidden lg:w-[60rem] m-auto shadow-[0px_0px_15px_5px_rgba(0,0,0,0.3)]">

              {!loading && !user.token
                ? (<LandingPage />)
                : (
                  <>
                    <Header />
                    {user.currentPage === 'home' && <Home />}
                    {user.currentPage.split('-')[0] === 'restaurant' && <Restaurant />}
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
      </UserContext.Provider>
    ))
  );
}

export default App;
