import { Link } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, Marker,
} from 'react-leaflet';
import { CapacitorHttp } from '@capacitor/core';
import CardList from '../components/CardList/CardList';
import Mementos from '../components/Mementos/Mementos';
import Button from '../components/Button/Button';
import Tag from '../components/Tag/Tag';
import ToggleMap from '../components/ToggleMap/ToggleMap';
import NavBtn from '../components/NavBtn/NavBtn';
import imgPlaceholder from '../assets/images/placeholder2.jpg';
import UserContext from '../context/UserContext';

function Restaurant() {
  const { user, setUser } = useContext(UserContext);
  const [tab, setTab] = useState('mementos');
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(true);
  const [toggleMap, setToggleMap] = useState(true);
  const { REACT_APP_API_URL } = process.env;

  const getOneRestaurant = async () => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/restaurant`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
          restaurantid: user.currentPage,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete RESTAURANTS OK', result);
      setRestaurant(result.data);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete RESTAURANTS NOK', error);
    }
  };

  useEffect(() => {
  }, []);

  return (
    (!loading && (
      <>
        <div className="text-lightTextColor dark:text-darkTextColor px-6 pb-4">
          <div className="w-full flex justify-between items-center">
            <NavBtn caption="Précédent" type="previous" order="iconFirst" target="/" />
            <NavBtn caption="Modifier" type="edit" order="captionFirst" target="./edit" />
          </div>
          <div className="topLane flex justify-left items-baseline pb-4 font-bold">
            { restaurant.favorite
          && <BsHeartFill />}
            <p className="text-2xl pl-4">{restaurant.name}</p>
          </div>
          <p className="adress pb-6 text-sm">{restaurant.location}</p>
          <div className="pb-8 text-sm inline-flex flex-wrap">
            { restaurant.tags.map((tag) => (
              <Tag caption={tag.label} key={tag.id} type="normal" />
            ))}
          </div>

          <div className="relative">
            { restaurant.photo_url
              && (
              <div className="bg-[white] rounded-full absolute p-1 top-2 right-2 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card text-2xl text-darkAccentColor z-10">
                <ToggleMap setToggleMap={setToggleMap} toggleMap={toggleMap} />
              </div>
              )}
            { toggleMap
              ? <img src={restaurant.photo_url ? `${REACT_APP_API_URL}${restaurant.photo_url}` : `${imgPlaceholder}`} className={restaurant.photo_url ? 'object-cover h-48 w-full rounded-md' : 'object-cover h-48 w-full rounded-md blur'} alt="mapPlaceholder" />
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

        <div className="tabs flex text-lightTextColor dark:text-darkTextColor px-6 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card ">
          <Link
            to="#"
            onClick={() => {
              setTab('mementos');
            }}
            className={`mementoTab border-lightAccentColor dark:border-darkAccentColor pb-2 mr-5 ${tab === 'mementos' ? 'border-b-2' : 'border-0'}`}
          >
            Mémentos
          </Link>
          <Link
            to="#"
            onClick={() => {
              setTab('meals');
            }}
            className={`mealsTab border-lightAccentColor dark:border-darkAccentColor pb-2 mr-5 ${tab === 'meals' ? 'border-b-2' : 'border-0'}`}
          >
            Plats évalués
          </Link>
        </div>

        <div className="flex flex-col flex-grow py-8 text-lightTextColor dark:text-darkTextColor overflow-y-scroll">
          { (tab === 'mementos')
        && (
          <div className="px-4">
            <Link to="/addmemento/restaurant">
              <Button type="normal" caption="Nouveau mémento" />
            </Link>
            <Mementos mementos={restaurant.mementos} />
          </div>
        )}
          { (tab === 'meals')
        && (
          <>
            <Link to={`/meal/add/${restaurant.id}`} className="mx-4">
              <Button type="normal" caption="Nouveau plat" />
            </Link>
            <CardList type="meal" />
          </>
        )}
        </div>

      </>
    ))
  );
}

export default Restaurant;
