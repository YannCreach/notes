import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOMServer from 'react-dom/server';
import { useNavigate } from 'react-router-dom';
import Icons from '../Icons/Icons';

function Map({
  zoomLevel, fullSize, setFullSize, lat, lng, pins,
}) {
  const { REACT_APP_MAPBOX_API } = process.env;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLng, setCurrentLng] = useState(lng);
  const [currentZoom, setCurrentZoom] = useState(9);
  const navigate = useNavigate();
  let markers = [];

  const handleZoomChange = () => {
    setCurrentZoom(map.current.getZoom());
  };

  // const removeMarkers = () => {
  //   if (map.current && map.current.getLayer('markers')) {
  //     map.current.removeLayer('markers');
  //     map.current.removeSource('markers');
  //   }
  // };
  const removeMarkers = () => {
    markers.forEach((marker) => {
      marker.remove();
    });

    // Clear the markers array
    markers = [];
  };

  //! retirer les markers à chque modification de pins
  //! pas de popup/label si page place ?
  //!

  const addMarkers = () => {
    removeMarkers();
    pins.forEach((pin) => {
      const { latitude, longitude } = pin;

      const markerElement = document.createElement('div');
      markerElement.className = 'ml-5 w-20 marker flex items-center justify-between';
      // markerElement.className = 'marker flex flex-col items-center justify-center';

      const iconElement = document.createElement('div');
      iconElement.className = 'marker-icon cursor-pointer drop-shadow-lg drop-shadow-lg shadow-card bg-lightAccentColor rotate-45 rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-lg w-10 h-10 aspect-square';
      iconElement.innerHTML = ReactDOMServer.renderToStaticMarkup(<Icons icon={pin.place_category.label} classes="p-1 text-[white] -rotate-45 h-6 mt-1 ml-1" />);
      markerElement.appendChild(iconElement);

      const labelElement = document.createElement('p');
      labelElement.className = 'marker-label text-lg hidden ml-2 [text-shadow:_2px_0_2px_white,_-2px_0_2px_white,_0_-2px_2px_white,_1px_1px_2px_white,_-1px_-1px_2px_white,_-1px_1px_2px_white,_1px_-1px_2px_white] leading-4';

      labelElement.textContent = pin.name;
      markerElement.appendChild(labelElement);

      markerElement.addEventListener('click', () => {
        navigate(`/../../place/${pin.slug}-${pin.id}`);
      });

      // const popupContent = document.createElement('div');
      // popupContent.addEventListener('click', () => navigate(`/../../place/${pin.slug}-${pin.id}`));
      // popupContent.innerHTML = `${pin.name}`;

      // const popup = new mapboxgl.Popup({
      //   offset: 25, closeOnMove: true, closeButton: true, closeOnClick: true,
      // })
      //   .addClassName('drop-shadow-lg bolder rounded-lg')
      //   .setDOMContent(popupContent);

      const marker = new mapboxgl.Marker({
        element: markerElement,
      })
        .setLngLat([longitude, latitude])
        // .setPopup(popup)
        .addTo(map.current);

      markers.push(marker);
    });
  };

  const createMap = () => {
    if (map.current) return;
    mapboxgl.accessToken = REACT_APP_MAPBOX_API;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [currentLng, currentLat],
      zoom: zoomLevel,
    });
    map.current.on('zoom', () => handleZoomChange());
    // if (pins.length > 0) addMarkers();
  };

  const toggleMarkerLabels = () => {
    const markerLabels = document.querySelectorAll('.marker-label');
    markerLabels.forEach((marker) => {
      if (map.current.getZoom() < 12) {
        marker.classList.add('hidden');
      }
      else {
        marker.classList.remove('hidden');
      }
    });
  };

  useEffect(() => {
    createMap();
    if (pins.length > 0) addMarkers();
  }, [lat, currentLat, pins]);

  useEffect(() => {
    setCurrentLat(lat);
    setCurrentLng(lng);
  }, [lat, lng]);

  useEffect(() => {
    // console.log(Math.floor(currentZoom));
    toggleMarkerLabels();
  }, [currentZoom]);

  return (

    <div className="relative w-full h-full overflow-hidden drop-shadow-lg bg-darkDangerColor">
      <div onClick={() => setFullSize(!fullSize)} className="flex items-center justify-center h-12 w-12 pt-1 text-lightAccentColor z-30 ml-6 drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-full absolute right-6 bottom-6">
        <Icons icon={fullSize ? 'ExpendMap' : 'RetractMap'} classes="h-5 aspect-square" />
      </div>
      {/* <div ref={mapContainer} className={`absolute w-full ${fullSize ? 'top-[-10vh]' : 'top-[-35vh]'} h-[105vh] z-0 duration-700`} /> */}
      <div className="relative w-full h-full">
        <div ref={mapContainer} className={`relative h-[100vh] w-full ${fullSize ? 'top-0' : 'top-[-30vh]'} z-10 cursor-pointer`} />
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
