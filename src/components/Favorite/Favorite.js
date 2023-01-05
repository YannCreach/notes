import PropTypes from 'prop-types';
import { BsHeart, BsHeartFill, BsStarFill } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';

function Favorite({ data }) {
  return (
    <div
      className="text-2xl ease-in duration-300 hover:text-lightAccentColor"
    >
      {
        data
          ? (
            // <div className="bg-[white] border-[white] p-1 top-2 right-2 shadow-card cursor-pointer">
            //   <BsHeartFill className="text-2xl text-darkAccentColor" />
            // </div>
            <div className="bg-[white] rounded-full p-1 top-2 right-2 border-2 border-[white] shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card cursor-pointer">
              <BsStarFill className="text-2xl text-darkAccentColor" />
            </div>
          )
          : (
            // <div className="rounded-full p-1 top-2 right-2 shadow-card border-2 border-darkAccentColor cursor-pointer">
            //   <BsHeart className="text-2xl text-darkAccentColor" />
            // </div>
            <div className="rounded-full p-1 top-2 right-2 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card border-2 border-darkAccentColor cursor-pointer">
              <AiOutlineStar className="text-2xl text-darkAccentColor" />
            </div>
          )
      }
    </div>
  );
}

Favorite.propTypes = {
  data: PropTypes.bool.isRequired,
};

export default Favorite;
