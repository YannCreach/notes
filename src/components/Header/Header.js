import PropTypes from 'prop-types';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Menu from '../Menu/Menu';
import Field from '../Field/Field';

function Header({ setColorscheme, colorscheme }) {
  const [menuState, setMenuState] = useState(false);

  return (
    <>
      <nav className="flex items-top justify-between p-6 absolute w-full">
        <div className="z-10 w-full">
          <Field
            type="text"
            name="name"
            icon="search"
            label=""
            placeholder="Rechercher un lieu"
            value=""
            onChange={() => { }}
          />
        </div>
        <div className="text-lightAccentColor z-30 ml-6 drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-xl py-1 px-1 mb-4">
          {!menuState
            ? <Bars3Icon className="w-8 h-8 cursor-pointer" onClick={() => setMenuState(true)} />
            : <XMarkIcon className="w-8 h-8 cursor-pointer" onClick={() => setMenuState(false)} />}
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
