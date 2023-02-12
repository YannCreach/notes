import PropTypes from 'prop-types';
import CategoryCard from '../CategoryCard/CategoryCard';
import SingleCard from '../SingleCard/SingleCard';

function CardList({
  type, data, limit, expend,
}) {
  let filteredData = data;
  if (expend) filteredData = data?.slice(0, limit);

  return (
    <div className="text-lightTextColor w-full dark:text-darkTextColor px-6">
      <ul className={`grid gap-3 ${type === 'latest' ? 'grid-cols-2 ' : 'grid-cols-3 '}`}>
        {
          filteredData?.map((singleData) => (
            (type === 'Categories')
              ? <CategoryCard data={singleData} key={singleData.id} type={type} />
              : <SingleCard data={singleData} key={singleData.id} type={type} />
          ))
        }
      </ul>
    </div>
  );
}

CardList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array,
  limit: PropTypes.number.isRequired,
  expend: PropTypes.bool.isRequired,
};

CardList.defaultProps = {
  data: [],
};

export default CardList;
