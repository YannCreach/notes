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
      <ul className={`grid gap-2 ${limit === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {filteredData.length > 0
          ? filteredData.map((singleData) => (
            <div key={singleData.id}>
              {(type === 'Categories') && (<CardCategory data={singleData} type={type} />)}
              {(type === 'Meals') && (<CardMeal data={singleData} type={type} />)}
              {(type === 'Place') && (<CardPlace data={singleData} type={type} />)}
            </div>
          ))
          : 'C\'est vide ici!'}
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
