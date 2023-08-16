import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import i18next, { t } from 'i18next';
// import { useTranslation } from 'react-i18next';
import Map from '../components/Map/Map';
import Title from '../components/Title/Title';
import CardList from '../components/CardList/CardList';
import Button from '../components/Button/Button';
import OverlayNewPlace from '../components/Overlay/OverlayNewPlace';

function Category({
  lat, lng,
}) {
  // const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState({});
  const [expendLatest, setExpendLatest] = useState(true);
  const [fullSize, setFullSize] = useState(false);
  const { REACT_APP_API_URL } = process.env;
  const { categorylabel } = useParams();
  const [newPlace, setNewPlace] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const [category, setCategory] = useState('');
  const [loadingCategory, setLoadingCategory] = useState(true);

  const getCategory = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/category`,
        headers: {
          Authorization: `Bearer ${token}`,
          categorylabel: categorylabel,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete CATEGORIES OK', result.data.category);
      setCategory(result.data.category);
      setLoadingCategory(false);
    }
    catch (error) {
      console.log('Requete CATEGORIES NOK', error);
    }
  };

  const getPlacesByCategory = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/placesbycategory`,
        headers: {
          Authorization: `Bearer ${token}`,
          categorylabel: categorylabel,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete PLACES BY CATEGORY OK', result.data.places);
      setPlaces(result.data.places);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete PLACES BY CATEGORY NOK', error);
    }
  };

  useEffect(() => {
    console.log(i18next.language);
    getCategory();
    getPlacesByCategory();
  }, []);
  // ! supprimer majuscule ?
  return (
    (!loading && (
    <>
      { newPlace && <OverlayNewPlace newPlace={newPlace} setNewPlace={setNewPlace} lat={lat} lng={lng} /> }

      <Map key={lat} zoomLevel={10} fullSize={fullSize} setFullSize={setFullSize} lat={lat} lng={lng} pins={places} />

      <div className="mt-8 mb-8">
        <Title caption={categorylabel.charAt(0).toUpperCase() + categorylabel.slice(1)} seeAll="places" classes="mb-4" expend={expendLatest} setExpend={setExpendLatest} />
        {!loading && <CardList data={places} type="Place" limit={2} expend={expendLatest} />}
      </div>
      {!loadingCategory
      && (
      <div className="relative p-6">
        <div onClick={() => setNewPlace(true)}>
          <Button type="accent" caption={`${t('add')} ${i18next.language === 'fr' || i18next.language === 'fr-FR' ? category.label_fr : category.label_en}`} classes="mt-8" />
        </div>
      </div>
      )}

    </>
    )
    ));
}

Category.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Category;
