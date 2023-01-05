import PropTypes from 'prop-types';

function Message({ msg }) {
  return (
    <div className=" text-darkAccentColor pb-4" role="alert">
      {msg}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message;
