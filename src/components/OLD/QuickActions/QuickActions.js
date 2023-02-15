import PropTypes from 'prop-types';

function QuickActions({ places }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4 text-lightTextColor dark:text-darkTextColor z-0 pb-4">
      {(places.length > 0) && (
        <div onClick={() => {}} className="cursor-pointer">
          <button className="w-full drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 px-4 flex content-between mr-8 justify-between text-left" type="button">
            <div className="pr-8">
              <p className="pb-4 text-xl font-semibold">Chercher un lieu</p>
              <p className="text-sm">Par place, nom ou tags</p>
            </div>
            <div className="flex items-center" />
          </button>
        </div>
      )}
      <div onClick={() => {}} className="cursor-pointer">
        <button className="w-full drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 px-4 flex content-between mr-8 justify-between text-left" type="button">
          <div className="pr-8">
            <p className="pb-4 text-xl font-semibold">Ajouter un lieu</p>
            <p className="text-sm">Nom, adresse, image...</p>
          </div>
          <div className="flex items-center" />
        </button>
      </div>

      <div onClick={() => {}} className="cursor-pointer">
        <button className="w-full drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 px-4 flex content-between justify-between text-left" type="button">
          <div className="pr-8">
            <p className="pb-4 text-xl font-semibold">Ecrire un mémento</p>
            <p className="text-sm">Pour mon prochain passage</p>
          </div>
          <div className="flex items-center" />
        </button>
      </div>

    </div>
  );
}

QuickActions.propTypes = {
  places: PropTypes.array.isRequired,
};

export default QuickActions;
