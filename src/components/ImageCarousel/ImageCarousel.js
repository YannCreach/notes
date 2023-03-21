import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Icons from '../Icons/Icons';

function ImageCarousel({ imageUrls, source }) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {

  }, [currentImg]);

  return (
    <div className="relative">
      <div className="relative h-56 overflow-hidden rounded-t-lg md:h-96">
        {/* { imageUrls.map((image) => ( */}
        <div className="duration-700 ease-in-out">
          {source === 'google' && <img src={imageUrls[currentImg].html_attributions[0].split('"')[1]} className="absolute block w-full h-full object-cover " alt="..." />}
          {source === 'yelp' && <img src={imageUrls[currentImg]} className="absolute block w-full h-full object-cover " alt="..." />}
        </div>
        {/* ))} */}
      </div>
      <button type="button" className="rounded-t-lg absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={() => setCurrentImg(currentImg > 0 ? currentImg - 1 : imageUrls.length - 1)}>
        <div className="p-3 py-2 bg-[white] rounded-full drop-shadow-md">
          <Icons icon="ArrowLeft" classes="h-4 w-4 text-[red]" />
        </div>
      </button>
      <button type="button" className="rounded-t-lg absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={() => setCurrentImg(currentImg < (imageUrls.length - 1) ? currentImg + 1 : 0)}>
        <div className="p-3 py-2 bg-[white] rounded-full drop-shadow-md">
          <Icons icon="ArrowRight" classes="h-4 w-4 text-[red]" />
        </div>
      </button>
    </div>
  );
}

ImageCarousel.propTypes = {
  imageUrls: PropTypes.array.isRequired,
  source: PropTypes.string.isRequired,
};

export default ImageCarousel;
