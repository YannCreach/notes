import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Title({
  caption, classes, seeAll, expend, setExpend,
}) {
  const { t } = useTranslation();
  return (
    <div className={`flex relative justify-between items-baseline px-6 ${classes}`}>
      <p className="text-xl font-semibold text-lightTextColor dark:text-darkTextColor">
        {caption}
      </p>
      {seeAll && (
      <p onClick={() => setExpend(!expend)} className="text-xs cursor-pointer text-lightAccentColor">
        {expend ? t('show_more') : t('show_less')}
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
