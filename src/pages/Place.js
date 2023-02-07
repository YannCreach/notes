import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { CapacitorHttp } from '@capacitor/core';
import { Link, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import CardList from '../components/CardList/CardList';
import Mementos from '../components/Mementos/Mementos';
import Button from '../components/Button/Button';
import ToggleMap from '../components/ToggleMap/ToggleMap';
import NavBtn from '../components/NavBtn/NavBtn';
// import EditableText from '../components/EditableText/EditableText';
import EditablePicture from '../components/EditablePicture/EditablePicture';
import Tab from '../components/Tab/Tab';
import { convertDate } from '../utils/utils';
import EditableTags from '../components/EditableTags/EditableTags';
import EditableFavorite from '../components/EditableFavorite/EditableFavorite';
import OverlayCreateEdit from '../components/OverlayCreateEdit/OverlayCreateEdit';
import Map from '../components/Map/Map';

function Place() {
  const [tab, setTab] = useState('Mementos');
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState({});
  const [toggleMap, setToggleMap] = useState(true);
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

  // useEffect(() => {
  //   getOnePlace();
  // }, [editing]);

  return (
    (!loading && (
    <>
      <div className="relative">
        <Map place={place} />
      </div>
      { editing && <OverlayCreateEdit data={place} type="place" editing={editing} setEditing={setEditing} /> }
      <div className="text-lightTextColor dark:text-darkTextColor px-6 pb-4">
        <div className="flex justify-between">
          <NavBtn caption="Précédent" icon="previous" order="iconFirst" target="home" />
          <NavBtn caption="Modifier" icon="edit" order="captionFirst" target="" editing={editing} setEditing={setEditing} />
        </div>

        <div className="flex items-center">
          <EditableFavorite favorite={place.favorite} setPlace={setPlace} place={place} editing={editing} />
          <p className="text-2xl font-bold mb-2">{ place.name }</p>
        </div>
        {/* <EditableTags data={place.tags} editing={editing} /> */}

        <p className="mb-4">{ place.location }</p>

        <p className="mb-4">{ place.comment }</p>
        {!editing && <p className="pb-4 text-xs">Ajouté le {convertDate(place.created_at)}{place.updated_at && ` - Dernière modification le ${convertDate(place.updated_at)}`}</p>}

        <div className="relative">
          { (place.photo_url && !editing)
              && (
              <div className="bg-[white] rounded-full absolute p-1 top-2 right-2 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card text-2xl text-darkAccentColor z-10">
                <ToggleMap setToggleMap={setToggleMap} toggleMap={toggleMap} />
              </div>
              )}
          { toggleMap
            ? <EditablePicture url={`${REACT_APP_API_URL}${place.photo_url}`} editing={editing} setEditing={setEditing} rounded={false} />
            : (
              <MapContainer center={[Number(place.coordinate.split(' - ')[0]), Number(place.coordinate.split(' - ')[1])]} zoom={13} scrollWheelZoom={false} className="h-48 w-full rounded-md z-0">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[Number(place.coordinate.split(' - ')[0]), Number(place.coordinate.split(' - ')[1])]} />
              </MapContainer>
            )}

        </div>

      </div>

      {!editing && (
      <>
        <Tab values={['Mementos', 'Plats']} tab={tab} setTab={setTab} />

        <div className="flex flex-col flex-grow py-8 text-lightTextColor dark:text-darkTextColor overflow-y-scroll">
          { (tab === 'Mementos') && (
          <div className="px-4 cursor-pointer">
            <Link to="">
              <Button type="normal" caption="Nouveau mémento" />
            </Link>
            { place.menentos && <Mementos mementos={place.mementos} /> }
          </div>
          )}
          { (tab === 'Plats') && (
          <>
            <Link className="px-8 cursor-pointer" to="">
              <Button type="normal" caption="Nouveau plat" />
            </Link>
            { place.note && <CardList type="note" data={place.note} /> }
          </>
          )}
        </div>
      </>
      )}

    </>
    )
    ));
}

export default Place;
