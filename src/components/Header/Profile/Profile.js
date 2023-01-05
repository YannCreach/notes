import { HiOutlineUserCircle } from 'react-icons/hi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsKeyFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Button/Button';
import Field from '../../Field/Field';
import FileUpload from '../../FileUpload/FileUpload';
import { actionChangeIsHidden } from '../../../actions/field';
import {
  actionUpdateUsername, actionUpdatePassword, actionDeleteAccount, updateUser,
} from '../../../actions/user';

function Profile() {
  const usernameTyping = useSelector((state) => state.user.usernameTyping);
  const email = localStorage.getItem('email');
  const password = useSelector((state) => state.user.password);
  const isHidden = useSelector((state) => state.field.isHidden);
  const dispatch = useDispatch();

  const updateLogin = (e) => {
    e.preventDefault();
    dispatch(updateUser());
  };

  return (
    <div className="profile-container mx-4 h-full overflow-y-auto overflow-x-hidden text-lightTextColor dark:text-darkTextColor px-8">
      <FileUpload uploadBtn type="profile" />
      <form
        autoComplete="off"
        className="login-form-element flex flex-col items-center w-full"
        onSubmit={(e) => updateLogin(e)}
      >
        <div className="flex flex-col items-center w-full">
          <h1 className="font-bold py-4">Mon profil</h1>
          <div className="relative mb-4 w-full">
            <HiOutlineUserCircle className=" text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />
            <Field
              type="username"
              name="username"
              classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-full pl-12"
              value={usernameTyping}
              onChange={(e) => dispatch(actionUpdateUsername(e))}
            />
          </div>
          <div className="relative mb-4 w-full">
            <HiOutlineUserCircle className=" text-darkAccentColor text-3xl absolute left-3 z-10 h-10 top-2" />
            <Field
              type="email"
              name="email"
              classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-full pl-12 focus:outline-none opacity-50 pointer-events-none"
              value={email}
            />
          </div>
          <div className="relative flex-col mb-4 w-full">
            <Field
              type={isHidden ? 'password' : 'text'}
              name="password"
              classname="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 w-full pl-12"
              value={password}
              onChange={(e) => dispatch(actionUpdatePassword(e))}
            />
            <div className="pt-4 text-darkAccentColor text-3xl pointer-events-none w-full absolute bottom-2 h-full flex justify-between items-center px-4">
              <BsKeyFill className="" />
              {isHidden
                ? <AiFillEye className="pointer-events-auto" onClick={() => dispatch(actionChangeIsHidden())} />
                : <AiFillEyeInvisible className="pointer-events-auto" onClick={() => dispatch(actionChangeIsHidden())} />}
            </div>
          </div>

          <div className="flex mt-4 w-full flex-col">
            <button type="submit">
              <Button type="normal" caption="Valider" />
            </button>
            <button onClick={() => (confirm('Attention, cette action est irreversible') ? dispatch(actionDeleteAccount()) : '')} type="button">
              <Button type="button" caption="Supprimer le compte" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
