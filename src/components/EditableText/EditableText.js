import PropTypes from 'prop-types';
import Field from '../Field/Field';

function EditableText({
  editing, value, classes, placeholder, icon, dummy, setDummy,
}) {
  return (
    <div className="">
      {!editing
        ? <p className={classes}>{ dummy[value] }</p>
        : (
          <Field
            type="text"
            name="name"
            icon={icon}
            placeholder={placeholder}
            value={dummy[value]}
            dummy={dummy[value]}
            setDummy={setDummy}
            onChange={(e) => setDummy({ ...dummy, [value]: e })}
          />
        )}
    </div>
  );
}

EditableText.propTypes = {
  editing: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string,
  dummy: PropTypes.object.isRequired,
  setDummy: PropTypes.func.isRequired,
};

EditableText.defaultProps = {
  icon: '',
};

export default EditableText;
