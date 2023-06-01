import { useEffect, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { convertDate } from '../utils/utils';
import OverlayEditPlace from '../components/Overlay/OverlayEditPlace';
import Map from '../components/Map/Map';
import Title from '../components/Title/Title';
import Button from '../components/Button/Button';
import CardMeal from '../components/SingleCard/CardMeal';
import Icons from '../components/Icons/Icons';
import OverlayYelp from '../components/Overlay/OverlayYelp';
import OverlayNote from '../components/Overlay/OverlayNote';
import OverlayGoogle from '../components/Overlay/OverlayGoogle';
import Tag from '../components/Tag/Tag';

function Place() {
  const { t } = useTranslation();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const params = useParams();
  const split = params.slug.split('-');
  const placeId = parseInt(split[split.length - 1], 10);

  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState({});
  const [dummyPlace, setDummyPlace] = useState({});
  const [yelp, setYelp] = useState(false);
  const [google, setGoogle] = useState(false);
  const [noteIndex, setNoteIndex] = useState(-1);
  const [editing, setEditing] = useState(false);
  const [expendLatest, setExpendLatest] = useState(true);
  const [fullSize, setFullSize] = useState(false);
  const [dummyTags, setDummyTags] = useState([]);

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
      console.log('Requete PLACE OK', result.data);
      setPlace(result.data);
      setDummyPlace(result.data);
      setDummyTags(result.data.Tags);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete PLACE NOK', error);
    }
  };

  const deletePlace = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/place`,
        headers: {
          Authorization: `Bearer ${token}`,
          placeid: placeId,
        },
      };

      const deleted = await CapacitorHttp.delete(options);
      console.log('Requete DELETE PLACE OK', deleted);
      if (deleted.status === 200) navigate('/');
    }
    catch (error) {
      console.log('Requete DELETE PLACE NOK', error);
    }
  };

  useEffect(() => {
    getOnePlace();
  }, [noteIndex]);

  return (
    (!loading && (
      <>
        { editing && (
          <div className="inset-0 fixed flex justify-center items-center bg-[black]/75 z-40">
            <div className="bg-whiteVariantColor dark:bg-darkBackgroundColor rounded-lg w-4/5 md:w-3/5 lg:w-1/2 z-50 p-6">
              <OverlayEditPlace dummyPlace={dummyPlace} setDummyPlace={setDummyPlace} setEditing={setEditing} dummyTags={dummyTags} setDummyTags={setDummyTags} />
            </div>
            <div className="w-full h-full absolute z-0" onClick={() => setEditing(false)} />
          </div>
        )}
        { yelp && <OverlayYelp data={place.yelp} setYelp={setYelp} /> }
        { google && <OverlayGoogle data={place.google} setGoogle={setGoogle} /> }
        { noteIndex > -1 && <OverlayNote note={place.place_note[noteIndex]} setNoteIndex={setNoteIndex} /> }

        <Map zoomLevel={17} fullSize={fullSize} setFullSize={setFullSize} lat={place.latitude} lng={place.longitude} />

        <div className="text-lightTextColor dark:text-darkTextColor px-6 pb-4 flex flex-col">
          {/* <div className="flex mt-4">
            {place.yelp.categories?.map((tag) => <Tag caption={tag.title} key={tag.id} />)}
          </div> */}
          <div className="flex mt-4">
            {place.Tags?.map((tag) => <Tag caption={tag.label.toUpperCase()} key={tag.id} />)}
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-bold mb-2">{ place.name }</p>
            <div className="">
              {Array(place.rating).fill().map((_, index) => (<Icons icon="StarFull" classes="h-4 ml-1 text-lightAccentColor" key={index} />))}
            </div>
          </div>

          <div className="flex justify-between items-start">
            <div className="text-sm text-darkTextsubColor mt-2 w-1/2">
              {` ${place.address}`}
            </div>
            <div className="">
              {place.yelp && (
              <p className="text-xs text-darkTextsubColor mt-2 flex items-center justify-start cursor-pointer" onClick={() => setYelp(true)}>
                {t('see_data_from')}<span className="text-sm font-bold ml-1">yelp</span><Icons icon="Yelp" classes="ml-1 h-4 text-[red]" />
              </p>
              )}
              {place.google && (
              <p className="text-xs text-darkTextsubColor mt-2 flex items-center justify-start cursor-pointer" onClick={() => setGoogle(true)}>
                {t('see_data_from')}<span className="text-sm font-bold ml-1">Google</span><Icons icon="Pin" classes="ml-1 h-4 text-[#1374e9]" />
              </p>
              )}
            </div>
          </div>
        </div>

        <div className={`w-full ${fullSize ? 'h-0' : 'h-fit'} flex flex-col duration-700`}>
          {place.comment && (
            <div className="mt-6 mx-6 flex flex-col items-end">
              <p className="flex text-lightTextColor dark:text-darkTextColor bg-[white] dark:bg-darkBackgroundAltColor drop-shadow-lg p-3 rounded-lg w-full mb-2">
                { place.comment }
              </p>
              <p className="text-xs text-darkTextsubColor">
                {place.updated_at
                  ? `${t('description_modification_date')} ${convertDate(place.updated_at)}`
                  : `${t('description_added_date')} ${convertDate(place.created_at)}`}
              </p>
            </div>
          )}

          {place.place_note?.length > 0 && (
            <div className="">
              <Title caption={t('title_last_notes')} seeAll="lastest" classes="mt-6 mb-2" expend={expendLatest} setExpend={setExpendLatest} />
              {/* <CardList data={place.place_note} type="Meals" limit={2} expend={expendLatest} /> */}
              <div className="text-lightTextColor w-full dark:text-darkTextColor px-6">
                <ul className="grid gap-2 grid-cols-2">
                  {
                    place.place_note?.map((singleData, index) => (
                      <div onClick={() => setNoteIndex(index)}>
                        <CardMeal data={singleData} key={singleData.id} type="Meals" />
                      </div>
                    ))
                  }
                </ul>
              </div>
            </div>
          )}

          <div className="px-6">
            <Button type="accent" caption={t('button_add_note')} classes="mt-8" />
          </div>
          <div className="px-6" onClick={() => setEditing(true)}>
            <Button type="normal" caption={t('button_modify')} classes="mt-2" />
          </div>
          <div className="flex justify-center text-sm mt-4">
            <p className="mr-2">{t('dont_need_it')}</p>
            <p
              className="text-[red] cursor-pointer mb-4"
              onClick={() => confirm(t('confirm_delete_place')) && deletePlace()}
            >{t('button_delete_place')}
            </p>
          </div>
        </div>

      </>
    ))
  );
}

export default Place;
