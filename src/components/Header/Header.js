import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({
    pathOne, isСheckIn, onLogoClick, onLoginClick, onRegisterClick,
    handleMenuOpen, handleOnMainClick, handleMoviesClick, handleOnAccountClick
}) => {
    console.log("pathOne", pathOne)
    return (
        <header className={`header
      ${(pathOne === '/movies' || pathOne === '/saved-movies' || pathOne === '/profile') && 'header_login'}
      ${(pathOne === '/signin' || pathOne === '/signup') && 'header_hidden'}
      ${(pathOne === '/') && 'header_background-color-grey'}
      `}>
            <div className="header__container">
                <NavLink to="/" className="header__logo" onClick={onLogoClick} />
                {
                    !isСheckIn && pathOne === '/' ?
                        <nav className="header__options">
                            <NavLink to="/signup" className="header__option header__option_register"
                                onClick={onRegisterClick}>Регистрация</NavLink>
                            <NavLink to="/signin" className="header__option header__option_login"
                                onClick={onLoginClick}>Войти</NavLink>
                        </nav> :
                        <div className="header__navigation">
                            <Navigation handleOnMainClick={handleOnMainClick} handleMoviesClick={handleMoviesClick}
                                handleOnAccountClick={handleOnAccountClick} />
                        </div>
                }
                {isСheckIn && <button className="header__menu-button" type="button" onClick={handleMenuOpen} />}
            </div>
        </header>
    );
}

export default Header;
