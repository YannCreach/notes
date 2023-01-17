import PropTypes from 'prop-types';
import { TrashIcon } from '@heroicons/react/24/outline';

function Tag({ caption, type }) {
  return (
    <div
      className="m-1 font-bold text-xs flex whitespace-nowrap items-center relative px-2 box-border text-center border-2 text-lightTextColor dark:text-darkTextColor rounded-full border-lightAccentColor bg-lightAccentColor"
    >
      <span>
        {caption.toUpperCase()}
      </span>
      <span>
        {(type === 'edit')
        && <TrashIcon className="h-4 w-4" />}
      </span>
    </div>
  );
}

Tag.propTypes = {
  caption: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Tag;
