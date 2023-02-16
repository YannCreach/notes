import { useEffect, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import { Link, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
// import NavBtn from '../components/NavBtn/NavBtn';
import { Icon } from 'leaflet';
import { convertDate } from '../utils/utils';
// import EditableFavorite from '../components/EditableFavorite/EditableFavorite';
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
      { yelp && <OverlayYelp data={place.yelp} editing={yelp} setEditing={setYelp} /> }
      <div className="text-lightTextColor dark:text-darkTextColor px-6 pb-4">
        {/* <div className="flex justify-between">
          <NavBtn caption={t('button_previous')} icon="previous" order="iconFirst" target="home" />
          <NavBtn caption={t('button_modify')} icon="edit" order="captionFirst" target="" editing={editing} setEditing={setEditing} />
        </div> */}
        <div className="flex mt-6">
          {place.yelp.categories?.map((tag) => <Tag caption={tag.title} />)}
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold mb-2">{ place.yelp ? place.yelp.name : place.name }</p>
          <div className="">
            {Array(place.rating).fill().map(() => (<Icons icon="StarFull" classes="h-3 ml-1 text-lightAccentColor" />))}
          </div>
        </div>
        <div className="flex justify-between w-full mt-4 items-center">
          <p className=" text-sm text-darkTextsubColor">
            { place.yelp ? `${place.yelp.location.address1}, ${place.yelp.location.zip_code} ${place.yelp.location.city}` : place.adress }
          </p>
          {place.yelp && (
            <div onClick={() => setYelp(true)} className="cursor-pointer">
              <Icons icon="Yelp" classes="h-6 text-lightAccentColor" />
            </div>
          )}

        </div>

        <p className="mt-6">{ place.comment }</p>
        {!editing && (
        <p className="pb-4 text-xs text-darkTextsubColor">
          {/* {t('description_added_date')} {convertDate(place.created_at)} */}
          {place.updated_at && t('description_modification_date')}
          {place.updated_at && convertDate(place.updated_at)}
        </p>
        )}
      </div>

      <div className="">
        <Title caption={t('title_last_meal')} seeAll="lastest" classes="mt-12 mb-4" expend={expendLatest} setExpend={setExpendLatest} />
        <CardList data={place.place_note} type="Meals" limit={2} expend={expendLatest} />
      </div>
      <div className="relative p-6">
        <Button type="accent" caption={t('button_add_note')} classes="mt-8" />
      </div>

    </>
    )
    ));
}

export default Place;
