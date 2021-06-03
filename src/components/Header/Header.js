import './Header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({
    path, isСheckIn, onLogoClick, onLoginClick, onRegisterClick,
    handleMenuOpen, handleOnMainClick, handleMoviesClick, handleOnAccountClick
}) => {

    return (
        <header className={`header 
      ${(path === '/movies' || path === '/saved-movies' || path === '/profile') && 'header_login'}
      ${(path === '/signin' || path === '/signup') && 'header_hidden'}
      `}>
            <div className="header__container">
                <NavLink to="/" className="header__logo" onClick={onLogoClick} />
                {
                    !isСheckIn && path === '/' ?
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
