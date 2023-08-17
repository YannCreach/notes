import { useEffect } from 'react';
import CardList from '../components/CardList/CardList';
import FormSearch from '../components/FormSearch/FormSearch';
import NavBtn from '../components/NavBtn/NavBtn';

function Search() {
  // const fetchingAllPlaces = useSelector((state) => state.place.fetchingAllPlaces);
  // const messageSearchPlace = useSelector((state) => state.place.messageSearchPlace);
  // const dispatch = useDispatch();

  useEffect(() => {
    // if (!fetchingAllPlaces) {
    //   dispatch(actionInitSearch());
    // }
  }, []);

  return (
    <div className="text-lightTextColor dark:text-darkTextColor w-full px-6 pb-4 flex flex-col overflow-hidden">
      <NavBtn caption="Précédent" type="previous" order="iconFirst" target="/" />
      <p className="text-2xl text-lightTextColor dark:text-darkTextColor pb-4">Chercher un lieu</p>
      <FormSearch />
      <p className="text-2xl text-lightTextColor dark:text-darkTextColor pb-4">{messageSearchPlace}</p>
      <div className="h-full overflow-y-scroll">
        <CardList type="placeSearch" />
      </div>
    </div>
  );
}

export default Search;
