import PropTypes from 'prop-types';
import Button from '../Button/Button';

function Bullet({ bullet, setBullet }) {
  return (
    <div className="p-8 flex flex-col justify-between items-center absolute bottom-0 text-center">
      <div className="dark:text-darkTextColor text-lightTextColor pb-12">
        {(bullet === 1)
        && <p className="">Note To Myself permet de se laisser des notes personnelles sur un plat ou sur un restaurant</p>}

        {(bullet === 2)
        && <p className="">Une note par moi et pour moi afin de m’aider à mieux choisir lors de mon prochain passage</p>}

        {(bullet === 3)
          && <p className="">Une notification des mémentos que je me suis laissé quand je rentre dans un restaurant</p>}
      </div>

      <div
        onClick={() => {
          setBullet(0);
        }}
        className="mb-8 text-darkTextColor cursor-pointer"
      >
        <Button type="normal" caption="Se connecter" classes="text-lightTextColor dark:text-darkTextColor" />
      </div>

      <div className="w-full flex justify-center ">
        <div
          onClick={() => {
            setBullet(1);
          }}
          className={`cursor-pointer w-12 h-2 rounded-lg mr-4 ${bullet === 1 ? 'bg-lightAccentColor dark:bg-darkAccentColor' : 'bg-darkBackgroundColor dark:bg-lightBackgroundColor'}`}
        />
        <div
          onClick={() => {
            setBullet(2);
          }}
          className={`cursor-pointer w-12 h-2 rounded-lg mr-4 ${bullet === 2 ? 'bg-lightAccentColor dark:bg-darkAccentColor' : 'bg-darkBackgroundColor dark:bg-lightBackgroundColor'}`}
        />
        <div
          onClick={() => {
            setBullet(3);
          }}
          className={`cursor-pointer w-12 h-2 rounded-lg mr-4 ${bullet === 3 ? 'bg-lightAccentColor dark:bg-darkAccentColor' : 'bg-darkBackgroundColor dark:bg-lightBackgroundColor'}`}
        />
      </div>

    </div>
  );
}

Bullet.propTypes = {
  setBullet: PropTypes.func.isRequired,
  bullet: PropTypes.number.isRequired,
};

export default Bullet;
