import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import imgPlaceholder from '../../../assets/images/placeholder2.jpg';
// import { UrlExists } from '../../../utils/utils';

function SingleCard({ data, type }) {
  const linkTo = (type !== 'meal') ? '../restaurant' : type;
  const { REACT_APP_API_URL } = process.env;

  return (
    <li className={`w-full p-5 ${type === 'restaurant' ? 'sm:w-1/2 md:w-1/3 lg:w-1/4' : 'w-1/2 sm:w-1/3'} pb-1/2 overflow-hidden`}>

      <Link to={`${linkTo}/${data.slug}-${data.id}`}>
        <div className="relative pb-[66%] rounded-t-lg shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card overflow-hidden">
          { data.photo_url
            ? <img className="absolute h-full w-full object-cover" src={`${REACT_APP_API_URL}${data.photo_url}`} alt="food placeholder" />
            : <img className="absolute h-full w-full object-cover blur-lg" src={imgPlaceholder} alt="food placeholder" />}
          {data.favorite
          && (
          <div className="bg-[white] rounded-full absolute p-1 top-2 right-2 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card">
            <BsStarFill className="text-2xl text-darkAccentColor" />
          </div>
          )}
        </div>
        <div className="relative items-center justify-between leading-tight p-2 bg-white bg-lightBackgroundAltColor dark:bg-darkBackgroundAltColor hover:dark:bg-darkAccentColor rounded-b-lg shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card ">
          <h4 className="text-lg">
            {data.name}
          </h4>
          <h5 className="text-sm">
            {data.city}
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
