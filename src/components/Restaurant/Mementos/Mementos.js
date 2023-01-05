import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findRestaurant } from '../../../selectors/restaurants';
import Memento from './Memento/Memento';

function Mementos() {
  // const params = useParams();
  const restaurant = useSelector((state) => state.restaurant.currentRestaurant);
  const sortedMementos = restaurant.memento.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-lightTextColor dark:text-darkTextColor ">
      {
        sortedMementos.map((memento) => (
          <Memento memento={memento} key={memento.id} />
        ))
      }
    </ul>

  );
}

export default Mementos;
