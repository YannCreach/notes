import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineTag } from 'react-icons/ai';
import Tag from '../Tag/Tag';
import { actionDeleteTag, actionAddNewTag, actionToggleDrawer } from '../../actions/restaurantActions';

function EditTags() {
  const editingDummy = useSelector((state) => state.restaurant.editingDummy);
  const availableTags = useSelector((state) => state.restaurant.allTags);
  const toggleDrawer = useSelector((state) => state.restaurant.toggleDrawer);
  const dispatch = useDispatch();
  return (
    <div className="relative w-full">
      <div className="flex flex-col justify-center w-full">
        <AiOutlineTag className="text-darkAccentColor text-3xl absolute left-3 z-10 h-10" />
        <div className="drop-shadow-md bg-[white] dark:bg-darkBackgroundAltColor rounded-md shadow-md border-l-4 border-l-darkAccentColor py-2 w-full pr-8 pl-12 flex flex-wrap min-h-[4em]">
          { editingDummy.tags && (
            editingDummy.tags.map((tag) => (
              <div
                onClick={() => {
                  dispatch(actionDeleteTag(tag.id));
                }}
                key={tag.id}
              >
                <Tag
                  caption={tag.label}
                  type="edit"
                />
              </div>
            )))}
          {!toggleDrawer && (
          <div
            onClick={() => {
              dispatch(actionToggleDrawer(true));
            }}
            className="cursor-pointer"
          >
            <Tag
              caption="Ajouter un tag"
              type="normal"
            />
          </div>
          )}
        </div>
      </div>
      { toggleDrawer && (
      <ul
        className="p-4 pb-2 bg-[white] dark:bg-darkBackgroundAltColor -mt-1 rounded-md focus:outline-none flex w-full flex-wrap justify-center"
      >
        {availableTags.map((tag) => (
          <li
            key={`option_${tag.id}`}
            className="cursor-pointer"
            onClick={() => {
              dispatch(actionAddNewTag(tag.id));
            }}
          ><Tag
            caption={tag.label}
            type="normal"
          />
          </li>

        ))}
      </ul>
      )}

    </div>

  );
}

export default EditTags;
