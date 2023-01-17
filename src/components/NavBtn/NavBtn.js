import PropTypes from 'prop-types';
import { useContext } from 'react';
import {
  PencilSquareIcon, ArrowLeftIcon, CheckIcon, XMarkIcon,
} from '@heroicons/react/24/outline';
import UserContext from '../../context/UserContext';

function NavBtn({
  caption, icon, order, target, editing, setEditing, onValidation,
}) {
  const { user, setUser } = useContext(UserContext);
  return (
    <div
      onClick={() => {
        if (target) {
          setUser({ ...user, currentPage: target });
        }
        else {
          onValidation();
          setEditing(!editing);
        }
      }}
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

    </div>
  );
}

NavBtn.propTypes = {
  caption: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  editing: PropTypes.bool,
  setEditing: PropTypes.func,
  onValidation: PropTypes.func,
};

NavBtn.defaultProps = {
  editing: false,
  setEditing: () => {},
  onValidation: () => {},
};

export default NavBtn;
