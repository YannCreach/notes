import PropTypes from 'prop-types';

function Button({ caption, type, classes }) {
  return (
    <div className={`cursor-pointer p-3 text-center rounded-md drop-shadow-lg ${type === 'accent' ? 'bg-lightAccentColor text-darkTextColor' : 'bg-lightBackgroundAltColor dark:bg-darkBackgroundAltColor text-lightTextColor dark:text-darkTextColor'} ${classes}`}>
      {caption}
    </div>
  );
}

Button.defaultProps = {
  classes: '',
};

Button.propTypes = {
  caption: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

export default Button;
