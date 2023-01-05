import PropTypes from 'prop-types';

function Button({ caption, type, classes }) {
  return (
    <div
      className={`${classes} mb-4 w-full relative px-2 py-1 box-border text-center border-2 text-lightTextColor dark:text-darkTextColor rounded-md hover:shadow-button ease-in duration-300  ${type === 'normal' ? 'border-lightAccentColor hover:shadow-lightAccentColor' : 'border-lightDangerColor hover:shadow-lightDangerColor'}`}
    >
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
