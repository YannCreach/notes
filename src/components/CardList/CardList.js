import PropTypes from 'prop-types';
import CardCategory from '../SingleCard/CardCategory';
import CardMeal from '../SingleCard/CardMeal';
import CardPlace from '../SingleCard/CardPlace';

function CardList({
  type, data, limit, expend,
}) {
  let filteredData = data;
  if (expend) filteredData = data?.slice(0, limit);

  return (
    <div className="text-lightTextColor w-full dark:text-darkTextColor px-6">
      <ul className={`grid gap-3 grid-cols-${limit}`}>
        {
          filteredData?.map((singleData) => (
            <>
              {(type === 'Categories') && (<CardCategory data={singleData} key={singleData.id} type={type} />)}
              {(type === 'Meals') && (<CardMeal data={singleData} key={singleData.id} type={type} />)}
              {(type === 'Place') && (<CardPlace data={singleData} key={singleData.id} type={type} />)}
            </>
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
