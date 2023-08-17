import { CapacitorHttp } from '@capacitor/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

function EditableLocation({ classes, location, setLocation }) {
  const [suggestions, setSuggestions] = useState([]);
  const [displaySuggestion, setDisplaySuggestion] = useState(false);

  const autoComplete = async (value) => {
    const newLocation = value.replace(' ', '+');
    setLocation(value);
    try {
      const options = {
        url: `https://api-adresse.data.gouv.fr/search/?q=${newLocation}&autocomplete=1`,
      };

      const dataGouv = await CapacitorHttp.get(options);
      setSuggestions(...suggestions, dataGouv.data.features);
      setDisplaySuggestion(true);
      console.log('Requete fetch autocomplete OK', dataGouv.data);
    }
    catch (error) {
      console.log('Requete fetch autocomplete NOK', error);
    }
  };

  return (
    <div className="">
      <input
        className={`input-custom ${classes} mb-0`}
        onChange={(e) => autoComplete(e.target.value)}
        value={location}
        placeholder="Adresse du place"
      />
      { displaySuggestion && (
      <ul className="dark:bg-darkBackgroundAltColor bg-lightBackgroundColor p-2 rounded">
        {suggestions.map((suggestion) => (
          <li
            className="hover:dark:bg-darkBackgroundColor hover:bg-[white] hover:cursor-pointer px-2 py-1 rounded mt-2"
            key={suggestion.properties.id}
            onClick={() => {
              setLocation(suggestion.properties.label);
              setDisplaySuggestion(false);
            }}
          >{suggestion.properties.label}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

EditableLocation.propTypes = {
  classes: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default EditableLocation;
