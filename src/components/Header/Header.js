import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu';
import Icons from '../Icons/Icons';

function Header({ setColorscheme, colorscheme }) {
  const [menuState, setMenuState] = useState(false);
  const [searchLabel, setSearchLabel] = useState('');
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearchLabel(e.target.value, name);
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className="relative w-[100vw]">
      <nav className="absolute flex justify-between w-full left-0 top-0 h-20 bg-darkDangerColor p-6">
        <div className="z-20 w-full flex relative h-20">
          {isHomePage
            ? (
              <>
                <Icons icon="Glass" classes="h-5 text-lightAccentColor absolute z-20 mt-4 ml-3" />
                <input
                  className="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-lg py-3 pl-11 pr-14 mb-4 w-full"
                  onChange={handleChange}
                  type="text"
                  placeholder={t('menu_item_search')}
                  value={searchLabel}
                />
              </>
            )
            : (

              <div onClick={() => navigate(-1)}>
                <Icons icon="ArrowLeft" classes="h-5 text-lightAccentColor absolute z-20 mt-4 ml-3" />
              </div>

            )}
        </div>
        <div className={`absolute flex items-center h-12 pt-2 ${!menuState ? 'text-lightAccentColor' : 'text-[white]'} z-30 right-6 px-4 cursor-pointer`}>
          {!menuState
            ? <div onClick={() => setMenuState(true)}><Icons icon="MenuOpen" classes="h-6" /></div>
            : <div onClick={() => setMenuState(false)}><Icons icon="MenuClose" classes="h-6" /></div>}
        </div>
        {/* <div className="flex items-center justify-center h-12 w-16 pt-1 text-lightAccentColor z-30 ml-6 drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-lg">
          {!menuState
            ? <div onClick={() => setMenuState(true)}><Icons icon="MenuOpen" classes="h-6" /></div>
            : <div onClick={() => setMenuState(false)}><Icons icon="MenuClose" classes="h-6" /></div>}
        </div> */}
      </nav>
      <Menu menuState={menuState} setMenuState={setMenuState} colorscheme={colorscheme} setColorscheme={setColorscheme} />
    </div>
  );
}

Header.propTypes = {
  setColorscheme: PropTypes.func.isRequired,
  colorscheme: PropTypes.bool.isRequired,
};

export default Header;
