import PropTypes from 'prop-types';
import { useState } from 'react';
import NewPlaceCreate from '../NewPlacePanels/NewPlaceCreate';
import NewPlaceAddress from '../NewPlacePanels/NewPlaceAddress';

function OverlayNewPlace({ setNewPlace, lat, lng }) {
  const [panel, setPanel] = useState(0);
  const [validId, setValidId] = useState('');

  return (
    <div className="inset-0 fixed flex justify-center items-center bg-[black]/75 z-40">
      <div className="bg-whiteVariantColor dark:bg-darkBackgroundColor rounded-lg w-4/5 md:w-3/5 lg:w-1/2 z-50 p-6">
        {panel === 0 && <NewPlaceAddress lat={lat} lng={lng} validId={validId} setValidId={setValidId} setNewPlace={setNewPlace} setPanel={setPanel} />}
        {panel === 1 && <NewPlaceCreate setPanel={setPanel} validId={validId} />}
      </div>
      <div className="w-full h-full absolute z-0" onClick={() => setNewPlace(false)} />
    </div>
  );
}

OverlayNewPlace.propTypes = {
  setNewPlace: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default OverlayNewPlace;
