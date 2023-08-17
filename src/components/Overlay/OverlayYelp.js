import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import Icons from '../Icons/Icons';
import { genererTableauHoraires, hasDecimal } from '../../utils/utils';
import Button from '../Button/Button';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import Tag from '../Tag/Tag';

function OverlayYelp({ data, setYelp }) {
  const [hours, setHours] = useState('');

  useEffect(() => {
    if (data.hours) setHours(genererTableauHoraires(data.hours[0].open));
  }, []);
  return (
    <div className="w-full h-full absolute left-0 flex justify-center items-center bg-[black]/75 z-40">
      <div className="bg-whiteVariantColor dark:bg-darkBackgroundColor rounded-lg w-[80%] sm:w-100 z-10">

        {data.photos && (<ImageCarousel imageUrls={data.photos} source="yelp" />)}

        <div className="p-6">

          <div className="flex mb-4">
            {data.categories?.map((tag) => <Tag caption={tag.title} key={tag.id} />)}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lightTextColor dark:text-darkTextColor font-bold text-xl">
              {data.name}
            </div>
            {data.rating && (
            <div className="flex ml-4 items-center">
              {Array(Math.floor(data.rating)).fill().map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Icons icon="StarFull" classes="h-3 text-[red]" key={i} />
              ))}
              {hasDecimal(data.rating) && (<Icons icon="StarHalf" classes="h-3 text-[red]" />)}
              <p className="text-xs text-darkTextsubColor ml-1">{`(${data.review_count})`}</p>
            </div>
            )}
          </div>

          <div className="my-2">
            <p className=" text-sm text-darkTextsubColor">
              { data.location && `${data.location.address1},` }
            </p>
            <p className=" text-sm text-darkTextsubColor">
              { data.location && `${data.location.zip_code} ${data.location.city}` }
            </p>
          </div>

          <div className="flex">
            {data.price && (<p className="mr-3">{data.price}</p>)}
            {data.categories?.map((tag) => <p className="mr-3">{tag.title}</p>)}
            {data.hours && (<p className={`mr-3 ${data.is_open_now ? 'text-[green]' : 'text-[red]'}`}>{data.is_open_now ? t('Open') : t('Close')}</p>)}
          </div>

          {/* {data.phone && (
          <>
            <p className="text-xs text-darkTextsubColor mb-2 mt-6">{t('Telephone')}</p>
            <div className="text-sm bg-[white] drop-shadow-lg p-3 rounded-lg text-center text-lightAccentColor text-bold">
              <Link to={`tel:${data.phone}`} className="">
                {data.display_phone}
              </Link>
            </div>
          </>
          )} */}

          {/* rating: 3.5 review_count: 6 */}
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

          {data.phone && (
          <div className="relative" onClick={() => setYelp(false)}>
            <Button type="accent" caption={t('Telephone')} classes="mt-8" />
          </div>
          )}

          <div className="relative" onClick={() => setYelp(false)}>
            <Button type="normal" caption={t('button_previous')} classes="mt-2" />
          </div>

          <p className="text-xs text-darkTextsubColor mt-4 flex items-center justify-center">
            {t('yelp_data')}<span className="text-sm font-bold ml-2">yelp</span><Icons icon="Yelp" classes="ml-1 h-4 text-[red]" />
          </p>
        </div>

      </div>
      <div className="w-full h-full absolute z-0" onClick={() => setYelp(false)} />
    </div>
  );
}

OverlayYelp.propTypes = {
  data: PropTypes.object.isRequired,
  setYelp: PropTypes.func.isRequired,
};

export default OverlayYelp;
