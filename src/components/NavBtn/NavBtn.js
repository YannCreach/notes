import PropTypes from 'prop-types';
import { useContext } from 'react';
import { BsPencilSquare, BsCheck } from 'react-icons/bs';
import { MdArrowBackIosNew } from 'react-icons/md';
import UserContext from '../../context/UserContext';

function EditBtn({
  caption, type, order, target,
}) {
  const { user, setUser } = useContext(UserContext);
  return (
    <div onClick={() => setUser({ ...user, currentPage: target })} className="flex items-center py-8 cursor-pointer">
      {(order === 'captionFirst')
      && <span className="mx-2">{caption}</span>}

      <span className="text-2xl text-darkAccentColor">
        {(type === 'edit')
      && <BsPencilSquare />}
        {(type === 'previous')
      && <MdArrowBackIosNew />}
        {(type === 'check')
      && <BsCheck className="text-3xl" />}
      </span>

      {(order === 'iconFirst')
      && <span className="mx-2">{caption}</span>}
    </div>
  );
}

EditBtn.propTypes = {
  caption: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
};

export default EditBtn;
