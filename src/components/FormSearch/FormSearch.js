import { RiSearchLine } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdPlace } from 'react-icons/md';
import Field from '../Field/Field';

function FormSearch() {
  // const searchPlace = useSelector((state) => state.field.searchPlace);
  // const locationPlace = useSelector((state) => state.field.locationPlace);

  // const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    // dispatch(actionSearchPlace());
  }

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-8 w-full"
      autoComplete="off"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="relative flex justify-between w-full">
        <div className="w-full">
          <MdPlace className="text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />
          <Field
            type="text"
            name="searchPlace"
            classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-full pl-12"
            placeholder="Cuisine, nom du place..."
            value={searchPlace}
            onChange={(newValue, name) => dispatch(actionChangeInputValue(newValue, name))}
          />
        </div>
        <button
          type="submit"
          className="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md ml-4 text-darkTextColor px-7 "
        >
          <RiSearchLine className=" text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />
        </button>

      </div>

      <div className="relative">
        <HiOutlineLocationMarker className=" text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />
        <Field
          type="text"
          name="locationPlace"
          classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-full pl-12"
          placeholder="Où ?"
          value={locationPlace}
          onChange={(newValue, name) => dispatch(actionChangeInputValue(newValue, name))}
        />
      </div>
    </form>
  );
}

export default FormSearch;
