import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { CapacitorHttp } from '@capacitor/core';

function Menu({ menuState, setColorscheme, colorscheme }) {
  const api_url = process.env.REACT_APP_API_URL;
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

        <li className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer">
          <Link to="/">Accueil</Link>
        </li>

        <li className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer">
          <Link to="/places">Rechercher un lieu</Link>
        </li>

        <li className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer">
          <Link to="/profile">Mon profil</Link>
        </li>

        <li className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer">
          {!colorscheme
            ? <p onClick={() => toggleLightMode(true)} className="">Thème sombre</p>
            : <p onClick={() => toggleLightMode(false)} className="">Thème clair</p>}
        </li>

        <li
          onClick={() => {
            logout({ logoutParams: { returnTo: window.location.origin } });
          }}
          className="hover:border-r-4 pr-4 hover:pr-3 border-r-[white] dark:border-r-darkBackgroundColor mt-7 cursor-pointer"
        >
          <p>Se déconnecter</p>
        </li>

      </ul>
    </div>
  );
}

Menu.propTypes = {
  menuState: PropTypes.bool.isRequired,
  setColorscheme: PropTypes.func.isRequired,
  colorscheme: PropTypes.bool.isRequired,
};

export default Menu;
