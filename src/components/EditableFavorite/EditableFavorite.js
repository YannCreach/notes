import PropTypes from 'prop-types';
import { StarIcon as StarFull } from '@heroicons/react/24/solid';
import { StarIcon as StarEmpty } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import UserContext from '../../context/UserContext';

function EditableFavorite({
  favorite, setRestaurant, restaurant, editing,
}) {
  const { user, setUser } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;

  const updateFavorite = async (value) => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/restaurant`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `bearer ${user.token}`,
          id: Number(user.currentPage.split('-')[1]),
        },
        data: {
          favorite: value,
        },
      };

      await CapacitorHttp.patch(options);
      setRestaurant({ ...restaurant, favorite: value });
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
      // bg-[white] rounded-full p-1 top-2 right-2 border-2 border-[white] shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card
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
  restaurant: PropTypes.object.isRequired,
  setRestaurant: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default EditableFavorite;
