import { HiOutlineUserCircle } from 'react-icons/hi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsKeyFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { CapacitorHttp } from '@capacitor/core';
import Button from '../../../Button/Button';
import Field from '../../../Field/Field';

function Signin({ setUser, user }) {
  const { REACT_APP_API_URL } = process.env;
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [hidden, setHidden] = useState(false);

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

      console.log('Requete LOGIN OK', result);
      setUser({
        ...user,
        token: result.data.token,
        userid: result.data.id,
        username: result.data.username,
        email: result.data.email,
        colorScheme: result.data.colorScheme,
        photo_url: result.data.photo_url,
      });
      // localStorage.setItem('token', result.data.token);
      // localStorage.setItem('userid', result.data.id);
      // localStorage.setItem('username', result.data.username);
      // localStorage.setItem('email', result.data.email);
      // localStorage.setItem('dark', result.data.dark);
      // localStorage.setItem('photo_url', result.data.photo_url);
      // store.dispatch(actionUserLogin(result.data));
    }
    catch (error) {
      console.log('Requete LOGIN NOK', error);
      setErrorMsg(true);
    }

    // try {
    //   event.preventDefault();
    //   const result = await axios.post(`${REACT_APP_API_URL}/login`, {
    //     email: email,
    //     password: password,
    //   });
    //   console.log('Requete LOGIN OK', result);
    //   setUser({
    //     ...user,
    //     token: result.data.token,
    //     userid: result.data.id,
    //     username: result.data.username,
    //     email: result.data.email,
    //     dark: result.data.dark,
    //     photo_url: result.data.photo_url,
    //   });
    //   // localStorage.setItem('token', result.data.token);
    //   // localStorage.setItem('userid', result.data.id);
    //   // localStorage.setItem('username', result.data.username);
    //   // localStorage.setItem('email', result.data.email);
    //   // localStorage.setItem('dark', result.data.dark);
    //   // localStorage.setItem('photo_url', result.data.photo_url);
    //   // store.dispatch(actionUserLogin(result.data));
    // }
    // catch (error) {
    //   console.log('Requete LOGIN NOK', error);
    //   setErrorMsg(true);
    // }
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

        <Link to="#" className="pb-8 pt-4">
          Mot de passe oublié ?
        </Link>

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

Signin.propTypes = {
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Signin;
