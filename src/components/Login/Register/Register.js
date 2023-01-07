import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { BsKeyFill } from 'react-icons/bs';
import { useContext, useState } from 'react';
import Button from '../../Button/Button';
import Field from '../../Field/Field';
import UserContext from '../../../context/UserContext';

function Register() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [hidden, setHidden] = useState(false);

  return (
    <div className="signup">
      <form
        autoComplete="off"
        className="login-form-element flex flex-col items-center"
        onSubmit={() => {
          // checkLogin(event);
        }}
      >
        <div className="relative">
          <HiOutlineUserCircle className=" text-darkAccentColor text-3xl absolute left-10 z-10 h-10 top-2" />
          <Field
            type="username"
            name="username"
            classname="drop-shadow-md  mb-4 bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-80 mx-8 pl-12"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e)}
          />
        </div>
        {error && <div className="text-[red]">Cette adresse mail a déja été utilisé</div>}
        <div className="relative">

          <MdAlternateEmail className="text-darkAccentColor text-3xl absolute left-10 z-10 h-10 top-2" />
          <Field
            type="email"
            name="emailRegister"
            classname="drop-shadow-md  mb-4 bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-80 mx-8 pl-12"
            placeholder="Adresse Email"
            value={email}
            onChange={(e) => setEmail(e)}
          />
        </div>
        <div className="relative flex-col">

          <Field
            type={hidden ? 'password' : 'text'}
            name="passwordRegister"
            classname="drop-shadow-md mb-4 bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor  py-4 w-80 mx-8 pl-12"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e)}
          />
          <div className="text-darkAccentColor text-3xl pointer-events-none w-full absolute bottom-2 h-full flex justify-between items-center px-11">
            <BsKeyFill className="" />
            {hidden ? <AiFillEye className="pointer-events-auto" onClick={() => setHidden(false)} /> : <AiFillEyeInvisible className="pointer-events-auto" onClick={() => setHidden(true)} />}
          </div>
        </div>
        <button
          type="submit"
          className="login-form-button h-20 w-40"
        >
          <Button type="normal" caption="S'enregistrer" />
        </button>
      </form>

    </div>
  );
}

export default Register;
