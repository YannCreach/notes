import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoutButton from '../../../auth/logout';

function Menu({ menuState }) {
  return (
    <div className={`MENU right-0 absolute bg-darkAccentColor text-right h-full ${menuState ? 'w-[100vw]' : 'w-[0vw]'}  duration-700 z-20 overflow-hidden`}>
      <ul className="text-darkTextColor text-xl mt-40 absolute right-0 pr-4 w-[100vw]">

        <li className="hover:border-r-4 pr-4 border-r-[white] hover:font-bold cursor-pointer">
          <Link to="/">Accueil</Link>
        </li>

        <li className="hover:border-r-4 pr-4 border-r-[white] mt-7 hover:font-bold cursor-pointer">
          <Link to="/places">Rechercher un lieu</Link>
        </li>

        <li className="hover:border-r-4 pr-4 border-r-[white] mt-7 hover:font-bold cursor-pointer">
          <Link to="/profile">Mon profil</Link>
        </li>

        <li
          onClick={() => {
            console.log('a');
          }}
          className="hover:border-r-4 pr-4 border-r-[white] mt-7 hover:font-bold cursor-pointer"
        >
          <LogoutButton />
        </li>

      </ul>
    </div>
  );
}

Menu.propTypes = {
  menuState: PropTypes.bool.isRequired,
};

export default Menu;
