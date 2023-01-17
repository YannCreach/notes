import { useState } from 'react';
import Tab from '../Tab/Tab';
import Register from './Register/Register';
import Signin from './Signin/Signin';

function Login() {
  const [tab, setTab] = useState('Se connecter');

  return (
    <div className="absolute pb-8 bottom-0 w-full bg-lightBackgroundColor dark:bg-darkBackgroundColor">
      <div className="tabs w-full flex justify-center text-lightTextColor dark:text-darkTextColor px-6 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card mt-[-2em] z-10">
        <Tab values={['Se connecter', 'S\'enregistrer']} tab={tab} setTab={setTab} />
      </div>

      <div className="flex flex-col flex-grow p-8 text-lightTextColor dark:text-darkTextColor ">
        { (tab === 'Se connecter') && (<Signin />)}
        { (tab === 'S\'enregistrer') && (<Register />)}
      </div>
    </div>
  );
}

export default Login;
