import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Icons from '../Icons/Icons';

function Map({
  zoomLevel, fullSize, setFullSize, lat, lng,
}) {
  const { REACT_APP_MAPBOX_API } = process.env;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLng, setCurrentLng] = useState(lng);
  const [zoom, setZoom] = useState(zoomLevel);

  const createMap = () => {
    if (map.current) return;
    mapboxgl.accessToken = REACT_APP_MAPBOX_API;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [currentLng, currentLat],
      zoom: zoom,
    });
  };

  useEffect(() => {
    createMap();
  }, [lat, currentLat]);

  return (
    <div className="w-full h-[105vh] overflow-hidden relative top-0 flex items-center justify-center drop-shadow-lg cursor-pointer z-10">
      <div onClick={() => setFullSize(!fullSize)} className="flex items-center justify-center h-12 w-12 pt-1 text-lightAccentColor z-30 ml-6 drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-full absolute right-6 bottom-6">
        {fullSize
          ? <Icons icon="ExpendMap" classes="h-5" />
          : <Icons icon="RetractMap" classes="h-5" />}
      </div>
      <div ref={mapContainer} className={`absolute w-full ${fullSize ? 'top-[-10vh]' : 'top-[-35vh]'} h-[105vh] z-0 duration-700`} />
    </div>
  );
}

Map.propTypes = {
  zoomLevel: PropTypes.number.isRequired,
  fullSize: PropTypes.bool.isRequired,
  setFullSize: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Map;
