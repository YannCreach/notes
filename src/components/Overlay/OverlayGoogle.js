import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import Icons from '../Icons/Icons';
import { genererTableauHorairesGoogle, hasDecimal } from '../../utils/utils';
import Button from '../Button/Button';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import Tag from '../Tag/Tag';

function OverlayGoogle({ data, setGoogle }) {
  const [hours, setHours] = useState('');

  useEffect(() => {
    if (data.opening_hours.periods) setHours(genererTableauHorairesGoogle(data.opening_hours));
  }, []);
  return (
    <div className="w-full h-full absolute left-0 flex justify-center items-center bg-[black]/75 z-40">
      <div className="bg-whiteVariantColor dark:bg-darkBackgroundColor rounded-lg w-[80%] sm:w-100 z-10">

        {/* {data.photos && (<ImageCarousel imageUrls={data.photos} source="google" />)} */}
        <div className="relative h-56 overflow-hidden rounded-t-lg md:h-96">
          <div className="duration-700 ease-in-out">
            <img src={data.google_cover} className="absolute block w-full h-full object-cover " alt="..." />
          </div>
        </div>
        <div className="p-6">
          <div className="flex mb-4">
            {data.types.length > 0 && <Tag caption={data.types[0]} />}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lightTextColor dark:text-darkTextColor font-bold text-xl">
              {data.name}
            </div>
            {data.rating && (
            <div className="flex ml-4 items-center">
              {Array(Math.floor(data.rating)).fill().map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Icons icon="StarFull" classes="h-3 text-[#1374e9]" key={i} />
              ))}
              {hasDecimal(data.rating) && (<Icons icon="StarHalf" classes="h-3 text-[#1374e9]" />)}
              <p className="text-xs text-darkTextsubColor ml-1">{`(${data.user_ratings_total})`}</p>
            </div>
            )}
          </div>

          <p className="my-2 text-sm text-darkTextsubColor">
            { data.formatted_address && `${data.formatted_address},` }
          </p>

          {/* <div className="flex mt-4">
            {data.types?.map((tag) => <Tag caption={tag} />)}
          </div> */}

          <div className="flex">
            {data.price_level && (
            <div className="mr-3 flex">
              {Array(data.price_level).fill().map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Icons icon="Euro" classes="h-3 text-[#1374e9]" key={i} />
              ))}
            </div>
            )}
            {data.categories?.map((tag) => <p className="mr-3">{tag.title}</p>)}
            {data.opening_hours && (<p className={`mr-3 ${data.opening_hours.open_now ? 'text-[green]' : 'text-[red]'}`}>{data.opening_hours.open_now ? t('Open') : t('Close')}</p>)}
          </div>

          { hours && (
          <>
            <p className="text-xs mt-4 mb-2 text-darkTextsubColor">{t('Opening')}</p>
            <div className="flex flex-col text-xs  bg-[white] drop-shadow-lg p-3 px-6 rounded-lg">
              { hours.map((hour) => (
                <div className="flex justify-between">
                  <p className="text-right">{hour.day}</p>
                  <div className="flex ml-5 mb-2">
                    <div>
                      <p className="mr-2">{hour.start}</p>
                      <p className="">{hour.end}</p>
                    </div>
                    {hour.start2 && (
                      <div>
                        <p className="mr-2">{hour.start2}</p>
                        <p className="">{hour.end2}</p>
                      </div>
                    )}
                  </div>
                </div>
              )) }
            </div>
          </>
          )}

          {data.formatted_phone_number && (
          <div className="relative" onClick={() => setGoogle(false)}>
            <Button type="accent" caption={t('Telephone')} classes="mt-8" />
          </div>
          )}

          <div className="relative" onClick={() => setGoogle(false)}>
            <Button type="normal" caption={t('button_previous')} classes="mt-2" />
          </div>

          <p className="text-xs text-darkTextsubColor mt-4 flex items-center justify-center">
            {t('yelp_data')}<span className="text-sm font-bold ml-1">Google</span><Icons icon="Pin" classes="ml-1 h-4 text-[#1374e9]" />
          </p>
        </div>

      </div>
      <div className="w-full h-full absolute z-0" onClick={() => setGoogle(false)} />
    </div>
  );
}

OverlayGoogle.propTypes = {
  data: PropTypes.object.isRequired,
  setGoogle: PropTypes.func.isRequired,
};

export default OverlayGoogle;
