import { useContext, useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';
import { CapacitorHttp } from '@capacitor/core';
import NavBtn from '../components/NavBtn/NavBtn';
import Tag from '../components/Tag/Tag';
import notePhoto from '../assets/images/notePlaceholder.jpg';
import UserContext from '../context/UserContext';
import EditableText from '../components/EditableText/EditableText';
import { convertDate } from '../utils/utils';
import EditableTags from '../components/EditableTags/EditableTags';

function Note() {
  const { user, setUser } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState({});

  const getOneNote = async () => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/note`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
          noteid: Number(user.currentPage.split('-')[1]),
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete NOTE OK', result);
      setNote(result.data[0]);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete NOTE NOK', error);
    }
  };

  const updateNote = async () => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/note`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
          noteid: Number(user.currentPage.split('-')[1]),
        },
        data: {

        },
      };

      const result = await CapacitorHttp.patch(options);

      console.log('Requete UPDATE PLACE OK', result);
      setNote(result.data[0]);
      setEditing(false);
    }
    catch (error) {
      console.log('Requete UPDATE PLACE NOK', error);
    }
  };

  useEffect(() => {
    getOneNote();
  }, []);

  return (
    (!loading && (
    <div className="px-6 pb-4 text-lightTextColor dark:text-darkTextColor">
      <div className="w-full flex justify-between items-center">
        {editing
          ? (
            <>
              <NavBtn caption="Annuler" icon="cancel" order="iconFirst" target="" editing={editing} setEditing={setEditing} />
              <NavBtn caption="Valider" icon="check" order="captionFirst" target="" editing={editing} setEditing={setEditing} />
            </>
          )
          : (
            <>
              <NavBtn caption="Précédent" icon="previous" order="iconFirst" target="home" />
              <NavBtn caption="Modifier" icon="edit" order="captionFirst" editing={editing} setEditing={setEditing} />
            </>
          )}
      </div>

      <EditableText classes="text-2xl font-bold" value={note.name} editing={editing} placeholder="Nom du plat" icon="information" />

      { note.favorite && <HeartIcon className="mr-4" />}

      {/* { note.tags
          && note.tags.map((tag) => (
            <Tag caption={tag.label} key={tag.id} type="normal" />
          ))} */}

      { note.tags && <EditableTags data={note} editing={editing} /> }

      <EditableText classes="" value={note.review} editing={editing} placeholder="Commentaire" icon="comment" />
      <div className="overflow-hidden rounded-md mt-4">
        <img src={note.photo_url ? `${REACT_APP_API_URL}${note.photo_url}` : `${notePhoto}`} className={`object-cover h-48 w-full ${note.photo_url ? '' : 'blur'}`} alt="mapPlaceholder" />
      </div>
      {!editing && <p className="pb-4 text-xs mt-4">Ajouté le {convertDate(note.created_at)}{note.updated_at && ` - Dernière modification le ${convertDate(note.updated_at)}`}</p>}
    </div>
    ))
  );
}

export default Note;
