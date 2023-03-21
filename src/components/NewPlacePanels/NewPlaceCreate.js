import { t } from 'i18next';
import PropTypes from 'prop-types';
import { CapacitorHttp } from '@capacitor/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Icons from '../Icons/Icons';
import EditableTags from '../EditableTags/EditableTags';
import { slugify } from '../../utils/utils';

function OverlayNewPlaceCreate({ validId, setPanel }) {
  const { getAccessTokenSilently } = useAuth0();
  const { REACT_APP_API_URL } = process.env;

  const [place, setPlace] = useState({});
  const [name, setName] = useState('');
  const [cat, setCat] = useState('');
  const [catId, setCatId] = useState('');
  const [allCats, setAllCats] = useState([]);
  const [loadCat, setLoadCat] = useState(true);
  const [address, setAddress] = useState('');
  // const [streetNumber, setStreetNumber] = useState('');
  // const [route, setRoute] = useState('');
  // const [city, setCity] = useState('');
  // const [zip, setZip] = useState('');
  const [slug, setSlug] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [cover, setCover] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [googleid, setGoogleid] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const createPlace = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/place`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          name: name,
          address: address,
          comment: comment,
          cover: cover,
          category_id: catId,
          latitude: latitude,
          longitude: longitude,
          rating: rating,
          slug: slug,
          // street_number: streetNumber,
          // route: route,
          // city: city,
          // zip: zip,
          favorite: favorite,
          googleid: googleid,
        },
      };

      const result = await CapacitorHttp.post(options);

      console.log('Requete CREATE PLACE OK', result);
    }
    catch (error) {
      console.log('Requete CREATE PLACE NOK', error);
    }
  };

  const getActualCategory = async () => {
    // const actualCat = result.data.categories.find((category) => category.label.toLowerCase() === validId.types[0].toLowerCase());
    // const actualCategory = allCats.find((objet) => place.types.includes(objet.label));
    const actualCategory = allCats.find((objet) => place.types.some((str) => str.toLowerCase() === objet.label.toLowerCase()));
    setCat(actualCategory.label);
    setCatId(actualCategory.id);
  };

  const getCategories = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/categories`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await CapacitorHttp.get(options);
      console.log('Requete GET ALL CATS OK', result.data.categories);
      setAllCats(result.data.categories);
      setLoadCat(false);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete GET ALL CATS NOK', error);
    }
  };

  const getPlaceDetails = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/getplacedetails`,
        headers: {
          Authorization: `Bearer ${token}`,
          place_id: validId,
        },
      };
      const result = await CapacitorHttp.get(options);
      console.log('Requete GET PLACE DETAILS OK', result.data);
      setPlace(result.data);
      setName(result.data.name);
      setAddress(result.data.formatted_address);
      // setStreetNumber(result.data.address_components.find((obj) => obj.types.includes('street_number')).long_name);
      // setRoute(result.data.address_components.find((obj) => obj.types.includes('route')).long_name);
      // setCity(result.data.address_components.find((obj) => obj.types.includes('locality')).long_name);
      // setZip(result.data.address_components.find((obj) => obj.types.includes('postal_code')).long_name);
      setLatitude(result.data.geometry.location.lat);
      setLongitude(result.data.geometry.location.lng);
      setCover('');
      setSlug(slugify(result.data.name));
      setGoogleid(result.data.place_id);

      getCategories();
    }
    catch (error) {
      console.log('Requete GET PLACE DETAILS NOK', error);
    }
  };

  const catHandler = async (event) => {
    setCat(event);
    setCatId(allCats.find((element) => element.label === event).id);
  };

  useEffect(() => {
    getPlaceDetails();
  }, []);

  useEffect(() => {
    getActualCategory();
  }, [allCats]);

  return (
    !loading && (
    <>
      <p className="text-2xl font-bold mb-2">{name}</p>
      <p className="text-sm mb-6">{address}</p>

      <label htmlFor="cat-input" className="label-custom">{t('Category')}
        <select
          id="cat-input"
          type="text"
          value={cat}
          className="input-custom mb-6"
          onChange={(event) => catHandler(event.target.value)}
        >
          {!loadCat && allCats.map((category, index) => (<option key={index}>{category.label}</option>))}
        </select>
      </label>

      <div className="text-lightTextColor dark:text-darkTextColor mb-6">Tags
        <EditableTags tags={tags} setTags={setTags} cat={cat} />
      </div>

      <label htmlFor="comment-input" className="label-custom">{t('Comment')}
        <textarea
          id="comment-input"
          type="text"
          value={comment}
          className="input-custom mb-6"
          onChange={(event) => setComment(event.target.value)}
        />
      </label>
      <div className="flex gap-4 w-full">
        <div className="grow">
          <p className="">Note</p>
          <div className="flex justify-between bg-[white] dark:bg-darkBackgroundAltColor rounded drop-shadow-md py-2 px-2 mt-1">
            <div onClick={() => setRating(1)}><Icons icon={rating > 0 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
            <div onClick={() => setRating(2)}><Icons icon={rating > 1 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
            <div onClick={() => setRating(3)}><Icons icon={rating > 2 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
            <div onClick={() => setRating(4)}><Icons icon={rating > 3 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
            <div onClick={() => setRating(5)}><Icons icon={rating > 4 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="">{t('Favorite')}</p>
          <div className="flex justify-center bg-[white] dark:bg-darkBackgroundAltColor rounded drop-shadow-md py-2 px-4 w-full mt-1">
            <div onClick={() => setFavorite(!favorite)}>
              <Icons icon={!favorite ? 'HeartEmpty' : 'Heart'} classes="h-6 text-lightAccentColor" />
            </div>
          </div>
        </div>

      </div>

      <div className="relative" onClick={() => createPlace()}>
        <Button type="accent" caption={t('button_done')} classes="mt-8" />
      </div>
      <div className="relative" onClick={() => setPanel(0)}>
        <Button type="normal" caption={t('button_cancel')} classes="mt-4" />
      </div>
    </>
    )
  );
}

OverlayNewPlaceCreate.propTypes = {
  validId: PropTypes.string.isRequired,
  setPanel: PropTypes.func.isRequired,
};

export default OverlayNewPlaceCreate;
