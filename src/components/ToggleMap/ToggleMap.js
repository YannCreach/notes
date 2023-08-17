import { PhotoIcon, MapIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

function ToggleMap({ toggleMap, setToggleMap }) {
  return (
    <div
      className="text-2xl ease-in duration-300 hover:text-lightAccentColor cursor-pointer"
      onClick={() => {
        setToggleMap(!toggleMap);
      }}
    >
      {
        toggleMap
          ? <MapIcon className="h-6 w-6" />
          : <PhotoIcon className="h-6 w-6" />
      }
    </div>
  );
}

ToggleMap.propTypes = {
  toggleMap: PropTypes.bool.isRequired,
  setToggleMap: PropTypes.func.isRequired,
};

export default ToggleMap;
