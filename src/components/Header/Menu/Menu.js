import PropTypes from 'prop-types';
import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import LogoutButton from '../../../auth/logout';
import Profile from '../../../auth/profile';

function Menu({ menuState }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className={`MENU right-0 absolute bg-darkAccentColor text-right h-full ${menuState ? 'w-[100vw]' : 'w-[0vw]'}  duration-700 z-20 overflow-hidden`}>
      <ul className="text-darkTextColor text-xl mt-40 absolute right-0 pr-4 w-[100vw]">

        <li className="hover:border-r-4 pr-4 border-r-[white] hover:font-bold cursor-pointer">
          <div onClick={() => setUser({ ...user, currentPage: 'home' })} className="cursor-pointer">
            Accueil
          </div>
        </li>

        <li className="hover:border-r-4 pr-4 border-r-[white] mt-7 hover:font-bold cursor-pointer">
          <div onClick={() => setUser({ ...user, currentPage: 'search' })} className="cursor-pointer">
            Rechercher un restaurant
          </div>
        </li>

        <li className="hover:border-r-4 pr-4 border-r-[white] mt-7 hover:font-bold cursor-pointer">
          <div onClick={() => setUser({ ...user, currentPage: 'profil' })} className="cursor-pointer">
            Mon profil <Profile />
          </div>
        </li>

        <li
          onClick={() => {
            console.log('a');
          }}
          className="hover:border-r-4 pr-4 border-r-[white] mt-7 hover:font-bold cursor-pointer"
        >
          Se déconnecter <LogoutButton />
        </li>

      </ul>
    </div>
  );
}

Menu.propTypes = {
  menuState: PropTypes.bool.isRequired,
};

export default Menu;
