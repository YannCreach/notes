import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdPlace } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import NavBtn from '../components/NavBtn/NavBtn';
import Favorite from '../components/Favorite/Favorite';
import Button from '../components/Button/Button';
import Field from '../components/Field/Field';
import FileUpload from '../components/FileUpload/FileUpload';
import EditTags from '../components/EditTags/EditTags';
import { slugify } from '../utils/utils';

function EditPage({ type, addOrEdit }) {
  const params = useParams();
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const place = useSelector((state) => state.place.currentPlace);
  // const fetchingOnePlace = useSelector((state) => state.place.fetchingOnePlace);
  // const editingDummy = useSelector((state) => state.place.editingDummy);
  // const file = useSelector((state) => state.upload.file);
  // const actionDeleted = useSelector((state) => state.place.actionDeleted);
  // const filteredSuggestions = useSelector((state) => state.place.filteredSuggestions);
  // const showSuggestions = useSelector((state) => state.place.showSuggestions);
  // const dataSaved = useSelector((state) => state.place.dataSaved);
  // const idPlaceAdded = useSelector((state) => state.place.idPlaceAdded);
  // const currentPlace = useSelector((state) => state.place.currentPlace);

  let data;
  let placeSplit;
  let noteSplit;
  let noteId;
  let placeid;

  if (params.placeSlug) {
    placeSplit = params.placeSlug.split('-');
    placeid = parseInt(placeSplit[placeSplit.length - 1], 10);
  }

  useEffect(() => {
    if (actionDeleted || dataSaved) {
      if (type === 'place' && actionDeleted) {
        navigate('/');
      }
      else if (idPlaceAdded) {
        navigate(`/place/${slugify(editingDummy.name)}-${idPlaceAdded}/`);
      }
      else {
        navigate(`/place/${currentPlace.slug}-${currentPlace.id}/`);
        console.log('redirect');
      }
      dispatch(actionRedirect(false));
    }
  });

  useEffect(() => {
    if (addOrEdit === 'edit') dispatch(actionGetOnePlace(placeid));
    dispatch(actionGetAllTags(type));
    dispatch(actionToggleSuggestions(false));
    dispatch(actionToggleDrawer(false));
    dispatch(actionClearPreview());
  }, []);

  if (addOrEdit === 'edit') {
    if (type === 'place') {
      if (!fetchingOnePlace) {
        data = useSelector((state) => state.place.currentPlace);
      }
    }
    else {
      noteSplit = params.noteSlug.split('-');
      noteId = parseInt(noteSplit[noteSplit.length - 1], 10);
      if (!fetchingOnePlace) {
        data = place.note.find((singleNote) => singleNote.id === noteId);
      }
    }
  }
  else {
    data = useSelector((state) => state.place.dummy);
    if (type === 'note') data.placeId = params.idplace;
  }

  useEffect(() => {
    dispatch(actionSetEditingDummy(data));
  }, [place]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
      dispatch(actionUploadImg(formData, type, editingDummy.id, addOrEdit));
    }
    else {
      dispatch(actionCreateUpdatePlaceOrNote(type, addOrEdit));
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
        <MdPlace className="text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />
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
        {(type === 'place')
          ? <HiOutlineLocationMarker className="text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />
          : <BiCommentDetail className="text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />}
        <Field
          type="text"
          name={type === 'place' ? 'location' : 'review'}
          classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-full pr-8 pl-12 mb-4"
          value={type === 'place' ? editingDummy.location : editingDummy.review}
          onChange={type === 'place'
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

      <FileUpload type="place" />
      <div
        onClick={((event) => {
          dispatch(handleSubmit(event));
        })}
        className="w-full"
      >
        <Button type="normal" caption="Valider les modifications" className="text-2xl absolute bottom-0 w-full" url="#" />
      </div>
      <div
        onClick={() => (confirm('Attention, cette action est irreversible') ? dispatch(dispatch(actionDeletePlaceOrNote(type))) : '')}
        className="w-full"
      >
        <Button type="danger" caption={`Supprimer ce ${type === 'place' ? 'place' : 'plat'}`} className="text-2xl absolute bottom-0" url="#" />
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
