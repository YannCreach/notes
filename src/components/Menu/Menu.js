import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { CapacitorHttp } from '@capacitor/core';
import { useTranslation } from 'react-i18next';

function Menu({
  menuState, setMenuState, setColorscheme, colorscheme,
}) {
  const api_url = process.env.REACT_APP_API_URL;
  const { t } = useTranslation();
  const { getAccessTokenSilently, logout } = useAuth0();

  const toggleLightMode = async (value) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${api_url}/user`,
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        data: {
          colorscheme: value,
        },
      };

      await CapacitorHttp.patch(options);
      setColorscheme(value);
      console.log(`New darkMode : ${value}`);
    }
    catch (err) {
      console.log('Requete darkMode NOK', err);
    }
  };

  return (
    <div className={`MENU right-0 absolute bg-darkAccentColor text-right h-full ${menuState ? 'w-[100vw]' : 'w-[0vw]'}  duration-300 z-20 overflow-hidden`}>
      <ul className="text-darkTextColor dark:text-darkBackgroundColor text-xl mt-40 absolute right-0 pr-4 w-[100vw]">

        <li onClick={() => setMenuState(false)} className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer">
          <Link to="/">{t('menu_item_home')}</Link>
        </li>

        <li onClick={() => setMenuState(false)} className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer">
          <Link to="/places">{t('menu_item_search')}</Link>
        </li>

        <li onClick={() => setMenuState(false)} className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer">
          <Link to="/profile">{t('menu_item_profile')}</Link>
        </li>

        <li onClick={() => setMenuState(false)} className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer">
          {!colorscheme
            ? <p onClick={() => toggleLightMode(true)} className="">{t('menu_item_colorscheme_dark')}</p>
            : <p onClick={() => toggleLightMode(false)} className="">{t('menu_item_colorscheme_light')}</p>}
        </li>

        <li
          onClick={() => {
            setMenuState(false);
            logout({ logoutParams: { returnTo: window.location.origin } });
          }}
          className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer"
        >
          <p>{t('menu_item_disconnect')}</p>
        </li>

      </ul>
    </div>
  );
}

Menu.propTypes = {
  menuState: PropTypes.bool.isRequired,
  setMenuState: PropTypes.func.isRequired,
  setColorscheme: PropTypes.func.isRequired,
  colorscheme: PropTypes.bool.isRequired,
};

export default Menu;
