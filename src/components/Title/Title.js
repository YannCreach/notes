import PropTypes from 'prop-types';

function Title({ caption, classes }) {
  return (
    <p className={`${classes} text-2xl text-lightTextColor dark:text-darkTextColor py-4`}>{caption}</p>
  );
}

Title.propTypes = {
  caption: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

Title.defaultProps = {
  classes: '',
};

export default Title;
