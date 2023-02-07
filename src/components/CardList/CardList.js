import PropTypes from 'prop-types';
import SingleCard from '../SingleCard/SingleCard';

function CardList({ type, data }) {
  return (
    <div className="text-lightTextColor dark:text-darkTextColor">
      <ul className="flex flex-wrap">
        {
        data.map((singleData) => (
          <SingleCard data={singleData} key={singleData.id} type={type} />
        ))
      }
      </ul>
    </div>
  );
}

CardList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default CardList;
