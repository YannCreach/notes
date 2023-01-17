import { TagIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Tag from '../Tag/Tag';

function EditableTags({ editing, data }) {
  const [tags, setTags] = useState();
  return (
    <div className="relative w-full">
      {editing
        ? (
          <div className="dark:text-darkTextColor text-lightTextColor relative">
            <span className="text-darkAccentColor text-2xl absolute left-3 z-10 top-4">
              <TagIcon className="h-6 w-6" />
            </span>
            <div className="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-4 pr-8 pl-12 w-full mb-4">
              {data && data.map((tag) => (
                <div
                  onClick={() => {
                    // dispatch(actionDeleteTag(tag.id));
                  }}
                  key={tag.id}
                  className="inline-flex flex-wrap"
                >
                  <Tag
                    caption={tag.label}
                    type="edit"
                  />
                </div>
              ))}
            </div>
          </div>
        )
        : (
          <div className="mb-2 inline-flex flex-wrap">
            {data && data.map((tag) => (
              <Tag caption={tag.label} key={tag.id} type="normal" />
            ))}
          </div>
        )}

    </div>

  );
}

EditableTags.propTypes = {
  editing: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

export default EditableTags;
