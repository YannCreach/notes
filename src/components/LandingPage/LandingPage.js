import PropTypes from 'prop-types';
import { useState } from 'react';
import Bullet from './Bullet/Bullet';
import Login from './Login/Login';
import splashImage from '../../assets/images/splashImage.webp';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

function LandingPage({ user, setUser }) {
  const [bullet, setBullet] = useState(1);

  return (
    <div className="h-full relative text-darkAccentColor">
      <img src={splashImage} alt="splashImage" className="opacity-20 object-cover h-full absolute" />
      <div className="flex flex-col items-center">
        <Logo className="fill-darkAccentColor w-[80%] lg:w-[50%] mt-[10vh] mx-auto opacity-90" />

        { bullet ? <Bullet bullet={bullet} setBullet={setBullet} /> : <Login user={user} setUser={setUser} /> }
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default LandingPage;
