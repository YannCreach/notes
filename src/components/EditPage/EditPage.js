import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdRestaurant } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import {
  actionGetOneRestaurant, actionDeleteRestaurantOrMeal,
  actionSetEditingDummy, actionUpdateDummy,
  actionGetAllTags, actionCreateUpdateRestaurantOrMeal, actionAutocomplete, actionToggleSuggestions,
  actionStoreInputAutocomplete, actionRedirect, actionToggleDrawer,
} from '../../actions/restaurantActions';
import {
  actionUploadImg, actionClearPreview,
} from '../../actions/upload';
import NavBtn from '../NavBtn/NavBtn';
import Favorite from '../Favorite/Favorite';
import Button from '../Button/Button';
import Field from '../Field/Field';
import FileUpload from '../FileUpload/FileUpload';
import EditTags from '../EditTags/EditTags';
import { slugify } from '../../utils/utils';

function EditPage({ type, addOrEdit }) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restaurant = useSelector((state) => state.restaurant.currentRestaurant);
  const fetchingOneRestaurant = useSelector((state) => state.restaurant.fetchingOneRestaurant);
  const editingDummy = useSelector((state) => state.restaurant.editingDummy);
  const file = useSelector((state) => state.upload.file);
  const actionDeleted = useSelector((state) => state.restaurant.actionDeleted);
  const filteredSuggestions = useSelector((state) => state.restaurant.filteredSuggestions);
  const showSuggestions = useSelector((state) => state.restaurant.showSuggestions);
  const dataSaved = useSelector((state) => state.restaurant.dataSaved);
  const idRestaurantAdded = useSelector((state) => state.restaurant.idRestaurantAdded);
  const currentRestaurant = useSelector((state) => state.restaurant.currentRestaurant);

  let data;
  let restaurantSplit;
  let mealSplit;
  let mealId;
  let restaurantid;

  if (params.restaurantSlug) {
    restaurantSplit = params.restaurantSlug.split('-');
    restaurantid = parseInt(restaurantSplit[restaurantSplit.length - 1], 10);
  }

  useEffect(() => {
    if (actionDeleted || dataSaved) {
      if (type === 'restaurant' && actionDeleted) {
        navigate('/');
      }
      else if (idRestaurantAdded) {
        navigate(`/restaurant/${slugify(editingDummy.name)}-${idRestaurantAdded}/`);
      }
      else {
        navigate(`/restaurant/${currentRestaurant.slug}-${currentRestaurant.id}/`);
        console.log('redirect');
      }
      dispatch(actionRedirect(false));
    }
  });

  useEffect(() => {
    if (addOrEdit === 'edit') dispatch(actionGetOneRestaurant(restaurantid));
    dispatch(actionGetAllTags(type));
    dispatch(actionToggleSuggestions(false));
    dispatch(actionToggleDrawer(false));
    dispatch(actionClearPreview());
  }, []);

  if (addOrEdit === 'edit') {
    if (type === 'restaurant') {
      if (!fetchingOneRestaurant) {
        data = useSelector((state) => state.restaurant.currentRestaurant);
      }
    }
    else {
      mealSplit = params.mealSlug.split('-');
      mealId = parseInt(mealSplit[mealSplit.length - 1], 10);
      if (!fetchingOneRestaurant) {
        data = restaurant.meal.find((singleMeal) => singleMeal.id === mealId);
      }
    }
  }
  else {
    data = useSelector((state) => state.restaurant.dummy);
    if (type === 'meal') data.restaurantId = params.idrestaurant;
  }

  useEffect(() => {
    dispatch(actionSetEditingDummy(data));
  }, [restaurant]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
      dispatch(actionUploadImg(formData, type, editingDummy.id, addOrEdit));
    }
    else {
      dispatch(actionCreateUpdateRestaurantOrMeal(type, addOrEdit));
    }
  };

  return (
    (editingDummy && (
    <div className="px-6 pb-4 text-lightTextColor dark:text-darkTextColor h-full overflow-y-scroll">
      <div className="w-full flex justify-between items-center">
        <NavBtn caption="Précédent" type="previous" order="iconFirst" target={addOrEdit === 'edit' ? './../' : '/'} />
        <div onClick={() => dispatch(actionUpdateDummy(!editingDummy.favorite, 'favorite'))}>
          <Favorite data={editingDummy.favorite} />
        </div>
      </div>

      <div className="relative">
        <MdRestaurant className="text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />
        <Field
          type="text"
          name="name"
          placeholder={editingDummy.name}
          classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-full pr-8 pl-12 mb-4"
          value={editingDummy.name}
          onChange={(event) => {
            dispatch(actionUpdateDummy(event, 'name'));
            dispatch(actionUpdateDummy(slugify(event), 'slug'));
          }}
        />
      </div>
      <div className="relative">
        {(type === 'restaurant')
          ? <HiOutlineLocationMarker className="text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />
          : <BiCommentDetail className="text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />}
        <Field
          type="text"
          name={type === 'restaurant' ? 'location' : 'review'}
          classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-full pr-8 pl-12 mb-4"
          value={type === 'restaurant' ? editingDummy.location : editingDummy.review}
          onChange={type === 'restaurant'
            ? (event) => {
              dispatch(actionStoreInputAutocomplete(event));
              dispatch(actionAutocomplete(event));
            }
            : (event) => {
              dispatch(actionUpdateDummy(event, 'review'));
            }}
        />
        {showSuggestions && (
        <ul className="w-100 bg-[white] dark:bg-darkBackgroundAltColor rounded-md p-4 pl-12 shadow-md w-full mb-4 -mt-6">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion.properties.id}
              className="text-md hover:font-bold hover:cursor-pointer"
              onClick={(event) => {
                dispatch(actionStoreInputAutocomplete(event.target.innerText));
                dispatch(actionToggleSuggestions(false));
              }}
            >
              {suggestion.properties.label}
            </li>
          ))}
        </ul>
        )}
      </div>

      <div className="text-sm pb-4 flex flex-wrap">
        <EditTags />
      </div>

      <FileUpload type="restaurant" />
      <div
        onClick={((event) => {
          dispatch(handleSubmit(event));
        })}
        className="w-full"
      >
        <Button type="normal" caption="Valider les modifications" className="text-2xl absolute bottom-0 w-full" url="#" />
      </div>
      <div
        onClick={() => (confirm('Attention, cette action est irreversible') ? dispatch(dispatch(actionDeleteRestaurantOrMeal(type))) : '')}
        className="w-full"
      >
        <Button type="danger" caption={`Supprimer ce ${type === 'restaurant' ? 'restaurant' : 'plat'}`} className="text-2xl absolute bottom-0" url="#" />
      </div>
    </div>
    ))
  );
}

EditPage.propTypes = {
  type: PropTypes.string.isRequired,
  addOrEdit: PropTypes.string.isRequired,
};

export default EditPage;
