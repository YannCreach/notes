import PropTypes from 'prop-types';
import { useState } from 'react';

function Field({
  value, type, name, placeholder, onChange, label,
}) {
  const [hidden, setHidden] = useState(true);
  const handleChange = (e) => {
    onChange(e.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <div className="dark:text-darkTextColor text-lightTextColor w-full">
      { label
        && (
        <label htmlFor={name} className="">
          {label}
        </label>
        )}
      <input
        className="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-xl py-2 px-4 mb-4 w-full"
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type === 'password' && hidden ? 'password' : 'text'}
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
  label: PropTypes.string,
};

Field.defaultProps = {
  value: '',
  type: 'text',
  placeholder: '',
  name: '',
  onChange: () => {},
  label: '',
};

export default Field;
