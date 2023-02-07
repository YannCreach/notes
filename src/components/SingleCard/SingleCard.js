import PropTypes from 'prop-types';
import { StarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import imgPlaceholder from '../../assets/images/placeholder2.jpg';

function SingleCard({ data, type }) {
  const { REACT_APP_API_URL } = process.env;

  return (
    <li className={`w-full p-3 ${type === 'place' ? 'sm:w-1/2 md:w-1/3 lg:w-1/4' : 'w-1/2 sm:w-1/3'} pb-1/2 overflow-hidden`}>

      <Link to={`place/${data.place_category.label}-${data.id}`}>
        <div className="relative pb-[66%] rounded-t-lg shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card overflow-hidden">
          { data.cover
            ? <img className="absolute h-full w-full object-cover" src={`${REACT_APP_API_URL}${data.cover}`} alt="food placeholder" />
            : <img className="absolute h-full w-full object-cover blur-lg" src={imgPlaceholder} alt="food placeholder" />}
          {data.favorite && (
          <div className="bg-[white] rounded-full absolute p-1 top-2 right-2 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card">
            <StarIcon className="text-2xl text-darkAccentColor h-6 w-6" />
          </div>
          )}
        </div>
        <div className="relative items-center justify-between leading-tight p-2 bg-white bg-lightBackgroundAltColor dark:bg-darkBackgroundAltColor hover:dark:bg-darkAccentColor rounded-b-lg shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card ">
          <h4 className="text-lg">
            {data.name}
          </h4>
          <h5 className="text-sm">
            {data.adress}
          </h5>
        </div>
      </Link>
    </li>

  );
}

SingleCard.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default SingleCard;
