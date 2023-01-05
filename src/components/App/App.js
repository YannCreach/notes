import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Home from '../Home/Home';
// import Restaurant from '../Restaurant/Restaurant';
// import Meal from '../Meal/Meal';
// import Search from '../Search/Search';
// import EditPage from '../EditPage/EditPage';
// import Profile from '../Header/Profile/Profile';
// import FormMemento from '../Restaurant/Mementos/FormMemento/FormMemento';
// import NotFound from '../NotFound/NotFound';

function App() {
  const [user, setUser] = useState({});

  return (
    <div className={`${user.colorScheme === 'light' ? '' : 'dark'}`}>
      <div className="bg-[#fff] dark:bg-[#1E1E1E] ">
        <div className="APP bg-lightBackgroundColor dark:bg-darkBackgroundColor flex flex-col h-[100vh] w-[100vw] overflow-hidden lg:w-[60rem] m-auto shadow-[0px_0px_15px_5px_rgba(0,0,0,0.3)]">

          <Routes>
            {!user.token
              ? (
                <Route path="*" element={<LandingPage user={user} setUser={setUser} />} />
              )

              : (
                <>
                  <Route path="/" element={<Home user={user} setUser={setUser} />} />
                  {/* <Route path="/profil" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/addmemento/:source" element={<FormMemento />} />
                  <Route path="/editmemento/:idmemento" element={<FormMemento />} />
                  <Route path="/restaurant/:restaurantSlug" element={<Restaurant />} />
                  <Route path="/restaurant/:restaurantSlug/meal/:mealSlug" element={<Meal type="meal" />} />
                  <Route path="/restaurant/:restaurantSlug/meal/:mealSlug/edit" element={<EditPage type="meal" addOrEdit="edit" />} />
                  <Route path="/restaurant/:restaurantSlug/edit" element={<EditPage type="restaurant" addOrEdit="edit" />} />
                  <Route path="/restaurant/add" element={<EditPage type="restaurant" addOrEdit="add" />} />
                  <Route path="/meal/add/:idrestaurant" element={<EditPage type="meal" addOrEdit="add" />} />
                  <Route path="/*" element={<NotFound />} /> */}
                </>
              )}

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
