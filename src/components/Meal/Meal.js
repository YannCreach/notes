import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { actionGetOneRestaurant } from '../../actions/restaurantActions';
import NavBtn from '../NavBtn/NavBtn';
import Tag from '../Tag/Tag';
import mealPhoto from '../../assets/images/mealPlaceholder.jpg';

function Meal() {
  const params = useParams();
  const restaurantSplit = params.restaurantSlug.split('-');
  const restaurantId = parseInt(restaurantSplit[restaurantSplit.length - 1], 10);
  const mealSplit = params.mealSlug.split('-');
  const mealId = parseInt(mealSplit[mealSplit.length - 1], 10);
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.currentRestaurant);
  const fetchingOneRestaurant = useSelector((state) => state.restaurant.fetchingOneRestaurant);
  let data = '';
  const { REACT_APP_API_URL } = process.env;
  if (restaurant) {
    data = restaurant.meal.find((singleMeal) => singleMeal.id === mealId);
  }

  useEffect(() => {
    dispatch(actionGetOneRestaurant(restaurantId));
  }, []);

  return (
    (!fetchingOneRestaurant && (
    <>
      <div className="px-6 pb-4 text-lightTextColor dark:text-darkTextColor">
        <div className="w-full flex justify-between items-center">
          <NavBtn caption="Précédent" type="previous" order="iconFirst" target={`../restaurant/${params.restaurantSlug}`} />
          <NavBtn caption="Modifier" type="edit" order="captionFirst" target="./edit" />
        </div>
        <div className="topLane flex justify-left items-baseline pb-4 font-bold">
          { data.favorite
          && <BsHeartFill className="mr-4" />}
          <p className="text-2xl">{data.name}</p>
        </div>

        <div className="text-sm pb-4">
          { data.tags
            ? data.tags.map((tag) => (
              <Tag caption={tag.label} key={tag.id} type="normal" />
            ))
            : ''}
        </div>
        <p className="pb-4 text-sm">Ajouté le {data.created_at}</p>
        <div className="overflow-hidden rounded-md">
          <img src={data.photo_url ? `${REACT_APP_API_URL}${data.photo_url}` : `${mealPhoto}`} className={`object-cover h-48 w-full ${data.photo_url ? '' : 'blur'}`} alt="mapPlaceholder" />

        </div>
      </div>

      <div className="flex px-6 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card ">
        <p className="text-lightTextColor dark:text-darkTextColor border-lightAccentColor dark:border-darkAccentColor mr-5 pb-2 border-b-2">
          Commentaire
        </p>
      </div>

      <div className="flex flex-col flex-grow justify-between pt-8 px-8 text-lightTextColor dark:text-darkTextColor">
        {data.review}
      </div>

    </>
    ))
  );
}

export default Meal;
