import { useEffect, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import NavBtn from '../components/NavBtn/NavBtn';
import { convertDate } from '../utils/utils';
import EditableFavorite from '../components/EditableFavorite/EditableFavorite';
import OverlayCreateEdit from '../components/OverlayCreateEdit/OverlayCreateEdit';
import Map from '../components/Map/Map';
import Title from '../components/Title/Title';
import Button from '../components/Button/Button';
import CardList from '../components/CardList/CardList';
import Icons from '../components/Icons/Icons';

function Place() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState({});
  const [editing, setEditing] = useState(false);
  const [expendLatest, setExpendLatest] = useState(true);
  const { REACT_APP_API_URL } = process.env;
  const params = useParams();
  const split = params.slug.split('-');
  const placeId = parseInt(split[split.length - 1], 10);
  const { getAccessTokenSilently } = useAuth0();
  const fullStars = [];

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

      console.log('Requete PLACE OK', result.data.place);
      setPlace(result.data.place);
      for (let i = 0; i < result.data.place.rating; i + 1) {
        fullStars.push('full');
      }
      console.log(fullStars);
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

      <Map place={place} zoom={17} />

      { editing && <OverlayCreateEdit data={place} type="place" editing={editing} setEditing={setEditing} /> }
      <div className="text-lightTextColor dark:text-darkTextColor px-6 pb-4">
        {/* <div className="flex justify-between">
          <NavBtn caption={t('button_previous')} icon="previous" order="iconFirst" target="home" />
          <NavBtn caption={t('button_modify')} icon="edit" order="captionFirst" target="" editing={editing} setEditing={setEditing} />
        </div> */}

        <div className="flex items-center">
          <p className="text-2xl font-bold mb-2">{ place.name }</p>
          {fullStars.map(() => (<Icons icon="StarFull" classes="h-3 ml-1 text-lightAccentColor" />))}

        </div>
        {/* <EditableTags data={place.tags} editing={editing} /> */}

        <p className="mb-4">{ place.adress }</p>

        <p className="mb-4">{ place.comment }</p>
        {!editing && (
        <p className="pb-4 text-xs">
          {t('description_added_date')} {convertDate(place.created_at)}
          {place.updated_at && t('description_modification_date')}{convertDate(place.updated_at)}
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
