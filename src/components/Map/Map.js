import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

function Map({ place }) {
  const { user } = useAuth0();
  const [size, setSize] = useState('30');
  return (
    <div
      className={`w-full h-[${size}vh] overflow-hidden relative flex items-center justify-center drop-shadow-md duration-700`}
      onClick={() => (size === '30' ? setSize('80') : setSize('30'))}
    >
      <div className={`absolute ${size === '80' ? 'top-[-10vh]' : 'top-[-35vh]'} w-[100vw] h-[105vh] z-0 duration-700`}>
        <MapContainer center={[place.lat, place.lng]} zoom={17} zoomControl={false} className="w-[100vw] h-[105vh] ">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={user.colorscheme ? 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png' : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'}
          />
          <Marker position={[place.lat, place.lng]} />
        </MapContainer>
      </div>
    </div>
  );
}

Map.propTypes = {
  place: PropTypes.object.isRequired,
};

export default Map;
