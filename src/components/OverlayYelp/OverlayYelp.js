import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Icons from '../Icons/Icons';
import { genererTableauHoraires } from '../../utils/utils';

function OverlayYelp({ data }) {
  const [hours, setHours] = useState('');
  useEffect(() => {
    setHours(genererTableauHoraires(data.hours[0].open));
  }, []);
  return (
    <div className="w-full h-full absolute left-0 flex justify-center items-center bg-[black]/75 z-40">
      <div className="bg-whiteVariantColor dark:bg-darkBackgroundColor rounded-lg p-6">
        <div className="text-lightTextColor dark:text-darkTextColor font-bold text-xl mb-3">
          {data.name}
        </div>
        {data.phone && (<Link to={`tel:${data.phone}`} className="text-sm text-darkTextsubColor">{data.display_phone}</Link>)}
        {hours}
      </div>
    </div>
  );
}

OverlayYelp.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OverlayYelp;
