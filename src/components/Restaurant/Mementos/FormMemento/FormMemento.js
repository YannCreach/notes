import { useDispatch, useSelector } from 'react-redux';
import { MdRestaurant } from 'react-icons/md';
import { AiOutlineBell } from 'react-icons/ai';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { actionChangeInputValue, actionChangeReminder } from '../../../../actions/field';
import Field from '../../../Field/Field';
import NavBtn from '../../../NavBtn/NavBtn';
import Button from '../../../Button/Button';
import {
  actionAddMemento, actionDeleteIdRestaurant, actionDeleteMemento, actionDropInputMemento, actionUpdateMemento,
} from '../../../../actions/memento';

function FormMemento() {
  const restaurantMemento = useSelector((state) => state.field.restaurantMemento);
  const restaurants = useSelector((state) => state.restaurant.restaurants);
  const addCommentMemento = useSelector((state) => state.field.addCommentMemento);
  // const addReminderSelected = useSelector((state) => state.field.addReminderSelected);
  const hiddenIdRestaurant = useSelector((state) => state.field.hiddenIdRestaurant);
  const nameMemento = useSelector((state) => state.field.nameMemento);
  const mementoSaved = useSelector((state) => state.memento.mementoSaved);
  const currentRestaurant = useSelector((state) => state.restaurant.currentRestaurant);

  const listRestaurant = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get idmemento for update memento
  const { idmemento, source } = useParams();
  // Update inputs when id memento exist
  useEffect(() => {
    if (idmemento) {
      dispatch(actionChangeInputValue(currentRestaurant.memento.find((item) => item.id === Number(idmemento)).name, 'nameMemento'));
      dispatch(actionChangeInputValue(currentRestaurant.name, 'restaurantMemento'));
      dispatch(actionChangeInputValue(currentRestaurant.id, 'hiddenIdRestaurant'));
      dispatch(actionChangeInputValue(currentRestaurant.memento.find((item) => item.id === Number(idmemento)).content, 'addCommentMemento'));
      dispatch(actionChangeInputValue(currentRestaurant.memento.find((item) => item.id === Number(idmemento)).reminder, 'addReminderSelected'));
    }
    else {
      dispatch(actionDropInputMemento());
      dispatch(actionDeleteIdRestaurant());
    }
    // use current restaurant.name and restaurant.id when add memento clicked
    if (currentRestaurant && source === 'restaurant') {
      dispatch(actionChangeInputValue(currentRestaurant.name, 'restaurantMemento'));
      dispatch(actionChangeInputValue(currentRestaurant.id, 'hiddenIdRestaurant'));
    }
  }, []);

  const getSlug = (datas, id) => {
    if (source === 'restaurant') {
      return currentRestaurant.slug;
    }
    const restaurant = datas.find((object) => object.id === Number(id));
    if (restaurant) {
      return restaurant.slug;
    }
    return currentRestaurant.slug;
  };

  useEffect(() => {
    if (mementoSaved) {
      navigate(`/restaurant/${getSlug(restaurants, hiddenIdRestaurant)}-${hiddenIdRestaurant}`);
      dispatch(actionDeleteIdRestaurant());
    }
  });
  const filteredRestaurant = restaurants.filter(
    (restaurant) => restaurant.name.toLowerCase().includes(restaurantMemento.toLowerCase()),
  );

  function clickRestaurant(event) {
    dispatch(actionChangeInputValue(event.target.dataset.id, 'hiddenIdRestaurant'));
    dispatch(actionChangeInputValue(event.target.innerText, 'restaurantMemento'));
    listRestaurant.current.style.display = 'none';
  }
  function displayList() {
    if (!idmemento) {
      listRestaurant.current.style.display = 'block';
    }
  }

  // function handleOptionChange(event) {
  //   dispatch(actionChangeReminder(Number(event.target.value)));
  // }

  function submitMemmento(event) {
    event.preventDefault();
    if (idmemento) {
      dispatch(actionUpdateMemento(hiddenIdRestaurant, idmemento));
    }
    else {
      dispatch(actionAddMemento(hiddenIdRestaurant));
    }
  }

  function clickDelete() {
    dispatch(actionDeleteMemento(idmemento));
  }

  return (
    <div className="text-lightTextColor dark:text-darkTextColor w-full px-6 pb-4">
      <NavBtn caption="Précédent" type="previous" order="iconFirst" target="/" />
      <p className="text-2xl text-lightTextColor dark:text-darkTextColor pb-4">{idmemento ? 'Modifier un Mémento' : 'Ajouter un Mémento'}</p>
      <form
        autoComplete="off"
        className="login-form-element flex flex-col items-center"
        onSubmit={(event) => {
          submitMemmento(event);
        }}
      >
        <div className="relative">
          <AiOutlineBell className="text-darkAccentColor text-3xl absolute left-10 z-10 h-10 top-2" />
          <Field
            type="text"
            name="nameMemento"
            placeholder="Nom du Memento"
            classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-80 mx-8 pl-12 mb-4"
            value={nameMemento}
            onChange={(newValue, name) => {
              dispatch(actionChangeInputValue(newValue, name));
            }}
          />
        </div>
        <div className="relative">
          <MdRestaurant className="text-darkAccentColor text-3xl absolute left-10 z-10 h-10 top-2" />
          <Field
            type="text"
            name="restaurantMemento"
            placeholder="Restaurant"
            classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor  py-4 w-80 mx-8 pl-12 mb-4"
            value={restaurantMemento}
            onChange={(newValue, name) => {
              if (!idmemento) {
                dispatch(actionChangeInputValue(newValue, name));
              } displayList();
            }}
          />
          <ul ref={listRestaurant} className="hidden absolute bg-[white] dark:bg-darkBackgroundAltColor z-10">
            {filteredRestaurant.map((restaurant) => (
              <li data-id={restaurant.id} key={restaurant.id} onClick={(event) => clickRestaurant(event)} className=" cursor-pointer border-b-2 border-darkAccentColor ">
                {restaurant.name} - {restaurant.location}
              </li>
            ))}
          </ul>
        </div>

        <input type="hidden" value={hiddenIdRestaurant} name="hiddenIdRestaurant" />
        <textarea
          name="addCommentMemento"
          placeholder="Votre commentaire"
          value={addCommentMemento}
          onChange={(event) => {
            dispatch(actionChangeInputValue(event.target.value, 'addCommentMemento'));
          }}
          className="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor dark:text-darkTextColor py-4 w-80 mx-8 pl-2 mb-4"
        />
        {/* <div>
          <label htmlFor="rappel0">
            <input
              type="radio"
              value="0"
              id="rappel0"
              checked={addReminderSelected === 0}
              onChange={(event) => handleOptionChange(event)}
            />
            Jamais
          </label>
          <label htmlFor="rappel1">
            <input
              type="radio"
              value="1"
              id="rappel1"
              checked={addReminderSelected === 1}
              onChange={(event) => handleOptionChange(event)}
            />
            Une fois
          </label>
          <label htmlFor="rappel2">
            <input
              type="radio"
              value="2"
              id="rappel2"
              checked={addReminderSelected === 2}
              onChange={(event) => handleOptionChange(event)}
            />
            Toujours
          </label>
        </div> */}
        <div className={idmemento ? 'flex justify-between w-80' : ''}>
          <button
            type="submit"
            className="login-form-button h-20 w-48"
          >
            <Button type="normal" caption="Sauvegarder" />
          </button>
          {idmemento
            && (
            <button
              type="button"
              className="delete-memento h-20 w-28"
              onClick={() => clickDelete()}
            >
              <Button type="danger" caption="Supprimer" />
            </button>
            )}
        </div>
      </form>
    </div>
  );
}

export default FormMemento;
