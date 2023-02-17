import { useEffect, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { convertDate } from '../utils/utils';
import OverlayCreateEdit from '../components/OverlayCreateEdit/OverlayCreateEdit';
import Map from '../components/Map/Map';
import Title from '../components/Title/Title';
import Button from '../components/Button/Button';
import CardList from '../components/CardList/CardList';
import Icons from '../components/Icons/Icons';
import Tag from '../components/Tag/Tag';
import OverlayYelp from '../components/OverlayYelp/OverlayYelp';

function Place() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState({});
  const [yelp, setYelp] = useState(false);
  const [editing, setEditing] = useState(false);
  const [expendLatest, setExpendLatest] = useState(true);
  const { REACT_APP_API_URL } = process.env;
  const params = useParams();
  const split = params.slug.split('-');
  const placeId = parseInt(split[split.length - 1], 10);
  const { getAccessTokenSilently } = useAuth0();

  const getOnePlace = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/place`,
        headers: {
          Authorization: `Bearer ${token}`,
          placeid: placeId,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete PLACE OK', result.data);
      setPlace(result.data);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete PLACE NOK', error);
    }
  };

  useEffect(() => {
    getOnePlace();
  }, []);

  return (
    (!loading && (
      <>

        <Map place={place.yelp ? place.yelp.coordinates : place} zoom={17} />

        { editing && <OverlayCreateEdit data={place} type="place" editing={editing} setEditing={setEditing} /> }
        { yelp && <OverlayYelp data={place.yelp} setYelp={setYelp} /> }

        <div className="text-lightTextColor dark:text-darkTextColor px-6 pb-4">
          <div className="flex mt-6">
            {place.yelp.categories?.map((tag) => <Tag caption={tag.title} />)}
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-2xl font-bold mb-2">{ place.yelp ? place.yelp.name : place.name }</p>
            <div className="">
              {Array(place.rating).fill().map(() => (<Icons icon="StarFull" classes="h-4 ml-1 text-lightAccentColor" />))}
            </div>
          </div>

          <div className="flex justify-between items-start">
            <div className="text-sm text-darkTextsubColor mt-2">
              <p>{` ${place.adress},`}</p>
              <p>{` ${place.zip} ${place.city} `}</p>
            </div>
            {place.yelp && (
            <p className="text-xs text-darkTextsubColor mt-2 flex items-center justify-start cursor-pointer" onClick={() => setYelp(true)}>
              {t('yelp_view')}<span className="text-sm font-bold ml-1">yelp</span><Icons icon="Yelp" classes="ml-1 h-4 text-[red]" />
            </p>
            )}
          </div>

          <div className="mt-6 flex flex-col items-end">
            <p className="flex text-lightTextColor dark:text-darkTextColor bg-[white] dark:bg-darkBackgroundAltColor drop-shadow-lg p-3 rounded-lg w-full mb-2">
              { place.comment }
            </p>
            <p className="text-xs text-darkTextsubColor">
              {place.updated_at
                ? `${t('description_modification_date')} ${convertDate(place.updated_at)}`
                : `${t('description_added_date')} ${convertDate(place.created_at)}`}
            </p>
          </div>

        </div>

        {place.place_note.length > 0 && (
        <div className="">
          <Title caption={t('title_last_notes')} seeAll="lastest" classes="mt-12 mb-4" expend={expendLatest} setExpend={setExpendLatest} />
          <CardList data={place.place_note} type="Meals" limit={2} expend={expendLatest} />
        </div>
        )}

        <div className="relative px-6">
          <Button type="accent" caption={t('button_add_note')} classes="mt-6" />
        </div>
        <div className="relative flex justify-center text-sm mt-4">
          <p className="mr-2">{t('dont_need_it')}</p>
          <p className="text-[red] cursor-pointer" onClick={() => {}}>{t('button_delete_place')}</p>
          {/* <Button type="normal" caption={t('button_delete_place')} classes="my-4" /> */}
        </div>

      </>
    ))
  );
}

export default Place;
