import './MoviesCard.css';
import { useState } from 'react';
import { convertTime } from '../../utils/utils';

const MoviesCard = ({ image, name, duration, isSavePage }) => {
    const [isClicked, setIsClicked] = useState(false);

    const saveButton = (
        `movies-card__button movies-card__button_like-off ${isClicked && 'movies-card__button_like-on'}`
    );

    const handleSaveClick = () => {
        setIsClicked(!isClicked);
    }

    return (
        <li className="movies-card">

            <p className="movies-card__title">{name}</p>
            {
                isSavePage ?
                    <button type="button" className="movies-card__button movies-card__button_remove" /> :
                    <button type="button" className={saveButton} onClick={handleSaveClick} />
            }
            <p className="movies-card__length">{convertTime(duration)}</p>
            <img className="movies-card__image" src={image} alt={name} />
        </li>
    );
};

export default MoviesCard;
