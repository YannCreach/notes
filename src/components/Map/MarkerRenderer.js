import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOMServer from 'react-dom/server';
import { Link } from 'react-router-dom';
import Icons from '../Icons/Icons';

function MarkerRenderer({ pins }) {
  const markerContainerRef = useRef(null);

  useEffect(() => {
    const addMarkers = () => {
      // ... Votre logique pour ajouter les marqueurs ...

      pins.forEach((pin) => {
        const { latitude, longitude } = pin;

        const markerElement = document.createElement('div');
        markerElement.innerHTML = ReactDOMServer.renderToStaticMarkup(
          <Link to={`../../place/${pin.slug}-${pin.id}`} className="flex flex-col items-center cursor-pointer">
            <Icons icon={pin.place_category.label} classes="p-2 rounded-full text-lightAccentColor drop-shadow-lg bg-[white] h-4" />
            <span className="marker-label hidden bold">{pin.name}</span>
          </Link>,
        );

        new mapboxgl.Marker({
          element: markerElement,
        })
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      });
    };

    addMarkers();
  }, [pins]);

  return <div ref={markerContainerRef} />;
}

MarkerRenderer.propTypes = {
  pins: PropTypes.array.isRequired,
};

export default MarkerRenderer;
