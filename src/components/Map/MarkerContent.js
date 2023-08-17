import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icons from '../Icons/Icons';

function MarkerContent({ pin }) {
  return (
    <Link to={`../../place/${pin.slug}-${pin.id}`} className="flex flex-col items-center cursor-pointer">
      <Icons icon={pin.place_category.label} classes="p-2 rounded-full text-lightAccentColor drop-shadow-lg bg-[white] h-4" />
      <span className="marker-label hidden bold">{pin.name}</span>
    </Link>
  );
}

MarkerContent.propTypes = {
  pin: PropTypes.object.isRequired,
};

export default MarkerContent;
