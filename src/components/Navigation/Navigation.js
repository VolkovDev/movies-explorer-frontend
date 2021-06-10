import './Navigation.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({
    handleByClickButtonSaveMovies,
    handleClickByMovies

}) => {
    const [moviesClick, setMoviesClick] = useState(false);
    const [savedMoviesClick, setSaveMoviesClick] = useState(false);
    const [mainClick, setMainClick] = useState(false);
    const [accountClick, setAccountClick] = useState(false);


    const handleAccountClicked = () => {
        setMainClick(false);
        setSaveMoviesClick(false);
        setMoviesClick(false);
        setAccountClick(true);
    }

    const handlerMoviesClick = () => {
        handleClickByMovies();
        setMoviesClick(true);
        setSaveMoviesClick(false);
        setMainClick(false);
        setAccountClick(false);
    }

    const handleMainClicked = () => {
        setMainClick(true);
        setSaveMoviesClick(false);
        setMoviesClick(false);
        setAccountClick(false);
    }


    const handleSavedMoviesClick = () => {
        handleByClickButtonSaveMovies();
        setSaveMoviesClick(true);
        setMoviesClick(false);
        setMainClick(false);
        setAccountClick(false);
    }

    return (
        <nav className="nav">
            <div className="nav__options">
                <NavLink
                    to="/"
                    className={`nav__link nav__link_top ${mainClick && 'nav__link_active'}`}
                    onClick={handleMainClicked}>Главная</NavLink>
                <div className="nav__movies">
                    <NavLink
                        to="/movies"
                        className={`nav__link ${moviesClick && 'nav__link_active'}`}
                        onClick={handlerMoviesClick}>Фильмы</NavLink>
                    <NavLink
                        to="/saved-movies"
                        className={`nav__link ${savedMoviesClick && 'nav__link_active'}`}
                        onClick={handleSavedMoviesClick}>Сохранённые фильмы</NavLink>
                </div>
                <NavLink
                    to="/profile"
                    className={`nav__account ${accountClick && 'nav__link_active'}`}
                    onClick={handleAccountClicked}>
                    Аккаунт
                    <div className="nav__account-back" onClick={handleAccountClicked}>
                    </div>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;
