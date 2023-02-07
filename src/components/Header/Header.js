import PropTypes from 'prop-types';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Menu from '../Menu/Menu';
import Field from '../Field/Field';

function Header({ setColorscheme, colorscheme }) {
  const [menuState, setMenuState] = useState(false);

  return (
    <>
      <nav className="flex items-top justify-between p-6">
        <Field
          type="text"
          name="name"
          icon="search"
          label=""
          placeholder="Rechercher un lieu"
          value=""
          onChange={() => { }}
        />
        <div className={`${!menuState ? 'text-lightAccentColor' : 'text-darkTextColor dark:text-darkBackgroundColor'} z-30 ml-6`}>
          {!menuState
            ? <Bars3Icon className="w-10 h-10 cursor-pointer" onClick={() => setMenuState(true)} />
            : <XMarkIcon className="w-10 h-10 cursor-pointer" onClick={() => setMenuState(false)} />}
        </div>
      </nav>
      <Menu menuState={menuState} colorscheme={colorscheme} setColorscheme={setColorscheme} />
    </>
  );
}

Header.propTypes = {
  setColorscheme: PropTypes.func.isRequired,
  colorscheme: PropTypes.bool.isRequired,
};

export default Header;
