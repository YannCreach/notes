import PropTypes from 'prop-types';
import imgPlaceholder from '../../assets/images/placeholder2.jpg';
import Icons from '../Icons/Icons';

function CardMeal({ data }) {
  const { REACT_APP_API_URL } = process.env;

  return (
    <div onClick={() => {}} className="cursor-pointer drop-shadow-lg">
      <div className="relative p-3 pb-[66%] rounded-t-md overflow-hidden">
        { data.cover
          ? <img className="absolute object-cover" src={`${REACT_APP_API_URL}${data.cover}`} alt="food placeholder" />
          : <img className="absolute object-cover blur-lg" src={imgPlaceholder} alt="food placeholder" />}
        {data.favorite
          && (
          <div className="flex items-center justify-center h-8 w-8 text-lightAccentColor z-10 ml-6 bg-[white] dark:bg-darkBackgroundAltColor rounded-full absolute right-3 top-3 drop-shadow-md">
            <Icons icon="Heart" classes="text-lightAccentColor h-4" />
          </div>
          )}
      </div>
      <div className="p-3 bg-lightBackgroundAltColor dark:bg-darkBackgroundAltColor rounded-b-lg flex flex-col justify-between break-all">
        <h4 className="text-base sm:text-lg lg:text-2xl font-semibold truncate">
          {data.name}
        </h4>
        <h5 className="flex justify-between text-xs sm:text-sm lg:text-base text-darkTextsubColor dark:text-lightBackgroundColor">
          <p>{data.price}</p>
        </h5>
      </div>
    </div>
  );
}

CardMeal.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardMeal;
