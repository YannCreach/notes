import { CapacitorHttp } from '@capacitor/core';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import CardList from '../components/CardList/CardList';
import Header from '../components/Header/Header';
import QuickActions from '../components/QuickActions/QuickActions';

function Home() {
  const { user, setUser } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  const getAllRestaurants = async () => {
    try {
      const options = {
        url: `${REACT_APP_API_URL}/restaurants`,
        headers: {
          Authorization: `bearer ${user.token}`,
          userid: user.userid,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete RESTAURANTS OK', result);
      setData(result.data);
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
    <div className="h-full flex flex-col">
      <Header user={user} setUser={setUser} />
      <div className="overflow-auto">
        <p className="mx-8 text-2xl text-lightTextColor dark:text-darkTextColor py-4">Actions rapides</p>
        <QuickActions restaurants={[]} />
        <p className="mx-8 text-2xl text-lightTextColor dark:text-darkTextColor pt-4">Restaurants favoris</p>
        <div className="mx-4">
          {!loading
          && <CardList data={data} type="restaurant" />}
        </div>
      </div>
    </div>
  );
}

export default Home;
