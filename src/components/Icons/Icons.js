import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilm, faBurger, faBed, faBreadSlice, faMusic, faCampground, faMugHot, faFishFins, faCarrot, faScissors, faFolderOpen, faStarHalfStroke, faStar, faMagnifyingGlass, faBars, faXmark, faMaximize, faMinimize, faArrowLeft, faArrowRight, faHeart, faEuroSign, faTag, faPenToSquare, faChevronLeft, faCheck, faLocationDot, faToggleOn, faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import {
  faStar as faStarEmpty, faHeart as faHeartEmpty,
} from '@fortawesome/free-regular-svg-icons';
import {
  faYelp, faGoogle,
} from '@fortawesome/free-brands-svg-icons';

function Icons({ icon, classes }) {
  return (
    <>
      {(icon === 'Cinema') && (<FontAwesomeIcon icon={faFilm} className={classes} />)}
      {(icon === 'Restaurant') && (<FontAwesomeIcon icon={faBurger} className={classes} />)}
      {(icon === 'Hotel') && (<FontAwesomeIcon icon={faBed} className={classes} />)}
      {(icon === 'Boulangerie') && (<FontAwesomeIcon icon={faBreadSlice} className={classes} />)}
      {(icon === 'Musique') && (<FontAwesomeIcon icon={faMusic} className={classes} />)}
      {(icon === 'Nature') && (<FontAwesomeIcon icon={faCampground} className={classes} />)}
      {(icon === 'Bar') && (<FontAwesomeIcon icon={faMugHot} className={classes} />)}
      {(icon === 'Poissonnerie') && (<FontAwesomeIcon icon={faFishFins} className={classes} />)}
      {(icon === 'Primeur') && (<FontAwesomeIcon icon={faCarrot} className={classes} />)}
      {(icon === 'Coiffeur') && (<FontAwesomeIcon icon={faScissors} className={classes} />)}
      {(icon === 'Divers') && (<FontAwesomeIcon icon={faFolderOpen} className={classes} />)}
      {(icon === 'StarEmpty') && (<FontAwesomeIcon icon={faStarEmpty} className={classes} />)}
      {(icon === 'StarHalf') && (<FontAwesomeIcon icon={faStarHalfStroke} className={classes} />)}
      {(icon === 'StarFull') && (<FontAwesomeIcon icon={faStar} className={classes} />)}
      {(icon === 'Glass') && (<FontAwesomeIcon icon={faMagnifyingGlass} className={classes} />)}
      {(icon === 'MenuOpen') && (<FontAwesomeIcon icon={faBars} className={classes} />)}
      {(icon === 'MenuClose') && (<FontAwesomeIcon icon={faXmark} className={classes} />)}
      {(icon === 'ExpendMap') && (<FontAwesomeIcon icon={faMinimize} className={classes} />)}
      {(icon === 'RetractMap') && (<FontAwesomeIcon icon={faMaximize} className={classes} />)}
      {(icon === 'Yelp') && (<FontAwesomeIcon icon={faYelp} className={classes} />)}
      {(icon === 'ArrowLeft') && (<FontAwesomeIcon icon={faArrowLeft} className={classes} />)}
      {(icon === 'ArrowRight') && (<FontAwesomeIcon icon={faArrowRight} className={classes} />)}
      {(icon === 'Heart') && (<FontAwesomeIcon icon={faHeart} className={classes} />)}
      {(icon === 'HeartEmpty') && (<FontAwesomeIcon icon={faHeartEmpty} className={classes} />)}
      {(icon === 'Google') && (<FontAwesomeIcon icon={faGoogle} className={classes} />)}
      {(icon === 'Euro') && (<FontAwesomeIcon icon={faEuroSign} className={classes} />)}
      {(icon === 'Tag') && (<FontAwesomeIcon icon={faTag} className={classes} />)}
      {(icon === 'Edit') && (<FontAwesomeIcon icon={faPenToSquare} className={classes} />)}
      {(icon === 'Previous') && (<FontAwesomeIcon icon={faChevronLeft} className={classes} />)}
      {(icon === 'Check') && (<FontAwesomeIcon icon={faCheck} className={classes} />)}
      {(icon === 'Pin') && (<FontAwesomeIcon icon={faLocationDot} className={classes} />)}
      {(icon === 'SwitchOn') && (<FontAwesomeIcon icon={faToggleOn} className={classes} />)}
      {(icon === 'SwitchOff') && (<FontAwesomeIcon icon={faToggleOff} className={classes} />)}
    </>
  );
}

Icons.propTypes = {
  icon: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};

export default Icons;
