import './App.css';
import React, { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Menu from '../Menu/Menu';
import Popup from '../Popup/Popup';

function App() {
    const history = useHistory();
    const location = useLocation();
    const [isСheckIn, setisСheckIn] = useState(true);
    const [isToMain, setIsToMain] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFailRegistration, setisFailRegistration] = useState(false);

    const handleLogin = () => {
        setisСheckIn(true);
        history.push('/movies');
    }

    const handleRegister = () => {
        setisFailRegistration(false);
        openInfoPopup();
        history.push('/signin');
    }

    const handleLogout = () => {
        setisСheckIn(false);
        setLanding();
        history.push('/');
    }

    const handleEditProfile = () => {
        openInfoPopup();
    }

    const setLanding = () => {
        setIsToMain(true);
    }

    const openMenu = () => {
        setIsMenuOpen(true);
    }

    const openInfoPopup = () => {
        setIsPopupOpen(true);
    }

    const outLanding = () => {
        setIsToMain(false);
    }

    const closePopups = () => {
        setIsMenuOpen(false);
        setIsPopupOpen(false);
    }

    const handleLoginClick = () => {
        outLanding();
    };

    const handleLogoClick = () => {
        setLanding();
    }

    const handleRegisterClick = () => {
        outLanding();
    }

    return (
        <div className="App">
            <Header pathOne={location.pathname} isСheckIn={isСheckIn} isOnLanding={isToMain}
                onLogoClick={handleLogoClick}
                onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} handleMenuOpen={openMenu}
                handleOnMainClick={setLanding} handleMoviesClick={outLanding}
                handleOnAccountClick={outLanding} />
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/movies-explorer-frontend">
                    <Main />
                </Route>
                <Route path="/movies">
                    <Movies />
                </Route>
                <Route exact path="/saved-movies">
                    <SavedMovies />
                </Route>
                <Route exact path="/profile">
                    <Profile userName="Виталий" handleLogout={handleLogout} handleSubmit={handleEditProfile} />
                </Route>
                <Route exact path="/signin">
                    <Login onLogoClick={handleLogoClick} onLogin={handleLogin} />
                </Route>
                <Route exact path="/signup">
                    <Register onLogoClick={handleLogoClick} onRegister={handleRegister} />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>

            <Footer path={location.pathname} />

            <Menu handleMenuClose={closePopups} isOpen={isMenuOpen} handleOnMainClick={setLanding}
                handleMoviesClick={outLanding} handleOnAccountClick={outLanding} />
            <Popup closePopup={closePopups} isOpen={isPopupOpen} isFail={isFailRegistration} />
        </div>
    );
}

export default App;
