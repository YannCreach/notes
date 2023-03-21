import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import UserContext from '../../context/UserContext';
import EditableLocation from '../EditableLocation/EditableLocation';

function OverlayCreateEdit({
  data, type, editing, setEditing,
}) {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(type ? data.name : '');
  const [location, setLocation] = useState(type ? data.location : '');
  const [coordinates, setCoordinates] = useState(type ? data.coordinates : '');
  const [comment, setComment] = useState(type ? data.comment : '');
  const { REACT_APP_API_URL } = process.env;

  const submitModifications = async (event) => {
    event.preventDefault();

    const newLocation = location.replace(' ', '+');

    try {
      const options = {
        url: `https://api-adresse.data.gouv.fr/search/?q=${newLocation}`,
      };

      const dataGouv = await CapacitorHttp.get(options);
      const coordinatesFromAPI = dataGouv.data.features[0].geometry.coordinates;
      setCoordinates(coordinatesFromAPI);
      console.log('Requete fetch coordinates OK', dataGouv.data);
    }
    catch (error) {
      console.log('Requete fetch coordinates NOK', error);
    }

    try {
      const options = {
        url: `${REACT_APP_API_URL}/${type}`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
          id: Number(user.currentPage.split('-')[1]),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          name: name,
          location: location,
          coordinates: coordinates,
          comment: comment,
        },
      };

      const result = await CapacitorHttp.patch(options);
      console.log(`Requete UPDATE ${type} OK`, result);
      setEditing(false);
      setUser({ ...user, currentPage: `${type}-${data.id}` });
    }
    catch (error) {
      console.log(`Requete UPDATE ${type} NOK`, error);
    }
  };

  const cancelModifications = () => setEditing(false);

  return (
    <div className="w-full h-full absolute left-0 flex justify-center items-center bg-[black]/75 z-40">
      <div className="bg-whiteVariantColor dark:bg-darkBackgroundColor rounded-lg p-6">
        <div className="text-lightTextColor dark:text-darkTextColor font-bold text-xl mb-3">
          Modifier une note
        </div>
        <form autoComplete="off" className="flex flex-col items-center">

          <div className="mb-8 flex flex-col">
            <label htmlFor="name" className="label-custom">
              Nom
              <input id="name" name="name" type="text" className="input-custom" value={editing ? name : ''} placeholder="Entrer un nom" onChange={(event) => setName(event.target.value)} />
            </label>
            <label htmlFor="location" className="label-custom">
              Adresse
              <EditableLocation classes="" location={location} setLocation={setLocation} coordinates={coordinates} setCoordinates={setCoordinates} />
              {/* <input id="location" name="location" type="text" className="input-custom" value={editing ? location : ''} placeholder="Entrer une adresse" onChange={(event) => setLocation(event.target.value)} /> */}
            </label>
            <label htmlFor="comment" className="label-custom">
              Commentaire
              <input id="comment" name="comment" type="text" className="input-custom" value={editing ? comment : ''} placeholder="Entrer un commentaire" onChange={(event) => setComment(event.target.value)} />
            </label>
          </div>

          <button type="submit" className="button-custom bg-lightAccentColor text-[white]" onClick={(event) => submitModifications(event)}>
            Valider
          </button>
          <button type="submit" className="button-custom bg-[white] text-black" onClick={() => cancelModifications()}>
            Annuler
          </button>

        </form>
      </div>
    </div>
  );
}

OverlayCreateEdit.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
};

export default OverlayCreateEdit;
