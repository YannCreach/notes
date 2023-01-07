import { BiMap } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
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
          ? <BiMap />
          : <AiOutlinePicture />
      }
    </div>
  );
}

ToggleMap.propTypes = {
  toggleMap: PropTypes.bool.isRequired,
  setToggleMap: PropTypes.func.isRequired,
};

export default ToggleMap;
