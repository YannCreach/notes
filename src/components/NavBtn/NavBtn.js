import PropTypes from 'prop-types';
import {
  PencilSquareIcon, ArrowLeftIcon, CheckIcon, XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function NavBtn({
  caption, icon, order, target,
}) {
  // onClick={() => {
  //   if (target) {
  //     setUser({ ...user, currentPage: target });
  //   }
  //   else {
  //     onValidation();
  //     setEditing(!editing);
  //   }
  // }}
  return (
    <Link
      to={target}
      className="flex items-center py-8 cursor-pointer"
    >

      {(order === 'captionFirst') && <span className="mx-2">{caption}</span>}

      <span className="text-2xl text-darkAccentColor">
        {(icon === 'edit') && <PencilSquareIcon className="h-6 w-6" />}
        {(icon === 'previous') && <ArrowLeftIcon className="h-6 w-6" />}
        {(icon === 'check') && <CheckIcon className="h-6 w-6" />}
        {(icon === 'cancel') && <XMarkIcon className="h-6 w-6" />}
      </span>

      {(order === 'iconFirst') && <span className="mx-2">{caption}</span>}

    </Link>
  );
}

NavBtn.propTypes = {
  caption: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
};

export default NavBtn;
