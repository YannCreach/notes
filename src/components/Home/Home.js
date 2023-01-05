import PropTypes from 'prop-types';
import CardList from '../CardList/CardList';
import Header from '../Header/Header';
import QuickActions from '../QuickActions/QuickActions';

function Home({ user, setUser }) {
  const data = [
    {
      id: 1,
      photo_url: null,
      slug: 'slug',
      favorite: false,
      name: 'restau1',
      city: 'lannion',
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <Header user={user} setUser={setUser} />
      <div className="overflow-auto">
        <p className="mx-8 text-2xl text-lightTextColor dark:text-darkTextColor py-4">Actions rapides</p>
        <QuickActions restaurants={[]} />
        <p className="mx-8 text-2xl text-lightTextColor dark:text-darkTextColor pt-4">Restaurants favoris</p>
        <div className="mx-4">
          <CardList loading={false} data={data} type="restaurant" />
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Home;
