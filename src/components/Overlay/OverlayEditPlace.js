import PropTypes from 'prop-types';
import { useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import { useAuth0 } from '@auth0/auth0-react';
import { t } from 'i18next';
import Icons from '../Icons/Icons';
import Button from '../Button/Button';
import EditableTags from '../EditableTags/EditableTags';

function OverlayCreateEdit({
  dummyPlace, setDummyPlace, setEditing, setDummyTags, dummyTags,
}) {
  const { REACT_APP_API_URL } = process.env;
  const { getAccessTokenSilently } = useAuth0();

  const [cat, setCat] = useState('');
  const [catId, setCatId] = useState(dummyPlace.category_id);
  const [allCats, setAllCats] = useState([]);
  const [loadCat, setLoadCat] = useState(true);
  const [slug, setSlug] = useState(dummyPlace.slug);
  // const [googleid, setGoogleid] = useState('');
  const [loading, setLoading] = useState(true);

  const submitModifications = async (event) => {

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

  const catHandler = async (event) => {
    setCat(event);
    setCatId(allCats.find((element) => element.label === event).id);
  };

  const cancelModifications = () => setEditing(false);

  return (
    <>
      <p className="text-2xl font-bold mb-2">{dummyPlace.name}</p>
      <p className="text-sm mb-6">{dummyPlace.address}</p>

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
        <EditableTags tags={dummyTags} setTags={setDummyTags} cat={cat} />
      </div>

      <label htmlFor="comment-input" className="label-custom">{t('Comment')}
        <textarea
          id="comment-input"
          type="text"
          value={dummyPlace.comment}
          className="input-custom mb-6"
          onChange={(event) => setDummyPlace({ ...dummyPlace, comment: event.target.value })}
        />
      </label>
      <div className="flex gap-4 w-full">
        <div className="grow">
          <p className="">Note</p>
          <div className="flex justify-between bg-[white] dark:bg-darkBackgroundAltColor rounded drop-shadow-md py-2 px-2 mt-1">
            <div onClick={() => setDummyPlace({ ...dummyPlace, rating: 1 })}><Icons icon={dummyPlace.rating > 0 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
            <div onClick={() => setDummyPlace({ ...dummyPlace, rating: 2 })}><Icons icon={dummyPlace.rating > 1 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
            <div onClick={() => setDummyPlace({ ...dummyPlace, rating: 3 })}><Icons icon={dummyPlace.rating > 2 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
            <div onClick={() => setDummyPlace({ ...dummyPlace, rating: 4 })}><Icons icon={dummyPlace.rating > 3 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
            <div onClick={() => setDummyPlace({ ...dummyPlace, rating: 5 })}><Icons icon={dummyPlace.rating > 4 ? 'StarFull' : 'StarEmpty'} classes="h-6 text-lightAccentColor" /></div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="">{t('Favorite')}</p>
          <div className="flex justify-center bg-[white] dark:bg-darkBackgroundAltColor rounded drop-shadow-md py-2 px-4 w-full mt-1">
            <div onClick={() => setDummyPlace({ ...dummyPlace, favorite: !dummyPlace.favorite })}>
              <Icons icon={!dummyPlace.favorite ? 'HeartEmpty' : 'Heart'} classes="h-6 text-lightAccentColor" />
            </div>
          </div>
        </div>

      </div>

      <div className="relative" onClick={() => submitModifications()}>
        <Button type="accent" caption={t('button_done')} classes="mt-8" />
      </div>
      <div className="relative" onClick={() => setEditing(false)}>
        <Button type="normal" caption={t('button_cancel')} classes="mt-4" />
      </div>
    </>
  );
}

OverlayCreateEdit.propTypes = {
  dummyPlace: PropTypes.object.isRequired,
  setEditing: PropTypes.func.isRequired,
  setDummyPlace: PropTypes.func.isRequired,
  setDummyTags: PropTypes.array.isRequired,
  dummyTags: PropTypes.func.isRequired,
};

export default OverlayCreateEdit;
