import { useEffect, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Map from '../components/Map/Map';
import Title from '../components/Title/Title';
import CardList from '../components/CardList/CardList';

function Category() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState({});
  const [expendLatest, setExpendLatest] = useState(true);
  const { REACT_APP_API_URL } = process.env;
  const { category } = useParams();
  const { getAccessTokenSilently } = useAuth0();

  const getPlacesByCategory = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/category`,
        headers: {
          Authorization: `Bearer ${token}`,
          placeid: category,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete PLACES BY CATEGORY OK', result.data.place);
      setPlaces(result.data.place);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete PLACES BY CATEGORY NOK', error);
    }
  };

  useEffect(() => {
    getPlacesByCategory();
  }, []);

  return (
    (!loading && (
    <>
      <div className="relative">
        <Map zoom={17} />
      </div>
      <div className="text-lightTextColor dark:text-darkTextColor px-6 pb-4">

        <Title caption={category} seeAll="places" classes="mt-8 mb-4" limit={expendLatest} setLimit={setExpendLatest} />
        {!loading && <CardList data={places} type="category" orientation="x" limit={expendLatest} />}
      </div>

    </>
    )
    ));
}

export default Category;
