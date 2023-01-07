import PropTypes from 'prop-types';
import Memento from './Memento/Memento';

function Mementos({ mementos }) {
  const sortedMementos = mementos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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

Mementos.propTypes = {
  mementos: PropTypes.array.isRequired,
};

export default Mementos;
