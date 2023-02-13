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

function Place() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState({});
  const [editing, setEditing] = useState(false);
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

      console.log('Requete PLACE OK', result.data.place);
      setPlace(result.data.place);
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
      <div className="relative">
        <Map place={place} zoom={17} />
      </div>
      { editing && <OverlayCreateEdit data={place} type="place" editing={editing} setEditing={setEditing} /> }
      <div className="text-lightTextColor dark:text-darkTextColor px-6 pb-4">
        <div className="flex justify-between">
          <NavBtn caption={t('button_previous')} icon="previous" order="iconFirst" target="home" />
          <NavBtn caption={t('button_modify')} icon="edit" order="captionFirst" target="" editing={editing} setEditing={setEditing} />
        </div>

        <div className="flex items-center">
          <EditableFavorite favorite={place.favorite} setPlace={setPlace} place={place} editing={editing} />
          <p className="text-2xl font-bold mb-2">{ place.name }</p>
        </div>
        {/* <EditableTags data={place.tags} editing={editing} /> */}

        <p className="mb-4">{ place.location }</p>

        <p className="mb-4">{ place.comment }</p>
        {!editing && (
        <p className="pb-4 text-xs">
          {t('description_added_date')} {convertDate(place.created_at)}
          {place.updated_at && t('description_modification_date')}{convertDate(place.updated_at)}
        </p>
        )}

      </div>
    </>
    )
    ));
}

export default Place;
