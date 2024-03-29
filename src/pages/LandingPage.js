import { useState } from 'react';
import Bullet from '../components/Bullet/Bullet';
import splashImage from '../assets/images/splashImage.webp';
import { ReactComponent as Logo } from '../assets/images/logo.svg';

function LandingPage() {
  const [bullet, setBullet] = useState(1);

  return (
    <div className="h-full relative text-darkAccentColor">
      <img src={splashImage} alt="splashImage" className="opacity-20 object-cover h-full absolute" />
      <div className="flex flex-col items-center">
        <Logo className="fill-darkAccentColor w-[80%] lg:w-[50%] mt-[10vh] mx-auto opacity-90" />
        <Bullet bullet={bullet} setBullet={setBullet} />
      </div>
    </div>
  );
}

export default LandingPage;
