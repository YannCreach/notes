import PropTypes from 'prop-types';

function Tag({ caption }) {
  return (
    <div className="px-2 py-1 text-xs flex items-center relative mr-2 text-center text-lightTextColor dark:text-darkTextColor drop-shadow-lg rounded-full bg-[white] dark:bg-darkBackgroundAltColor">
      <span>
        {caption}
      </span>
    </div>
  );
}

Tag.propTypes = {
  caption: PropTypes.string.isRequired,
};

export default Tag;
