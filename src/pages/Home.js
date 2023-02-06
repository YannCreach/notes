import { CapacitorHttp } from '@capacitor/core';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import CardList from '../components/CardList/CardList';
import QuickActions from '../components/QuickActions/QuickActions';
import Title from '../components/Title/Title';

function Home() {
  const { user, setUser } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  const getAllRestaurants = async () => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/places`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: 1,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete RESTAURANTS OK', result);
      setData(result.data.places);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete RESTAURANTS NOK', error);
    }
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <div className="h-full flex flex-col ">
      <div className="overflow-auto">
        <div className="mx-6">
          <Title caption="Actions rapides" />
          <QuickActions restaurants={[]} />
          <Title caption="Restaurants favoris" />
        </div>
        <div className="mx-3">
          {!loading && <CardList data={data} type="restaurant" />}
        </div>
      </div>
    </div>
  );
}

export default Home;
