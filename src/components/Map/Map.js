import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import Icons from '../Icons/Icons';

function Map({
  zoomLevel, fullSize, setFullSize, lat, lng, pins,
}) {
  const { REACT_APP_MAPBOX_API } = process.env;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLng, setCurrentLng] = useState(lng);
  const [zoom, setZoom] = useState(zoomLevel);

  const addMarkers = () => {
    pins.forEach((pin) => {
      const { latitude, longitude } = pin;
      console.log(latitude, longitude);
      new Marker()
        .setLngLat([longitude, latitude])
        .addTo(map.current);
    });
  };

  const createMap = () => {
    if (map.current) return;
    mapboxgl.accessToken = REACT_APP_MAPBOX_API;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [currentLng, currentLat],
      zoom: zoom,
    });

    if (pins) addMarkers();
  };

  useEffect(() => {
    createMap();
    if (pins) addMarkers();
  }, [lat, currentLat, pins]);

  useEffect(() => {
    setCurrentLat(lat);
    setCurrentLng(lng);
  }, [lat, lng]);

  return (
    <div className={`relative w-full ${fullSize ? 'h-[70vh]' : 'h-[30vh]'} overflow-hidden drop-shadow-lg cursor-pointer z-10`}>
      <div className="w-full h-full overflow-hidden absolute top-0 flex items-center justify-center">
        <div onClick={() => setFullSize(!fullSize)} className="flex items-center justify-center h-12 w-12 pt-1 text-lightAccentColor z-30 ml-6 drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-full absolute right-6 bottom-6">
          {fullSize
            ? <Icons icon="ExpendMap" classes="h-5" />
            : <Icons icon="RetractMap" classes="h-5" />}
        </div>
        {/* <div ref={mapContainer} className={`absolute w-full ${fullSize ? 'top-[-10vh]' : 'top-[-35vh]'} h-[105vh] z-0 duration-700`} /> */}
        <div ref={mapContainer} className="absolute w-full h-[100vh] z-0 duration-700" />
      </div>
    </div>
  );
}

Map.propTypes = {
  zoomLevel: PropTypes.number.isRequired,
  fullSize: PropTypes.bool.isRequired,
  setFullSize: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  pins: PropTypes.array.isRequired,
};

export default Map;
