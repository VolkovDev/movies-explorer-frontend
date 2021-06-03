import './Navigation.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ handleOnMainClick, handleMoviesClick, handleOnAccountClick }) => {
    const [isMoviesClicked, setMoviesClick] = useState(false);
    const [isSavedMoviesClicked, setSaveMoviesClick] = useState(false);
    const [isMainClicked, setMainClick] = useState(false);
    const [isAccountClicked, setAccountClick] = useState(false);

    const handlerMoviesClick = () => {
        handleMoviesClick();
        setMoviesClick(true);
        setSaveMoviesClick(false);
        setMainClick(false);
        setAccountClick(false);
    }

    const handleSavedMoviesClick = () => {
        handleMoviesClick();
        setSaveMoviesClick(true);
        setMoviesClick(false);
        setMainClick(false);
        setAccountClick(false);
    }

    const handleMainClicked = () => {
        handleOnMainClick();
        setMainClick(true);
        setSaveMoviesClick(false);
        setMoviesClick(false);
        setAccountClick(false);
    }
    const handleAccountClicked = () => {
        handleOnMainClick();
        setMainClick(false);
        setSaveMoviesClick(false);
        setMoviesClick(false);
        setAccountClick(true);
    }

    return (
        <nav className="nav">
            <div className="nav__options">
                <NavLink to="/" className={`nav__link nav__link_top ${isMainClicked && 'nav__link_active'}`}
                    onClick={handleMainClicked}>Главная</NavLink>
                <div className="nav__movies">
                    <NavLink to="/movies" className={`nav__link ${isMoviesClicked && 'nav__link_active'}`}
                        onClick={handlerMoviesClick}>Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={`nav__link ${isSavedMoviesClicked && 'nav__link_active'}`}
                        onClick={handleSavedMoviesClick}>Сохранённые фильмы</NavLink>
                </div>
                <NavLink to="/profile" className={`nav__account ${isAccountClicked && 'nav__link_active'}`}
                    onClick={handleAccountClicked}>
                    Аккаунт
                    <div className="nav__account-back" onClick={handleOnAccountClick}>
                    </div>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;
