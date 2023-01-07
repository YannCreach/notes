import { useState } from 'react';
import Register from './Register/Register';
import Signin from './Signin/Signin';

function Login() {
  const [tab, setTab] = useState('SignIn');

  return (
    <div className="absolute pb-8 bottom-0 w-full bg-lightBackgroundColor dark:bg-darkBackgroundColor">
      <div className="tabs w-full flex justify-center text-lightTextColor dark:text-darkTextColor px-6 shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card mt-[-2em] z-10">
        <div
          onClick={() => {
            setTab('SignIn');
          }}
          className={`cursor-pointer mementoTab border-lightAccentColor dark:border-darkAccentColor pb-2 mr-5 ${tab === 'SignIn' ? 'border-b-2' : 'border-0'}`}
        >
          Se connecter
        </div>
        <div
          onClick={() => {
            setTab('Register');
          }}
          className={`cursor-pointer mealsTab border-lightAccentColor dark:border-darkAccentColor pb-2 mr-5 ${tab === 'Register' ? 'border-b-2' : 'border-0'}`}
        >
          S'enregistrer
        </div>
      </div>

      <div className="flex flex-col flex-grow p-8 text-lightTextColor dark:text-darkTextColor ">
        { (tab === 'SignIn') && (<Signin />)}
        { (tab === 'Register') && (<Register />)}
      </div>
    </div>
  );
}

export default Login;
