import PropTypes from 'prop-types';

function Field({
  value, type, name, placeholder, onChange, classname,
}) {
  const handleChange = (e) => {
    onChange(e.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <div className={`${value.length > 0 ? 'field field--has-content' : 'field'} dark:text-darkTextColor text-lightTextColor`}>
      <input
        className={classname}
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}

Field.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  classname: PropTypes.string,
};

Field.defaultProps = {
  value: '',
  type: 'text',
  classname: '',
  placeholder: '',
  name: '',
  onChange: () => {},

};

export default Field;
