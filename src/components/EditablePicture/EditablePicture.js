import PropTypes from 'prop-types';
import { useState } from 'react';
// import { MdUploadFile } from 'react-icons/md';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
// import FileUpload from '../FileUpload/FileUpload';

function EditablePicture({
  url, editing, setEditing, rounded,
}) {
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState(url);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    else {
      // console.log()
    }
  };

  const onChange = (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]));
    // dispatch(actionSetPreview(preview));
    // dispatch(actionSetFile(event.target.files[0], event.target.files[0].name));
  };

  return (
    <div className="">
      {editing
        ? (
          <>
            <label htmlFor="customFile" className={`absolute border-2 border-darkAccentColor rounded-lg ${rounded ? 'rounded-full' : ''} z-10 h-48 flex justify-center items-center w-full`}>
              <div className="bg-[white] rounded-full p-1 top-2 right-2 border-2 border-[white] shadow-[0_5px_5px_0px_rgba(0,0,0,0.3)] dark:shadow-card cursor-pointer overflow-hidden ">
                <ArrowUpOnSquareIcon className="h-6 w-6 text-darkAccentColor" />
              </div>
              <input
                type="file"
                className="hidden"
                id="customFile"
                onChange={onChange}
              />
            </label>
            <img className={`object-cover h-48 w-full absolute rounded-lg ${rounded ? 'rounded-full' : ''}`} src={preview} alt="" />

            {/* {uploadBtn && (
            <form
              onClick={((event) => {
                handleSubmit(event);
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
            )} */}
          </>
        )
        : <img src={url} className="object-cover h-48 w-full rounded-md" alt="mapPlaceholder" />}

    </div>
  );
}

EditablePicture.propTypes = {
  url: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  rounded: PropTypes.bool.isRequired,
};

export default EditablePicture;
