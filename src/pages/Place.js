import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { CapacitorHttp } from '@capacitor/core';
import CardList from '../components/CardList/CardList';
import Mementos from '../components/Mementos/Mementos';
import Button from '../components/Button/Button';
import ToggleMap from '../components/ToggleMap/ToggleMap';
import NavBtn from '../components/NavBtn/NavBtn';
import UserContext from '../context/UserContext';
// import EditableText from '../components/EditableText/EditableText';
import EditablePicture from '../components/EditablePicture/EditablePicture';
import Tab from '../components/Tab/Tab';
import { convertDate } from '../utils/utils';
import EditableTags from '../components/EditableTags/EditableTags';
import EditableFavorite from '../components/EditableFavorite/EditableFavorite';
import OverlayCreateEdit from '../components/OverlayCreateEdit/OverlayCreateEdit';

function Place() {
  const { user, setUser } = useContext(UserContext);
  const [tab, setTab] = useState('Mementos');
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState({});
  const [toggleMap, setToggleMap] = useState(true);
  const [editing, setEditing] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  const getOnePlace = async () => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/place`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
          placeid: Number(user.currentPage.split('-')[1]),
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete PLACE OK', result);
      setPlace(result.data[0]);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete PLACE NOK', error);
    }
  };

  useEffect(() => {
    getOnePlace();
  }, [editing]);

  return (
    (!loading && (
    <>
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
        <EditableTags data={place.tags} editing={editing} />

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
            <div onClick={() => setUser({ ...user, currentPage: `addMemento-${place.id}` })}>
              <Button type="normal" caption="Nouveau mémento" />
            </div>
            { place.menentos && <Mementos mementos={place.mementos} /> }
          </div>
          )}
          { (tab === 'Plats') && (
          <>
            <div className="px-8 cursor-pointer" onClick={() => setUser({ ...user, currentPage: `addNote-${place.id}` })}>
              <Button type="normal" caption="Nouveau plat" />
            </div>
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
