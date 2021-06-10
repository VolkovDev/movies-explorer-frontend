import './MoviesCard.css';
import { useContext } from 'react';
import { convertTime } from '../../utils/utils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const MoviesCard = ({ movie, image, nameRU, duration, savePage, saveMovie, deleteMovie }) => {

    const currentUser = useContext(CurrentUserContext);
    const isSaved = ((movie.owner && movie.owner) === currentUser._id);

    const handleSaveButtonClick = () => {
        if (isSaved) {
            deleteMovie(movie._id, movie);
        } else {
            saveMovie(movie);
        }
    }

    const handleDeleteButtonClick = () => {
        deleteMovie(movie._id, movie);
    }

    const handleOpenTrailer = () => {
        return window.open(movie.trailer);
    }


    return (
        <li className="movies-card">

            <p className="movies-card__title">{nameRU}</p>
            {
                savePage ?
                    <button type="button" className="movies-card__button movies-card__button_remove"
                        onClick={handleDeleteButtonClick} /> :
                    <button type="button"
                        className={`movies-card__button movies-card__button_like-off ${isSaved && 'movies-card__button_like-on'}`}
                        onClick={handleSaveButtonClick} />
            }
            <p className="movies-card__length">{convertTime(duration)}</p>
            <div onClick={handleOpenTrailer}
                className="movies-card__image" style={{ background: `center/cover url(${image}) no-repeat` }} />
        </li>
    );
};

export default MoviesCard;
