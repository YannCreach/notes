import splashImage from '../../../assets/images/splashImage.webp';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';

function Loading() {
  return (
    <div className="h-full relative">
      <img src={splashImage} alt="splashImage" className="opacity-20 object-cover h-full absolute" />
      <div className="flex flex-col items-center">
        <Logo className="fill-darkAccentColor w-[80%] lg:w-[50%] mt-[10vh] mx-auto" />
      </div>
    </div>
  );
}

export default Loading;
