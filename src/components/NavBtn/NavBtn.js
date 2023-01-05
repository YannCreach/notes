import PropTypes from 'prop-types';
import { BsPencilSquare, BsCheck } from 'react-icons/bs';
import { MdArrowBackIosNew } from 'react-icons/md';

import { Link } from 'react-router-dom';

function EditBtn({
  caption, type, order, target,
}) {
  return (
    <Link to={target} className="flex items-center py-8">
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
    </Link>
  );
}

EditBtn.propTypes = {
  caption: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
};

export default EditBtn;
