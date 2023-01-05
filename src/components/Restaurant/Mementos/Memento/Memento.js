import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';

function Memento({ memento }) {
  const params = useParams();
  const dispatch = useDispatch();

  return (
    <li className="rounded-lg shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card bg-lightBackgroundAltColor dark:bg-darkBackgroundAltColor text-customTextColor w-full p-4 text-lightTextColor dark:text-darkTextColor flex justify-between">
      <div className="flex flex-col justify-between">
        <p className="text-lg">{memento.name}</p>
        <p className="text-sm">{memento.content}</p>
        <p className="text-xs">Ajouté le {memento.created_at}</p>
      </div>
      <Link to={`/editmemento/${memento.id}`} className="flex py-4 items-center">
        <BiEdit className="text-2xl mr-2 text-lightAccentColor dark:text-darkAccentColor " />
      </Link>
    </li>
  );
}

Memento.propTypes = {
  memento: PropTypes.object.isRequired,
};

export default Memento;
