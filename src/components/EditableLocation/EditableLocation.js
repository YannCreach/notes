import { CapacitorHttp } from '@capacitor/core';
import { MapPinIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

function EditableLocation({
  editing, value, classes, dummy, setDummy,
}) {
  const autoComplete = async (e) => {
    try {
      const options = {
        url: `https://api-adresse.data.gouv.fr/search/?q=${e}`,
      };

      const dataGouv = await CapacitorHttp.get(options);
      // const newLocation = store.getState().restaurant.editingDummy.location.replace(' ', '+');
      const coordinatesFromAPI = dataGouv.data.features[0].geometry.coordinates;
      setDummy({
        ...dummy,
        location: e,
        coodinates: coordinatesFromAPI,
      });
      console.log('Requete fetch coordinates OK', dataGouv.data);
    }
    catch (error) {
      console.log('Requete fetch coordinates NOK', error);
    }
  };

  return (
    <div className="">
      {!editing
        ? <p className={classes}>{ dummy[value] }</p>
        : (
          <div className="dark:text-darkTextColor text-lightTextColor relative">
            <span className="text-darkAccentColor text-2xl absolute left-3 z-10 top-4">
              <MapPinIcon className="h-6 w-6" />
            </span>
            <input
              className="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 pr-8 pl-12 w-full mb-4 focus:outline-none focus:dark:bg-[#737373]"
              onChange={(e) => autoComplete(e)}
              value={dummy.location}
              placeholder="Adresse du restaurant"
            />

          </div>
        )}
    </div>
  );
}

EditableLocation.propTypes = {
  editing: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  dummy: PropTypes.object.isRequired,
  setDummy: PropTypes.func.isRequired,
};

export default EditableLocation;
