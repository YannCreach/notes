import PropTypes from 'prop-types';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

function QuickActions({ data, edit }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="w-40">
      <div>az</div>
      <label htmlFor="name">Name
        <input id="name" name="name" type="text" className="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-sm shadow-md py-2 px-2 w-full mb-4 focus:outline-none focus:dark:bg-[#737373]" value="" placeholder="" />
      </label>
    </div>
  );
}

QuickActions.propTypes = {
  data: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default QuickActions;
