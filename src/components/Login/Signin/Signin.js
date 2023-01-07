import { HiOutlineUserCircle } from 'react-icons/hi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsKeyFill } from 'react-icons/bs';
import { useContext, useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import Button from '../../Button/Button';
import Field from '../../Field/Field';
import UserContext from '../../../context/UserContext';

function Signin() {
  const { user, setUser } = useContext(UserContext);
  const { REACT_APP_API_URL } = process.env;
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [hidden, setHidden] = useState(true);

  const checkLogin = async (event) => {
    event.preventDefault();
    try {
      const options = {
        url: `${REACT_APP_API_URL}/login`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          email: email,
          password: password,
        },
      };

      const result = await CapacitorHttp.post(options);

      setUser({
        ...user,
        token: result.data.token,
        userid: result.data.id,
        username: result.data.username,
        email: result.data.email,
        colorScheme: result.data.colorscheme,
        photoURL: result.data.photo_url,
      });

      // await Preferences.setAll({
      //   token: result.data.token,
      //   userid: result.data.id,
      //   username: result.data.username,
      //   email: result.data.email,
      //   colorScheme: result.data.colorScheme,
      //   photo_url: result.data.photo_url,
      // });
      await Preferences.set({ key: 'token', value: result.data.token });
      await Preferences.set({ key: 'userid', value: result.data.userid });
      await Preferences.set({ key: 'username', value: result.data.username });
      await Preferences.set({ key: 'email', value: result.data.email });
      await Preferences.set({ key: 'colorscheme', value: result.data.colorscheme });
      await Preferences.set({ key: 'photoURL', value: result.data.photo_url });

      const newToken = await Preferences.set({ key: 'token' });
      console.log('Requete LOGIN OK', newToken);
    }
    catch (error) {
      console.log('Requete LOGIN NOK', error);
      setErrorMsg(true);
    }
  };

  return (
    <div className="signin">

      <form
        autoComplete="off"
        className="login-form-element flex flex-col items-center"
        onSubmit={(event) => {
          checkLogin(event);
        }}
      >
        {errorMsg && <div className="text-[red]">Adresse email ou mot de passe incorrect</div>}
        <div className="relative">
          <HiOutlineUserCircle className="text-darkAccentColor text-3xl absolute left-10 z-10 h-10 top-2" />
          <Field
            type="email"
            name="email"
            classname="drop-shadow-md mb-4 bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-80 mx-8 pl-12"
            placeholder="Adresse Email"
            value={email}
            onChange={(e) => setEmail(e)}
          />
        </div>

        <div className="relative">
          <Field
            type={hidden ? 'password' : 'text'}
            name="password"
            classname="drop-shadow-md  mb-4 bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-80 mx-8 pl-12"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e)}
          />
          <div className="text-darkAccentColor text-3xl pointer-events-none w-full absolute bottom-2 h-full flex justify-between items-center px-11">
            <BsKeyFill className="" />
            {hidden ? <AiFillEye className="pointer-events-auto" onClick={() => setHidden(false)} /> : <AiFillEyeInvisible className="pointer-events-auto" onClick={() => setHidden(true)} />}
          </div>
        </div>

        <div className="cursor-pointer pb-8 pt-4">
          Mot de passe oublié ?
        </div>

        <button
          type="submit"
          className="login-form-button h-20 w-40"
        >
          <Button type="normal" caption="Se connecter" />
        </button>

      </form>
    </div>
  );
}

export default Signin;
