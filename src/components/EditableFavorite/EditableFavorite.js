import PropTypes from 'prop-types';
import { StarIcon as StarFull } from '@heroicons/react/24/solid';
import { StarIcon as StarEmpty } from '@heroicons/react/24/outline';
import { CapacitorHttp } from '@capacitor/core';
import { useAuth0 } from '@auth0/auth0-react';

function EditableFavorite({
  favorite, setPlace, place, editing,
}) {
  const { getAccessTokenSilently } = useAuth0();
  const { REACT_APP_API_URL } = process.env;

  const updateFavorite = async (value) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/place`,
        headers: {
          Authorization: `bearer ${token}`,
          placeid: place.id,
          favorite: value,
        },
      };

      await CapacitorHttp.patch(options);
      setPlace({ ...place, favorite: value });
      console.log('Requete UPDATE FAVORITE OK', value);
    }
    catch (error) {
      console.log('Requete UPDATE FAVORITE NOK', error);
    }
  };

  return (

    <div className={`ease-in duration-300 hover:text-lightAccentColor inline-flex flex-wrap ${editing ? 'hidden' : ''}`}>
      {favorite
        ? (
          <div className="p-1 mr-2 mb-1" onClick={() => updateFavorite(false)}>
            <StarFull className="h-6 w-6 text-darkAccentColor" />
          </div>
        )
        : (
          <div className="p-1 mr-2 mb-1" onClick={() => updateFavorite(true)}>
            <StarEmpty className="h-6 w-6 text-darkAccentColor" />
          </div>
        )}
    </div>

  );
}

EditableFavorite.propTypes = {
  favorite: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  setPlace: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default EditableFavorite;
