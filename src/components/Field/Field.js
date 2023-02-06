import PropTypes from 'prop-types';
import {
  ChatBubbleLeftIcon, MapPinIcon, BuildingStorefrontIcon, AtSymbolIcon, MagnifyingGlassIcon, UserIcon, EyeSlashIcon, EyeIcon, InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

function Field({
  value, type, name, placeholder, onChange, icon,
}) {
  const [hidden, setHidden] = useState(true);
  const handleChange = (e) => {
    onChange(e.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <div className="dark:text-darkTextColor text-lightTextColor relative">
      { icon !== '' && (
      <span className="text-darkAccentColor text-2xl absolute left-3 z-10 top-4">
        {(icon === 'comment') && <ChatBubbleLeftIcon className="h-6 w-6" />}
        {(icon === 'location') && <MapPinIcon className="h-6 w-6" />}
        {(icon === 'place') && <BuildingStorefrontIcon className="h-6 w-6" />}
        {(icon === 'search') && <MagnifyingGlassIcon className="h-6 w-6" />}
        {(icon === 'email') && <AtSymbolIcon className="h-6 w-6" />}
        {(icon === 'user') && <UserIcon className="h-6 w-6" />}
        {(icon === 'information') && <InformationCircleIcon className="h-6 w-6" />}
        {(icon === 'password') && (
          hidden
            ? <EyeSlashIcon className="h-6 w-6" onClick={() => setHidden(false)} />
            : <EyeIcon className="h-6 w-6" onClick={() => setHidden(true)} />
        )}
      </span>
      )}
      <input className="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 pr-8 pl-12 w-full mb-4 focus:outline-none focus:dark:bg-[#737373]" value={value} onChange={handleChange} id={inputId} type={type === 'password' && hidden ? 'password' : 'text'} placeholder={placeholder} name={name} />
    </div>
  );
}

Field.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.string,
};

Field.defaultProps = {
  value: '',
  type: 'text',
  placeholder: '',
  name: '',
  onChange: () => {},
  icon: '',
};

export default Field;
