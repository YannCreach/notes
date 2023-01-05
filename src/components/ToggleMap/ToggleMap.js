import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiMap } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
import { actionToggleMap } from '../../actions/restaurantActions';

function ToggleMap() {
  const dispatch = useDispatch();
  const switchStatus = useSelector((state) => state.restaurant.toggleMap);

  return (
    <Link
      to="#"
      className="text-2xl ease-in duration-300 hover:text-lightAccentColor"
      onClick={() => {
        dispatch(actionToggleMap());
      }}
    >
      {
        switchStatus
          ? <BiMap />
          : <AiOutlinePicture />
      }
    </Link>
  );
}

export default ToggleMap;
