import PropTypes from 'prop-types';
import { CapacitorHttp } from '@capacitor/core';
import { useAuth0 } from '@auth0/auth0-react';
import Icons from '../Icons/Icons';

function EditableFavorite({
  favorite, currentNote, setFavorite, type,
}) {
  const { getAccessTokenSilently } = useAuth0();
  const { REACT_APP_API_URL } = process.env;

  const updateFavorite = async (e, value) => {
    e.stopPropagation();
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/${type}`,
        headers: {
          Authorization: `Bearer ${token}`,
          noteid: currentNote.id,
          favorite: value,
        },
      };

      await CapacitorHttp.patch(options);
      setFavorite(value);
      console.log('Requete UPDATE FAVORITE OK', value);
    }
    catch (error) {
      console.log('Requete UPDATE FAVORITE NOK', error);
    }
  };

  return (

    <div className="duration-300 ml-3 cursor-pointer">
      {favorite
        ? (
          <div className="px-2 py-1 bg-[white] drop-shadow-md rounded-full" onClick={(e) => updateFavorite(e, false)}>
            <Icons icon="Heart" classes="h-4 w-4 text-darkAccentColor" />
          </div>
        )
        : (
          <div className="px-2 py-1 bg-[white] drop-shadow-md rounded-full" onClick={(e) => updateFavorite(e, true)}>
            <Icons icon="HeartEmpty" classes="h-4 w-4 text-darkAccentColor" />
          </div>
        )}
    </div>

  );
}

EditableFavorite.propTypes = {
  favorite: PropTypes.bool.isRequired,
  currentNote: PropTypes.object.isRequired,
  setFavorite: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default EditableFavorite;
