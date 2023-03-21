import { useAuth0 } from '@auth0/auth0-react';
import { CapacitorHttp } from '@capacitor/core';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Icons from '../Icons/Icons';

function EditableTags({ tags, setTags, cat }) {
  const { getAccessTokenSilently } = useAuth0();
  const { REACT_APP_API_URL } = process.env;
  const [tagSuggestion, setTagSuggestion] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestedTags, setSuggestedTags] = useState([]);

  const fetchTagSuggestions = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        url: `${REACT_APP_API_URL}/tags`,
        headers: {
          Authorization: `Bearer ${token}`,
          categorylabel: cat,
        },
      };

      const response = await CapacitorHttp.get(options);
      console.log('Requete GET ALL TAGS OK', response.data);
      setTagSuggestion(response.data);
    }
    catch (error) {
      console.log('Requete GET ALL TAGS NOK', error);
    }
  };

  function handleInputChange(event) {
    const { value } = event.target;
    setInputValue(value);
    const matchingTags = tagSuggestion.filter((tag) => tag.label.toLowerCase().includes(value.toLowerCase()));
    // const formattedTags = matchingTags.map((tag) => tag.label.replace(new RegExp(value, 'gi'), (match) => `<b>${match}</b>`));
    setSuggestedTags(matchingTags);
  }

  const deleteTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleAddTag = (value, event) => {
    event.preventDefault();
    let maxID = 0;
    const existingTag = tagSuggestion.find((tag) => tag.label.toLowerCase() === value.toLowerCase());
    let tagValue = value;
    if (existingTag) tagValue = existingTag.label;
    if (tags.length > 0) maxID = Math.max(...tags.map((tag) => tag.id));
    const newTags = [...tags, { id: maxID + 1, label: tagValue }];
    setTags(newTags);
    setInputValue('');
  };

  useEffect(() => {
    fetchTagSuggestions();
  }, [cat]);

  return (
    <div className="w-full relative">
      <div className="flex bg-[white] dark:bg-darkBackgroundAltColor rounded p-2 drop-shadow-md w-full mt-1">
        <form className="flex w-full" onSubmit={(event) => handleAddTag(inputValue, event)}>
          {tags.map((tag) => (
            <div key={tag.id} className="bg-lightBackgroundColor rounded-md py-1 px-2 mr-2 flex justify-center items-center" onClick={() => deleteTag(tag.id)}>
              <p className="mr-2">{tag.label}</p>
              <Icons icon="MenuClose" classes="h-4 text-darkTextsubColor" />
            </div>
          ))}

          <input className="w-full focus:outline-none outline-none" value={inputValue} onChange={(e) => handleInputChange(e)} />
        </form>

      </div>

      <ul className={`rounded-lg bg-[white] dark:bg-darkBackgroundColor drop-shadow-md mt-2 absolute z-30 w-full overflow-hidden duration-700 ${inputValue ? 'h-min' : 'h-0'}`}>
        <p className="text-xs text-darkTextsubColor ml-2 mt-2">{t('new_tag')}</p>
        <li onClick={(event) => handleAddTag(inputValue, event)} className="hover:bg-lightGrey cursor-pointer text-sm text-darkTextAltColor dark:text-darkTextsubColor p-2">
          <b>{inputValue}</b>
        </li>
        {suggestedTags.length > 0 && (
          <>
            <p className="text-xs text-darkTextsubColor ml-2 mt-4">{suggestedTags.length > 1 ? t('existing_tags') : t('existing_tag')}</p>
            {suggestedTags.map((tag) => (
              <li key={tag.id} onClick={(event) => handleAddTag(tag.label, event)} className="hover:bg-lightGrey cursor-pointer text-sm text-darkTextAltColor dark:text-darkTextsubColor p-2">
                {tag.label}
              </li>
            ))}
          </>
        )}
      </ul>

    </div>
  );
}

EditableTags.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
  cat: PropTypes.string.isRequired,
};

export default EditableTags;
