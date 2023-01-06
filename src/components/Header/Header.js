import { FaBars } from 'react-icons/fa';
import { MdLightMode, MdModeNight } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import flou from '../../assets/images/blur.jpg';
import Menu from './Menu/Menu';

function Header({ user, setUser }) {
  const { REACT_APP_API_URL } = process.env;
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
      <nav className="HEADER flex items-center justify-between p-8 z-30">
        <div className="flex items-center">
          <Link to="/profil">
            <img className=" rounded-full object-cover h-12 w-12 mr-4" alt="logo" src={(user.photo_url && user.photo_url !== 'null') ? `${REACT_APP_API_URL}${user.photo_url}` : flou} />
          </Link>
          <Link to="/profil">
            <div className="text-lightTextColor dark:text-darkTextColor">
              <p className="font-semibold text-xl tracking-tight">{user.username}</p>
              <p>Bienvenue !</p>
            </div>
          </Link>
        </div>
        <div className={`flex items-center ${!menuState ? 'text-lightAccentColor ' : 'text-darkTextColor '} duration-700`}>
          <div className="pr-6">
            {user.colorScheme === 'light'
              ? <MdLightMode onClick={() => toggleLightMode()} className="mx-2 w-8 h-8 hover:w-10 hover:h-10 hover:mx-1" />
              : <MdModeNight onClick={() => toggleLightMode()} className="mx-2 w-8 h-8 hover:w-10 hover:h-10 hover:mx-1" />}
          </div>
          <div>
            {!menuState
              ? <FaBars className="mx-2 w-8 h-8 hover:w-10 hover:h-10 hover:mx-1" onClick={() => setMenuState(true)} />
              : <RiCloseFill className="mx-2 w-8 h-8 hover:w-10 hover:h-10 hover:mx-1" onClick={() => setMenuState(false)} />}
          </div>
        </div>
      </nav>
      <Menu menuState={menuState} />
    </>
  );
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Header;
