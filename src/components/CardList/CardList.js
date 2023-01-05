import PropTypes from 'prop-types';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { actionGetAllRestaurants, actionGetOneRestaurant } from '../../actions/restaurantActions';
import SingleCard from './SingleCard/SingleCard';

function CardList({ type, data, loading }) {
  // const params = useParams();
  // const dispatch = useDispatch();
  // const fetchingAllRestaurants = useSelector((state) => state.restaurant.fetchingAllRestaurants);

  // let restaurantSplit = '';
  // let restaurantId = '';
  // useEffect(() => {
  //   if (type === 'meal') dispatch(actionGetOneRestaurant(restaurantId));
  //   dispatch(actionGetAllRestaurants());
  // }, []);

  // switch (type) {
  //   case 'restaurant':
  //     data = useSelector((state) => state.restaurant.restaurants.filter((item) => item.favorite === true));
  //     break;
  //   case 'meal':
  //     restaurantSplit = params.restaurantSlug.split('-');
  //     restaurantId = restaurantSplit[restaurantSplit.length - 1];
  //     // dispatch(actionGetOneRestaurant(restaurantId));
  //     data = useSelector((state) => state.restaurant.currentRestaurant.meal);
  //     break;
  //   case 'restaurantSearch':
  //     data = useSelector((state) => state.restaurant.filteredRestaurants);
  //     break;
  //   default:
  // }

  return (
    (!loading
    && (
    <div className="text-lightTextColor dark:text-darkTextColor ">
      <ul className="flex flex-wrap">
        {
        data.map((singleData) => (
          <SingleCard data={singleData} key={singleData.id} type={type} />
        ))
      }
      </ul>
    </div>
    )
    )
  );
}

CardList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CardList;
