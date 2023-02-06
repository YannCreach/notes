import { CapacitorHttp } from '@capacitor/core';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CardList from '../components/CardList/CardList';
import QuickActions from '../components/QuickActions/QuickActions';
import Title from '../components/Title/Title';

function Home() {
  const { user } = useAuth0();
  const { REACT_APP_API_URL } = process.env;
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  console.log('home');
  const { getAccessTokenSilently } = useAuth0();

  const getAllPlaces = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const options = {
        url: `${REACT_APP_API_URL}/places`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
          userid: 1,
        },
      };

      const result = await CapacitorHttp.get(options);

      console.log('Requete PLACES OK', result);
      setData(result.data);
      setLoading(false);
    }
    catch (error) {
      console.log('Requete PLACES NOK', error);
    }
  };

  useEffect(() => {
    getAllPlaces();
  }, []);

  return (
    <div className="h-full flex flex-col ">
      <div className="overflow-auto">
        <div className="mx-6">
          <Title caption="Actions rapides" />
          <QuickActions places={[]} />
          <Title caption="Places favoris" />
        </div>
        <div className="mx-3">
          {!loading && <CardList data={data} type="place" />}
        </div>
      </div>
    </div>
  );
}

export default Home;
