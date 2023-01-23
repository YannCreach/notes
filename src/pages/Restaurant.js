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

function Restaurant() {
  const { user, setUser } = useContext(UserContext);
  const [tab, setTab] = useState('Mementos');
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState({});
  const [toggleMap, setToggleMap] = useState(true);
  const [editing, setEditing] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  const getOneRestaurant = async () => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/restaurant`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
          restaurantid: Number(user.currentPage.split('-')[1]),
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete RESTAURANT OK', result);
      setRestaurant(result.data[0]);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete RESTAURANT NOK', error);
    }
  };

  useEffect(() => {
    getOneRestaurant();
  }, [editing]);

  return (
    (!loading && (
    <>
      { editing && <OverlayCreateEdit data={restaurant} type="restaurant" editing={editing} setEditing={setEditing} /> }
      <div className="text-lightTextColor dark:text-darkTextColor px-6 pb-4">
        <div className="flex justify-between">
          <NavBtn caption="Précédent" icon="previous" order="iconFirst" target="home" />
          <NavBtn caption="Modifier" icon="edit" order="captionFirst" target="" editing={editing} setEditing={setEditing} />
        </div>

        <div className="flex items-center">
          <EditableFavorite favorite={restaurant.favorite} setRestaurant={setRestaurant} restaurant={restaurant} editing={editing} />
          <p className="text-2xl font-bold mb-2">{ restaurant.name }</p>
        </div>
        <EditableTags data={restaurant.tags} editing={editing} />

        <p className="mb-4">{ restaurant.location }</p>

        <p className="mb-4">{ restaurant.comment }</p>
        {!editing && <p className="pb-4 text-xs">Ajouté le {convertDate(restaurant.created_at)}{restaurant.updated_at && ` - Dernière modification le ${convertDate(restaurant.updated_at)}`}</p>}

        <div className="relative">
          { (restaurant.photo_url && !editing)
              && (
              <div className="bg-[white] rounded-full absolute p-1 top-2 right-2 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card text-2xl text-darkAccentColor z-10">
                <ToggleMap setToggleMap={setToggleMap} toggleMap={toggleMap} />
              </div>
              )}
          { toggleMap
            ? <EditablePicture url={`${REACT_APP_API_URL}${restaurant.photo_url}`} editing={editing} setEditing={setEditing} rounded={false} />
            : (
              <MapContainer center={[Number(restaurant.coordinate.split(' - ')[0]), Number(restaurant.coordinate.split(' - ')[1])]} zoom={13} scrollWheelZoom={false} className="h-48 w-full rounded-md z-0">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[Number(restaurant.coordinate.split(' - ')[0]), Number(restaurant.coordinate.split(' - ')[1])]} />
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
            <div onClick={() => setUser({ ...user, currentPage: `addMemento-${restaurant.id}` })}>
              <Button type="normal" caption="Nouveau mémento" />
            </div>
            { restaurant.menentos && <Mementos mementos={restaurant.mementos} /> }
          </div>
          )}
          { (tab === 'Plats') && (
          <>
            <div className="px-8 cursor-pointer" onClick={() => setUser({ ...user, currentPage: `addMeal-${restaurant.id}` })}>
              <Button type="normal" caption="Nouveau plat" />
            </div>
            { restaurant.meal && <CardList type="meal" data={restaurant.meal} /> }
          </>
          )}
        </div>
      </>
      )}

    </>
    )
    ));
}

export default Restaurant;
