import PropTypes from 'prop-types';
import { t } from 'i18next';
import { CapacitorHttp } from '@capacitor/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import Button from '../Button/Button';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import EditableFavorite from '../EditableFavorite/EditableFavorite';

function OverlayNote({ note, setNoteIndex }) {
  const [currentNote, setCurrentNote] = useState(note);
  const { getAccessTokenSilently } = useAuth0();
  const [name, setName] = useState(currentNote.name);
  const [price, setPrice] = useState(currentNote.price);
  const [option, setOption] = useState(currentNote.option);
  const [favorite, setFavorite] = useState(currentNote.favorite);
  const [comment, setComment] = useState(currentNote.comment);
  const [cover, setCover] = useState(currentNote.cover);
  const [editing, setEditing] = useState(false);

  const { REACT_APP_API_URL } = process.env;

  const updateNote = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/note`,
        headers: {
          Authorization: `Bearer ${token}`,
          noteid: currentNote.id,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          name: name,
          price: price,
          comment: comment,
          cover: cover,
        },
      };

      const result = await CapacitorHttp.patch(options);

      console.log('Requete UPDATE RESTAURANT OK', result);
      // setRestaurant({
      //   ...restaurant,
      //   name: dummy.name,
      //   location: dummy.location,
      //   photo_url: dummy.photo_url,
      // });
    }
    catch (error) {
      console.log('Requete UPDATE RESTAURANT NOK', error);
    }
  };

  return (
    <div className="w-full h-full absolute left-0 flex justify-center items-center bg-[black]/75 z-40" onClick={() => setNoteIndex(-1)}>
      <div className="bg-whiteVariantColor dark:bg-darkBackgroundColor rounded-lg w-64 md:w-80 lg:w-96">

        {cover && (<ImageCarousel imageUrls={cover} />)}

        <div className="p-6">

          <div className="flex items-center justify-between">
            <div className="text-lightTextColor dark:text-darkTextColor font-bold text-xl">
              {name}
            </div>
            <EditableFavorite favorite={favorite} setFavorite={setFavorite} currentNote={currentNote} type="note" />
          </div>

          {/* <div className="flex">
            {price && (<p className="mr-3">{`${t('Price')}: ${price}`}</p>)}
          </div> */}

          {option && (
          <>
            <p className="text-xs text-darkTextsubColor mb-2 mt-6">{t('Option')}</p>
            <div className="text-sm  bg-[white] drop-shadow-lg p-3 rounded-lg">
              {option}
            </div>
          </>
          )}

          {price && (
            <>
              <p className="text-xs text-darkTextsubColor mb-2 mt-6">{t('Price')}</p>
              <div className="text-sm  bg-[white] drop-shadow-lg p-3 rounded-lg">
                {price}
              </div>
            </>
          )}

          {comment && (
            <>
              <p className="text-xs text-darkTextsubColor mb-2 mt-6">{t('My_Comment')}</p>
              <div className="text-sm  bg-[white] drop-shadow-lg p-3 rounded-lg">
                {comment}
              </div>
            </>
          )}

          <div className="relative" onClick={() => setNoteIndex(-1)}>
            <Button type="accent" caption={t('button_previous')} classes="mt-8" />
          </div>
          <div className="relative" onClick={() => setNoteIndex(-1)}>
            <Button type="normal" caption={t('button_modify')} classes="mt-2" />
          </div>

          <div className="flex justify-center text-sm mt-4">
            <p className="text-[red] cursor-pointer mb-4" onClick={() => {}}>{t('button_delete_note')}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

OverlayNote.propTypes = {
  note: PropTypes.object.isRequired,
  setNoteIndex: PropTypes.func.isRequired,
};

export default OverlayNote;
