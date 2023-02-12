import PropTypes from 'prop-types';

function Title({
  caption, classes, seeAll, expend, setExpend,
}) {
  return (
    <div className={`flex relative items-end px-6 ${classes}`}>
      <p className="text-xl font-semibold text-lightTextColor dark:text-darkTextColor grow">
        {caption}
      </p>
      {seeAll && (
      <p onClick={() => setExpend(!expend)} className="cursor-pointer text-lightAccentColor">
        {expend ? 'Afficher plus' : 'Afficher moins'}
      </p>
      )}
    </div>
  );
}

Title.propTypes = {
  caption: PropTypes.string.isRequired,
  classes: PropTypes.string,
  seeAll: PropTypes.string,
  expend: PropTypes.bool,
  setExpend: PropTypes.func,
};

Title.defaultProps = {
  classes: '',
  seeAll: '',
  expend: false,
  setExpend: () => {},
};

export default Title;
