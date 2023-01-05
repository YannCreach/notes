import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { MdUploadFile } from 'react-icons/md';
import { actionSetFile, actionUploadImg, actionSetPreview } from '../../actions/upload';
import flou from '../../assets/images/blur.jpg';
import Button from '../Button/Button';

function FileUpload({ type, uploadBtn }) {
  const previewState = useSelector((state) => state.upload.preview);
  const file = useSelector((state) => state.upload.file);
  let data;
  let rounded;
  let preview;
  const dispatch = useDispatch();
  const { REACT_APP_API_URL } = process.env;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
      dispatch(actionUploadImg(formData, type));
    }
  };

  const onChange = (event) => {
    preview = URL.createObjectURL(event.target.files[0]);
    dispatch(actionSetPreview(preview));
    dispatch(actionSetFile(event.target.files[0], event.target.files[0].name));
  };

  const prepareImageSrc = (imageSrc) => {
    const regex = /^http[s]?.*/i;
    if (imageSrc.match(regex)) {
      return imageSrc;
    }
    return `${REACT_APP_API_URL}${imageSrc}`;
  };

  if (type === 'profile') {
    data = useSelector((state) => state.user);
    rounded = 'w-48 rounded-full';
  }
  else {
    data = useSelector((state) => state.restaurant.editingDummy);
    rounded = 'w-full rounded-md';
  }
  let imgUrl = flou;
  if (data.photo_url && data.photo_url !== 'null') {
    imgUrl = prepareImageSrc(data.photo_url);
  }
  if (previewState) {
    imgUrl = previewState;
  }

  return (
    <div className="text-[white] flex flex-col items-center relative h-48 w-full mb-20 mt-12">

      <label htmlFor="customFile" className={`absolute border-2 border-darkAccentColor ${rounded} z-10 h-48 flex justify-center items-center`}>
        <div className="bg-[white] rounded-full p-1 top-2 right-2 border-2 border-[white] shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card cursor-pointer overflow-hidden ">
          <MdUploadFile className="text-2xl text-darkAccentColor" />
        </div>
        <input
          type="file"
          className="hidden"
          id="customFile"
          onChange={onChange}
        />
      </label>

      <img className={`object-cover h-48 absolute ${rounded}`} src={imgUrl} alt="" />

      {uploadBtn && (
        <form
          onClick={((event) => {
            dispatch(handleSubmit(event));
          })}
          className=""
        >
          <button
            type="submit"
            value="Envoyer"
            className="w-full mt-52"
          >
            <Button type="normal" caption="Envoyer" />
          </button>
        </form>
      )}
    </div>
  );
}

FileUpload.propTypes = {
  type: PropTypes.string.isRequired,
  uploadBtn: PropTypes.bool.isRequired,
};

export default FileUpload;
