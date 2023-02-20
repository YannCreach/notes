import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Icons from '../Icons/Icons';

function Map({
  place, zoom, fullSize, setFullSize,
}) {
  const { user } = useAuth0();
  // const [fullSize, setFullSize] = useState(false);
  const [loadingGeoloc, setLoadingGeoloc] = useState(true);
  const [location, setLocation] = useState({ lat: place.lat, lng: place.lng });

  const getGeoloc = async () => {
    await navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      console.log(location);
      setLoadingGeoloc(false);
    });
  };

  useEffect(() => {
    if (!place.lat) getGeoloc();
  }, []);

  return (
    <div
      className="w-full h-[100vh] flex-grow overflow-hidden relative top-0 flex items-center justify-center drop-shadow-lg cursor-pointer z-10"
    >
      <div onClick={() => setFullSize(!fullSize)} className="flex items-center justify-center h-12 w-12 pt-1 text-lightAccentColor z-30 ml-6 drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-full absolute right-6 bottom-6">
        {fullSize
          ? <Icons icon="ExpendMap" classes="h-5" />
          : <Icons icon="RetractMap" classes="h-5" />}
      </div>
      <div className={`absolute ${fullSize ? 'top-[-10vh]' : 'top-[-35vh]'} h-[105vh] z-0 duration-700`}>
        {(place.lat || !loadingGeoloc)
        && (
          <MapContainer center={[location.lat, location.lng]} zoom={zoom} zoomControl={false} className="w-[100vw] h-[105vh] ">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={user.colorscheme ? 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png' : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'}
            />
            <Marker position={[location.lat, location.lng]} />
          </MapContainer>
        )}
      </div>
    </div>
  );
}

Map.propTypes = {
  place: PropTypes.object,
  zoom: PropTypes.number.isRequired,
  fullSize: PropTypes.bool.isRequired,
  setFullSize: PropTypes.func.isRequired,
};

Map.defaultProps = {
  place: { lat: undefined, lng: undefined },
};

export default Map;
