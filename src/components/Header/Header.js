import {
  SunIcon, MoonIcon, Bars3Icon, XMarkIcon,
} from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import placeholder from '../../assets/images/blur.jpg';
import Menu from './Menu/Menu';
import UserContext from '../../context/UserContext';
import Field from '../Field/Field';

function Header() {
  const { REACT_APP_API_URL } = process.env;
  const { user, setUser } = useContext(UserContext);
  const [menuState, setMenuState] = useState(false);

  const toggleLightMode = async () => {
    try {
      const newColorScheme = user.colorScheme === 'light' ? 'dark' : 'light';
      const options = {
        url: `${REACT_APP_API_URL}/user`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
        },
        data: {
          colorscheme: newColorScheme,
        },
      };

      await CapacitorHttp.patch(options);
      setUser({ ...user, colorScheme: newColorScheme });
      console.log('Requete darkMode OK', newColorScheme);
    }
    catch (err) {
      console.log(err);
      console.log('Requete darkMode NOK', err);
    }
  };

  return (
    <>
      <nav className="HEADER flex items-center justify-between p-6">
        <img onClick={() => setUser({ ...user, currentPage: 'profil' })} className="cursor-pointer rounded-full object-cover h-8 w-8 mr-4" alt="logo" src={(user.photo_url && user.photo_url !== 'null') ? `${REACT_APP_API_URL}${user.photo_url}` : placeholder} />
        <Field
          type="text"
          name="name"
          icon="search"
          placeholder="Rechercher un restaurant"
          classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor pr-8 pb-1 pl-12 mx-4"
          value=""
          onChange={() => {
          }}
        />
        <div className={`flex items-center ${!menuState ? 'text-lightAccentColor ' : 'text-darkTextColor '} duration-700`}>
          <div className="pr-6">
            {user.colorScheme === 'light'
              ? <SunIcon onClick={() => toggleLightMode()} className="w-8 h-8 hover:text-lightTextColor duration-200 cursor-pointer" />
              : <MoonIcon onClick={() => toggleLightMode()} className="w-8 h-8 hover:text-darkTextColor duration-200 cursor-pointer" />}
          </div>
          <div className="z-30">
            {!menuState
              ? <Bars3Icon className="w-8 h-8 hover:text-darkTextColor duration-200 cursor-pointer" onClick={() => setMenuState(true)} />
              : <XMarkIcon className="w-8 h-8 hover:text-darkTextColor duration-200 cursor-pointer" onClick={() => setMenuState(false)} />}
          </div>
        </div>
      </nav>
      <Menu menuState={menuState} />
    </>
  );
}

export default Header;
