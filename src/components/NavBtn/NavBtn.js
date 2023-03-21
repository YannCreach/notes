import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icons from '../Icons/Icons';

function NavBtn({
  caption, icon, order, target,
}) {
  return (
    <Link to={target} className="flex items-center py-8 cursor-pointer">

      {(order === 'captionFirst') && <span className="mx-2">{caption}</span>}

      <span className="text-2xl text-darkAccentColor">
        <Icons icon={icon} classes="h-6" />
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
