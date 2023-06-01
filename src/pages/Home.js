import PropTypes from 'prop-types';
import { CapacitorHttp } from '@capacitor/core';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import CardList from '../components/CardList/CardList';
import Title from '../components/Title/Title';
import Map from '../components/Map/Map';
import Button from '../components/Button/Button';
import OverlayNewPlace from '../components/Overlay/OverlayNewPlace';

function Home({
  lat, lng,
}) {
  const { t } = useTranslation();
  const { REACT_APP_API_URL } = process.env;
  const [categories, setCategories] = useState('');
  const [latest, setLatest] = useState([]);
  const [expendCategory, setExpendCategory] = useState(true);
  const [expendLatest, setExpendLatest] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [fullSize, setFullSize] = useState(false);
  const [newPlace, setNewPlace] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  // const getAllPlaces = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const options = {
  //       url: `${REACT_APP_API_URL}/places`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     const result = await CapacitorHttp.get(options);

  //     console.log('Requete PLACES OK', result);
  //     setData(result.data.places);
  //     setLoading(loading + 1);
  //   }
  //   catch (error) {
  //     console.log('Requete PLACES NOK', error);
  //   }
  // };

  const getAllCategories = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/categories`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete CATEGORIES OK', result);
      setCategories(result.data.categories);
      setLoadingCategories(false);
    }
    catch (error) {
      console.log('Requete CATEGORIES NOK', error);
    }
  };

  const getLatestplaces = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/latestplaces`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete LATEST OK', result);
      setLatest(result.data.places);
      setLoadingLatest(false);
    }
    catch (error) {
      console.log('Requete LATEST NOK', error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getLatestplaces();
  }, []);

  return (
    <>
      { newPlace && <OverlayNewPlace setNewPlace={setNewPlace} lat={lat} lng={lng} /> }

      {lng && <Map key={lat} zoomLevel={10} lat={lat} lng={lng} fullSize={fullSize} setFullSize={setFullSize} pins={latest} />}

      {!fullSize && (
        <>
          <div className="">
            <Title caption={t('title_categories')} seeAll="Categories" classes="mt-8 mb-4" expend={expendCategory} setExpend={setExpendCategory} />
            {!loadingCategories && <CardList data={categories} type="Categories" limit={3} expend={expendCategory} />}
          </div>

          <div className="">
            <Title caption={t('title_last_added')} seeAll="lastest" classes="mt-12 mb-4" expend={expendLatest} setExpend={setExpendLatest} />
            {!loadingLatest && <CardList data={latest} type="Place" limit={2} expend={expendLatest} />}
          </div>
        </>
      )}

      <div className="relative p-6">
        <div onClick={() => setNewPlace(true)}>
          <Button type="accent" caption={t('button_add_place')} classes="mt-8" />
        </div>
      </div>

    </>
  );
}

Home.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Home;
