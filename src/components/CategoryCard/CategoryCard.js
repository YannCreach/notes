import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icons from '../Icons/Icons';

function CategoryCard({ data }) {
  return (
    <li className="aspect-square">
      <Link to={`category/${data.label}`}>
        <div className="flex flex-col justify-between items-start h-full rounded-lg drop-shadow-lg bg-lightBackgroundAltColor text-darkBackgroundColor dark:bg-darkBackgroundAltColor dark:text-darkTextColor p-3">
          <Icons icon={data.label} classes="h-1/4" />
          <div className="flex flex-col justify-between break-all w-full">
            <h4 className="text-base sm:text-lg lg:text-2xl font-semibold truncate">{data.label}</h4>
            <h5 className="text-xs sm:text-sm lg:text-base text-darkTextsubColor dark:text-lightBackgroundColor">{`${data.category_place.length} note${data.category_place.length > 1 ? 's' : ''}`}</h5>
          </div>
        </div>
      </Link>
    </li>
  );
}

CategoryCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CategoryCard;
