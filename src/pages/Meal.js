import { useContext, useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';
import { CapacitorHttp } from '@capacitor/core';
import NavBtn from '../components/NavBtn/NavBtn';
import Tag from '../components/Tag/Tag';
import mealPhoto from '../assets/images/mealPlaceholder.jpg';
import UserContext from '../context/UserContext';
import EditableText from '../components/EditableText/EditableText';
import { convertDate } from '../utils/utils';
import EditableTags from '../components/EditableTags/EditableTags';

function Meal() {
  const { user, setUser } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [meal, setMeal] = useState({});

  const getOneMeal = async () => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/meal`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
          mealid: Number(user.currentPage.split('-')[1]),
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete MEAL OK', result);
      setMeal(result.data[0]);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete MEAL NOK', error);
    }
  };

  const updateMeal = async () => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/meal`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
          mealid: Number(user.currentPage.split('-')[1]),
        },
        data: {

        },
      };

      const result = await CapacitorHttp.patch(options);

      console.log('Requete UPDATE RESTAURANT OK', result);
      setMeal(result.data[0]);
      setEditing(false);
    }
    catch (error) {
      console.log('Requete UPDATE RESTAURANT NOK', error);
    }
  };

  useEffect(() => {
    getOneMeal();
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

      <EditableText classes="text-2xl font-bold" value={meal.name} editing={editing} placeholder="Nom du plat" icon="information" />

      { meal.favorite && <HeartIcon className="mr-4" />}

      {/* { meal.tags
          && meal.tags.map((tag) => (
            <Tag caption={tag.label} key={tag.id} type="normal" />
          ))} */}

      { meal.tags && <EditableTags data={meal} editing={editing} /> }

      <EditableText classes="" value={meal.review} editing={editing} placeholder="Commentaire" icon="comment" />
      <div className="overflow-hidden rounded-md mt-4">
        <img src={meal.photo_url ? `${REACT_APP_API_URL}${meal.photo_url}` : `${mealPhoto}`} className={`object-cover h-48 w-full ${meal.photo_url ? '' : 'blur'}`} alt="mapPlaceholder" />
      </div>
      {!editing && <p className="pb-4 text-xs mt-4">Ajouté le {convertDate(meal.created_at)}{meal.updated_at && ` - Dernière modification le ${convertDate(meal.updated_at)}`}</p>}
    </div>
    ))
  );
}

export default Meal;
