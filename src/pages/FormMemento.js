import { MdPlace } from 'react-icons/md';
import { AiOutlineBell } from 'react-icons/ai';
import { useEffect, useRef } from 'react';

import Field from '../components/Field/Field';
import NavBtn from '../components/NavBtn/NavBtn';
import Button from '../components/Button/Button';

function FormMemento() {
  // const placeMemento = useSelector((state) => state.field.placeMemento);
  // const places = useSelector((state) => state.place.places);
  // const addCommentMemento = useSelector((state) => state.field.addCommentMemento);
  // const addReminderSelected = useSelector((state) => state.field.addReminderSelected);
  // const hiddenIdPlace = useSelector((state) => state.field.hiddenIdPlace);
  // const nameMemento = useSelector((state) => state.field.nameMemento);
  // const mementoSaved = useSelector((state) => state.memento.mementoSaved);
  // const currentPlace = useSelector((state) => state.place.currentPlace);

  const listPlace = useRef();

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // Get idmemento for update memento
  // const { idmemento, source } = useParams();
  // Update inputs when id memento exist
  useEffect(() => {
    if (idmemento) {
      // dispatch(actionChangeInputValue(currentPlace.memento.find((item) => item.id === Number(idmemento)).name, 'nameMemento'));
      // dispatch(actionChangeInputValue(currentPlace.name, 'placeMemento'));
      // dispatch(actionChangeInputValue(currentPlace.id, 'hiddenIdPlace'));
      // dispatch(actionChangeInputValue(currentPlace.memento.find((item) => item.id === Number(idmemento)).content, 'addCommentMemento'));
      // dispatch(actionChangeInputValue(currentPlace.memento.find((item) => item.id === Number(idmemento)).reminder, 'addReminderSelected'));
    }
    else {
      // dispatch(actionDropInputMemento());
      // dispatch(actionDeleteIdPlace());
    }
    // use current place.name and place.id when add memento clicked
    // if (currentPlace && source === 'place') {
    //   dispatch(actionChangeInputValue(currentPlace.name, 'placeMemento'));
    //   dispatch(actionChangeInputValue(currentPlace.id, 'hiddenIdPlace'));
    // }
  }, []);

  const getSlug = (datas, id) => {
    if (source === 'place') {
      return currentPlace.slug;
    }
    const place = datas.find((object) => object.id === Number(id));
    if (place) {
      return place.slug;
    }
    return currentPlace.slug;
  };

  useEffect(() => {
    if (mementoSaved) {
      navigate(`/place/${getSlug(places, hiddenIdPlace)}-${hiddenIdPlace}`);
      dispatch(actionDeleteIdPlace());
    }
  });
  const filteredPlace = places.filter(
    (place) => place.name.toLowerCase().includes(placeMemento.toLowerCase()),
  );

  function clickPlace(event) {
    dispatch(actionChangeInputValue(event.target.dataset.id, 'hiddenIdPlace'));
    dispatch(actionChangeInputValue(event.target.innerText, 'placeMemento'));
    listPlace.current.style.display = 'none';
  }
  function displayList() {
    if (!idmemento) {
      listPlace.current.style.display = 'block';
    }
  }

  // function handleOptionChange(event) {
  //   dispatch(actionChangeReminder(Number(event.target.value)));
  // }

  function submitMemmento(event) {
    event.preventDefault();
    if (idmemento) {
      dispatch(actionUpdateMemento(hiddenIdPlace, idmemento));
    }
    else {
      dispatch(actionAddMemento(hiddenIdPlace));
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
          <MdPlace className="text-darkAccentColor text-3xl absolute left-10 z-10 h-10 top-2" />
          <Field
            type="text"
            name="placeMemento"
            placeholder="Place"
            classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor  py-4 w-80 mx-8 pl-12 mb-4"
            value={placeMemento}
            onChange={(newValue, name) => {
              if (!idmemento) {
                dispatch(actionChangeInputValue(newValue, name));
              } displayList();
            }}
          />
          <ul ref={listPlace} className="hidden absolute bg-[white] dark:bg-darkBackgroundAltColor z-10">
            {filteredPlace.map((place) => (
              <li data-id={place.id} key={place.id} onClick={(event) => clickPlace(event)} className=" cursor-pointer border-b-2 border-darkAccentColor ">
                {place.name} - {place.location}
              </li>
            ))}
          </ul>
        </div>

        <input type="hidden" value={hiddenIdPlace} name="hiddenIdPlace" />
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
