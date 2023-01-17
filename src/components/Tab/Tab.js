import PropTypes from 'prop-types';

function Tab({ tab, setTab, values }) {
  return (
    <div className="tabs flex text-lightTextColor dark:text-darkTextColor px-6 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card ">
      { values.map((newTab) => (
        <div
          onClick={() => {
            setTab(newTab);
          }}
          key={newTab}
          className={`cursor-pointer border-lightAccentColor dark:border-darkAccentColor pb-2 mr-5 ${tab === newTab ? 'border-b-2' : 'border-0'}`}
        >
          {newTab}
        </div>
      ))}
    </div>
  );
}

Tab.propTypes = {
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
};

export default Tab;
