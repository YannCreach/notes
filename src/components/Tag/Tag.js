import PropTypes from 'prop-types';
import { BsFillTrashFill } from 'react-icons/bs';

function Tag({ caption, type }) {
  return (
    <div
      className="m-1 w-min flex whitespace-nowrap items-center relative p-1 box-border text-center border-2 text-lightTextColor dark:text-darkTextColor rounded-md border-lightAccentColor bg-lightAccentColor"
    >
      <span>
        {caption}
      </span>
      <span>
        {(type === 'edit')
        && <BsFillTrashFill className="ml-4" />}
      </span>
    </div>
  );
}

Tag.propTypes = {
  caption: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Tag;
