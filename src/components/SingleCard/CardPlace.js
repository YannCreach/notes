import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import imgPlaceholder from '../../assets/images/placeholder2.jpg';
import Icons from '../Icons/Icons';

function CardPlace({ data }) {
  const { REACT_APP_API_URL } = process.env;

  const star = () => {
    let starCompletion;
    if (data.rating === 0 || data.rating === 1) starCompletion = 'StarEmpty';
    if (data.rating === 2 || data.rating === 3) starCompletion = 'StarHalf';
    if (data.rating === 4 || data.rating === 5) starCompletion = 'StarFull';

    return starCompletion;
  };

  return (
    <li className="aspect-square drop-shadow-md">

      <Link to={`place/${data.slug}-${data.id}`}>
        <div className="relative p-3 pb-[66%] rounded-t-lg  overflow-hidden">
          { data.cover
            ? <img className="absolute object-cover" src={`${REACT_APP_API_URL}${data.cover}`} alt="food placeholder" />
            : <img className="absolute object-cover blur-lg" src={imgPlaceholder} alt="food placeholder" />}
          <Icons icon={data.place_category.label} classes="absolute h-1/6 right-3 top-3 text-[white]" />
        </div>
        <div className="p-3 bg-lightBackgroundAltColor dark:bg-darkBackgroundAltColor  rounded-b-lg flex flex-col justify-between break-all">
          <h4 className="text-base sm:text-lg lg:text-2xl font-semibold truncate">
            {data.name}
          </h4>
          <h5 className="flex justify-between text-xs sm:text-sm lg:text-base text-darkTextsubColor dark:text-lightBackgroundColor">
            <p>{data.adress}</p>
            <p className="flex items-center">{data.rating}<Icons icon={star()} classes="h-3 ml-1 text-lightAccentColor" /></p>
          </h5>
        </div>
      </Link>
    </li>

  );
}

CardPlace.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardPlace;
