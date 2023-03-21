import { useAuth0 } from '@auth0/auth0-react';
import { t } from 'i18next';
import { CapacitorHttp } from '@capacitor/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

function NewPlaceAddress({
  lat, lng, validId, setValidId, setNewPlace, setPanel,
}) {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const [toggleSuggestions, setToggleSuggestions] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [existingLocation, setExistingLocation] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const fetchLocationExisting = async () => {
    if (searchLocation !== '') {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/locationexisting`,
        headers: {
          Authorization: `Bearer ${token}`,
          location: searchLocation,
        },
      };
      const response = await CapacitorHttp.get(options);
      console.log(response);
      setExistingLocation(response.data.existingPlaces);
    }
  };

  const fetchLocationSuggestions = async (event) => {
    setSearchLocation(event);
    setValidId('');
    if (searchLocation !== '') {
      fetchLocationExisting();
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/locationgoogle`,
        headers: {
          Authorization: `Bearer ${token}`,
          location: searchLocation,
          lat: lat,
          lng: lng,
        },
      };
      const response = await CapacitorHttp.get(options);
      console.log(response);
      const filteredResponse = response.data.filter((item) => existingLocation.some((existingItem) => existingItem.googleid === item.place_id) === false);
      setLocationSuggestions(filteredResponse);
    }
    setToggleSuggestions(true);
  };

  const handleSuggestions = async (suggestion, dataSource) => {
    if (dataSource === 'existing') navigate(`/place/${suggestion.slug}-${suggestion.id}`);
    // ! route to place url with "new note" popup open

    setSearchLocation(suggestion.description);
    setValidId(suggestion.place_id);
    console.log(suggestion);
    setToggleSuggestions(false);
  };

  return (
    <div className="FIRSTPANEL p-6 w-full">
      <div className="w-full relative z-30">
        <label htmlFor="location-input" className="label-custom">{t('search_by')}
          <input
            id="location-input"
            type="text"
            onChange={(event) => fetchLocationSuggestions(event.target.value)}
            value={searchLocation}
            className="input-custom"
          />
        </label>
        {searchLocation && toggleSuggestions && (
        <ul className="rounded-lg bg-[white] dark:bg-darkBackgroundColor drop-shadow-md mt-2 overflow-hidden absolute">

          {existingLocation.length > 0
        && (
          <>
            <p className="text-xs text-darkTextsubColor ml-2 mt-2">{existingLocation.length > 1 ? t('existing_places') : t('existing_place')}</p>
            {existingLocation?.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestions(suggestion, 'existing')}
                className="hover:bg-lightGrey cursor-pointer text-sm text-darkAccentColor px-2 mb-2"
              >
                {`${suggestion.name}, ${suggestion.address}`}
                {/* {`${suggestion.name}, ${suggestion.address} (${suggestion.place_note.length} note${suggestion.place_note.length > 1 ? 's' : ''})`} */}
              </li>
            ))}
          </>
        )}
          {locationSuggestions
        && (
          <>
            <p className="text-xs text-darkTextsubColor ml-2 mt-4">{t('new_address')}</p>
            {locationSuggestions?.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSuggestions(suggestion, 'google')}
                className="hover:bg-lightGrey cursor-pointer text-sm text-darkTextAltColor dark:text-darkTextsubColor px-2 mb-2"
              >
                {suggestion.description}
              </li>
            ))}
          </>
        )}
        </ul>
        )}
      </div>
      <div className="relative" onClick={() => validId && setPanel(1)}>
        <Button type="accent" caption={t('button_next')} classes="mt-8" disabled={!validId} validId={validId} />
      </div>

      <div className="relative" onClick={() => setNewPlace(false)}>
        <Button type="normal" caption={t('button_previous')} classes="mt-4" />
      </div>

      <div className="flex justify-center text-sm mt-4">
        <p className="mr-2">{t('place_doesnt_exist')}</p>
        <p className="text-lightAccentColor cursor-pointer mb-4" onClick={() => {}}>{t('create_custom_place')}</p>
      </div>

    </div>
  );
}

NewPlaceAddress.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  validId: PropTypes.string.isRequired,
  setValidId: PropTypes.func.isRequired,
  setNewPlace: PropTypes.func.isRequired,
  setPanel: PropTypes.func.isRequired,
};

export default NewPlaceAddress;
