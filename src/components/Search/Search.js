import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CardList from '../CardList/CardList';
import FormSearch from './FormSearch/FormSearch';
import NavBtn from '../NavBtn/NavBtn';
import { actionInitSearch } from '../../actions/restaurantActions';

function Search() {
  const fetchingAllRestaurants = useSelector((state) => state.restaurant.fetchingAllRestaurants);
  const messageSearchRestaurant = useSelector((state) => state.restaurant.messageSearchRestaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetchingAllRestaurants) {
      dispatch(actionInitSearch());
    }
  }, []);

  return (
    <div className="text-lightTextColor dark:text-darkTextColor w-full px-6 pb-4 flex flex-col overflow-hidden">
      <NavBtn caption="Précédent" type="previous" order="iconFirst" target="/" />
      <p className="text-2xl text-lightTextColor dark:text-darkTextColor pb-4">Chercher un restaurant</p>
      <FormSearch />
      <p className="text-2xl text-lightTextColor dark:text-darkTextColor pb-4">{messageSearchRestaurant}</p>
      <div className="h-full overflow-y-scroll">
        <CardList type="restaurantSearch" />
      </div>
    </div>
  );
}

export default Search;
