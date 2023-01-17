// import { RiSearchLine } from 'react-icons/ri';
// import { BsPencilSquare } from 'react-icons/bs';
// import { MdRestaurant } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

function QuickActions({ restaurants }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4 text-lightTextColor dark:text-darkTextColor z-0 pb-4">
      {(restaurants.length > 0) && (
        <div onClick={() => setUser({ ...user, currentPage: 'search' })} className="cursor-pointer">
          <button className="w-full drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 px-4 flex content-between mr-8 justify-between text-left" type="button">
            <div className="pr-8">
              <p className="pb-4 text-xl font-semibold">Chercher un restaurant</p>
              <p className="text-sm">Par restaurant, nom ou tags</p>
            </div>
            <div className="flex items-center">
              {/* <RiSearchLine className=" text-darkAccentColor text-3xl" /> */}
            </div>
          </button>
        </div>
      )}
      <div onClick={() => setUser({ ...user, currentPage: 'addRestaurant' })} className="cursor-pointer">
        <button className="w-full drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 px-4 flex content-between mr-8 justify-between text-left" type="button">
          <div className="pr-8">
            <p className="pb-4 text-xl font-semibold">Ajouter un restaurant</p>
            <p className="text-sm">Nom, adresse, image...</p>
          </div>
          <div className="flex items-center">
            {/* <MdRestaurant className=" text-darkAccentColor text-3xl" /> */}
          </div>
        </button>
      </div>

      <div onClick={() => setUser({ ...user, currentPage: 'addMemento' })} className="cursor-pointer">
        <button className="w-full drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 px-4 flex content-between justify-between text-left" type="button">
          <div className="pr-8">
            <p className="pb-4 text-xl font-semibold">Ecrire un mémento</p>
            <p className="text-sm">Pour mon prochain passage</p>
          </div>
          <div className="flex items-center">
            {/* <BsPencilSquare className=" text-darkAccentColor text-3xl" /> */}
          </div>
        </button>
      </div>

    </div>
  );
}

QuickActions.propTypes = {
  restaurants: PropTypes.array.isRequired,
};

export default QuickActions;
