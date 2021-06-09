import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({
    pathOne,
    isСheckIn,
    handleMenuOpen,
    handleByClickButtonSaveMovies,
    handleClickByMovies
}) => {
    console.log("pathOne", pathOne)
    return (
        <header className={`header
      ${(pathOne === '/movies' || pathOne === '/saved-movies' || pathOne === '/profile') && 'header_login'}
      ${(pathOne === '/signin' || pathOne === '/signup') && 'header_hidden'}
      ${(pathOne === '/') && 'header_background-color-grey'}
      `}>
            <div className="header__container">
                <NavLink to="/" className="header__logo" />
                {
                    !isСheckIn && pathOne === '/' ?
                        <nav className="header__options">
                            <NavLink to="/signup" className="header__option header__option_register"
                            >Регистрация</NavLink>
                            <NavLink to="/signin" className="header__option header__option_login"
                            >Войти</NavLink>
                        </nav> :
                        <div className="header__navigation">
                            <Navigation
                                handleByClickButtonSaveMovies={handleByClickButtonSaveMovies}
                                handleClickByMovies={handleClickByMovies} />
                        </div>
                }
                {isСheckIn && <button className="header__menu-button" type="button" onClick={handleMenuOpen} />}
            </div>
        </header>
    );
}

export default Header;
