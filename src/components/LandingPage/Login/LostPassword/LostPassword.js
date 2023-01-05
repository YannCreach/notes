import { useDispatch, useSelector } from 'react-redux';
import { actionChangeInputValue } from '../../../../actions/field';
import Field from '../../../Field/Field';

function LostPassword() {
  const isLogged = useSelector((state) => state.user.username);
  const emaillostpassword = useSelector((state) => state.field.emaillostpassword);

  const dispatch = useDispatch();

  const validateforgotPassword = () => {
    const isValid = true;

    return isValid;
  };

  function sendEmail(event) {
    event.preventDefault();
    // dispatch(actionCheckLogin());
    const validate = validateforgotPassword();

    if (validate) {
      alert(`Reset password link is sent to ${emaillostpassword}`);
    }
  }

  return (
    <div className="LostPassword">
      {!isLogged && (

      <form
        autoComplete="off"
        className="lostpassword-form"
        onSubmit={(event) => {
          sendEmail(event);
        }}
      >
        <Field
          name="emaillostpassword"
          placeholder="Adresse Email"
          onChange={(newValue, name) => dispatch(actionChangeInputValue(newValue, name))}
          value={emaillostpassword}
        />
        <button
          type="submit"
          className="lostpassword-form-button"
        >
          Réinitialiser le mot de passe
        </button>
      </form>
      )}
    </div>
  );
}

export default LostPassword;
