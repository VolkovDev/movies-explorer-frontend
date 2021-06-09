import './App.css';
import React, { useEffect, useState } from 'react';
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
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import {
    renderSiseWindow1280,
    renderSiseWindow1024,
    renderSiseWindow768,
    renderSiseWindow320,
    defaultSiseWindow1280,
    defaultSiseWindow1024,
    defaultSiseWindow768,
    defaultSiseWindow320,

    errorsMessage,
    loginErrorMessage,
    searchMovieErrorMessage,
    successСompletedMessage,
    updateSuccessСompletedMessage
} from '../../utils/constants';
import { checkShort } from '../../utils/utils';

function App() {
    const history = useHistory();
    const location = useLocation();

    const [currentUser, setCurrentUser] = useState({});
    const [isСheckIn, setIsСheckIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isMainSheet, setIsMainSheet] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [menuOpened, setMenuOpened] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [registrationFails, setRegistrationFails] = useState(false);
    const [savedRequestCompleted, setSavedRequestCompleted] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]);
    const [bestMovies, setBestMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [savePage, setSavePage] = useState(false);
    const [renderSiseWindow, setRenderSiseWindow] = useState(0);
    const [defaultSiseWindow, setDefaultSiseWindow] = useState(0);
    const [foundMovies, setFoundMovies] = useState(false);
    const [foundMoviesSave, setFoundMoviesSave] = useState(false);
    const [savedRequest, setSavedRequest] = useState(false);


    const setLanding = () => {
        setIsMainSheet(true);
    }

    const openMenu = () => {
        setMenuOpened(true);
        setByEscListener();
    }

    const handleEscClose = (event) => {
        if (event.key === 'Escape') {
            closeAllPopups();
        }
    }

    const removeByEscListener = () => {
        document.removeEventListener('keydown', handleEscClose);
    }

    const handleClosingPopupClickingOverlay = (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }
        closeAllPopups();
    }

    const closeAllPopups = () => {
        setMenuOpened(false);
        setIsPopupOpen(false);
        removeByEscListener();
    }

    const setByEscListener = () => {
        document.addEventListener('keydown', handleEscClose);
    }

    const openInformationPopup = (message) => {
        setByEscListener();
        setPopupMessage(message);
        setIsPopupOpen(true);
    }

    const closePopups = () => {
        setMenuOpened(false);
        setIsPopupOpen(false);
    }

    const handleClickByLogo = () => {
        setLanding();
    }

    const handleButtonManyClick = () => {
        const newAmount = renderSiseWindow + Math.min((movies.length - renderSiseWindow), defaultSiseWindow);
        setRenderSiseWindow(newAmount);
        if (movies.length - newAmount === 0) {
            setButtonVisible(false);
        }
    }

    const handleLogout = () => {
        setIsСheckIn(false);
        setCurrentUser({});
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('bestFilmMovies');
        setMovies([]);
        setButtonVisible(false);
        history.push('/');
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (isСheckIn) {
            setIsСheckIn(true);
            Promise.all([
                mainApi.getMovies(jwt),
                mainApi.getUserInfo(jwt)
            ]).then((values) => {
                const [savedMovies, userInfo] = values;
                const userSavedMovies = savedMovies.filter((m) => {
                    return m.owner === currentUser._id
                })
                localStorage.setItem('savedMovies', JSON.stringify(userSavedMovies));
                setSavedMovies(userSavedMovies);
                setCurrentUser(userInfo);
                if (localStorage.getItem('bestFilmMovies')) {
                    setBestMovies(JSON.parse(localStorage.getItem('bestFilmMovies')));
                }

            })
                .catch((err) => console.log(err))
                .finally(() => {
                    setIsСheckIn(true);
                });
        }

    }, [isСheckIn, currentUser._id]);

    useEffect(() => {
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, [])

    const deleteMovie = (movieId) => {
        setIsLoading(true);
        const jwt = localStorage.getItem('jwt');
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        console.log("savedMovies", JSON.parse(localStorage.getItem('savedMovies')))
        mainApi.deleteMovieFromSaved(jwt, movieId)
            .then((deletedMovie) => {
                const newMovies = localSavedMovies.filter((movie) => movie._id !== movieId);
                localStorage.setItem('savedMovies', JSON.stringify(newMovies));
                setSavedMovies(newMovies);
                setMovies(movies.map((movie) => movie._id === movieId ? bestMovies.find((m) => m.id === movie.movieId) : movie));
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    const saveMovie = (movie) => {
        const jwt = localStorage.getItem('jwt');
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        console.log("savedMovies", localSavedMovies)
        const isSaved = localSavedMovies.some((m) => m.movieId === movie.id);
        if (!isSaved) {
            setIsLoading(true);
            mainApi.saveMovie(jwt, movie)
                .then((movie) => {
                    setMovies(movies.map((m) => m.id === movie.movieId ? movie : m));
                    const newSavedMovies = [movie, ...localSavedMovies];
                    localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
                    setSavedMovies(newSavedMovies);
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    const handleByClickButtonSaveMovies = () => {
        setSavePage(true);
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        if (localSavedMovies && localSavedMovies.length > 0) {
            setFoundMoviesSave(true);
            setSavedRequestCompleted(true);
            setSavedMovies(localSavedMovies);
        }
    }

    const handleClickByMovies = () => {
        setSavePage(false);
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        if (localMovies && localMovies.length > 0) {
            setFoundMovies(true);
            setSavedRequest(true);
            updateMovies(localMovies, false);
        }
    }

    useEffect(() => {
        const handleTokenCheck = () => {
            if (localStorage.getItem('jwt')) {
                const jwt = localStorage.getItem('jwt');
                auth.checkToken(jwt)
                    .then((res) => {
                        console.log("res", res)
                        if (res) {
                            setCurrentUser({ email: res.email, name: res.name, _id: res._id });
                            setIsСheckIn(true);
                            history.push('/');
                        } else {
                            setIsСheckIn(false);
                            history.push('/');
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }
        handleTokenCheck();
    }, [history]);

    useEffect(() => {
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        if (isСheckIn) {
            if (localMovies) {
                console.log(localMovies);
                setMovies(localMovies);

            }
        }
    }, [isСheckIn])

    const handleLogin = ({ email, password }) => {
        auth.authorize(email, password)
            .then((data) => {
                if (data && data.token) {
                    console.log("handleLogin data", data)
                    setCurrentUser({ email: data.email, name: data.name, _id: data._id })
                    setIsСheckIn(true);
                    history.push('/movies');
                } else {
                    openInformationPopup(loginErrorMessage);
                    setIsСheckIn(false);
                }
            })
            .catch((err) => {
                console.log(err.message);
                openInformationPopup(errorsMessage);
            });
    }

    const handleRegister = ({ email, password, name }) => {
        auth.register(email, password, name)
            .then((res) => {
                if (res) {
                    setRegistrationFails(false);
                    openInformationPopup(successСompletedMessage);
                    handleLogin({ email, password });
                } else {
                    setRegistrationFails(true);
                    openInformationPopup(errorsMessage);
                }
            })
            .catch((err) => {
                setRegistrationFails(true);
                openInformationPopup(errorsMessage);
                console.log(err.message);
            });
    }

    const handleEditProfile = ({ email, name }) => {
        setIsLoading(true);
        const jwt = localStorage.getItem('jwt');
        mainApi.updateUserInfo(jwt, email, name)
            .then((res) => {
                if (res) {
                    setCurrentUser({ email: res.email, name: res.name, _id: res._id });
                    openInformationPopup(updateSuccessСompletedMessage);
                }
            })
            .catch((err) => {
                openInformationPopup(errorsMessage);
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const filterMovies = (movies, value) => {
        const regex = new RegExp(value, 'gi');
        return movies.filter((movie) => {
            return regex.test(movie.nameRU);
        })
    }

    const searchSaved = (value) => {
        return new Promise((resolve, reject) => {
            if (savedMovies) {
                resolve(filterMovies(savedMovies, value))
            } else {
                reject(searchMovieErrorMessage);
            }
        });
    }

    const handleSearchSave = (value, shortFilm) => {
        setIsLoading(true);
        searchSaved(value, shortFilm)
            .then((res) => {
                if (res && res.length > 0) {
                    setFoundMoviesSave(true);
                    setSavedMovies(res);
                } else {
                    setFoundMoviesSave(false);
                }
            })
            .catch((err) => {
                console.log(err);
                openInformationPopup(searchMovieErrorMessage);
            })
            .finally(() => {
                setSavedRequestCompleted(true);
                setIsLoading(false);
            })
    }

    const searchPromise = (value) => {
        return new Promise((resolve, reject) => {
            if (bestMovies.length === 0) {
                moviesApi.getBeatFilmMovies()
                    .then((movies) => movies.filter((movie) =>
                        movie.country &&
                        movie.director &&
                        movie.duration &&
                        movie.trailerLink &&
                        movie.id &&
                        movie.year &&
                        movie.description &&
                        movie.image &&
                        movie.nameRU &&
                        movie.nameEN
                    ).map(({
                        country,
                        director,
                        duration,
                        trailerLink,
                        id,
                        year,
                        description,
                        image,
                        nameRU,
                        nameEN
                    }) => ({
                        country,
                        year,
                        description,
                        director,
                        duration,
                        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
                        image: `https://api.nomoreparties.co${image.url}`,
                        trailer: trailerLink,
                        id,
                        nameRU,
                        nameEN
                    })))
                    .then((movies) => {
                        localStorage.setItem('bestFilmMovies', JSON.stringify(movies));
                        setBestMovies(movies);
                        resolve(filterMovies(movies, value));
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            } else {
                resolve(filterMovies(bestMovies, value));
            }
        });
    }

    const handleSearchMovies = (value, shortFilm) => {
        setIsLoading(true);
        searchPromise(value)
            .then((res) => {
                if (res && res.length > 0) {
                    setFoundMovies(true);
                    localStorage.setItem('movies', JSON.stringify(res));
                    updateMovies(res, shortFilm);
                } else {
                    localStorage.removeItem('movies');
                    setFoundMovies(false);
                    setButtonVisible(false);
                }
            })
            .catch((err) => {
                console.log(err);
                openInformationPopup(searchMovieErrorMessage);
            })
            .finally(() => {
                setSavedRequest(true);
                setIsLoading(false);
            });
    }

    const checkWidth = () => {
        let renderValue = 0;
        if (window.innerWidth >= 1280) {
            setRenderSiseWindow(renderSiseWindow1280);

            setDefaultSiseWindow(defaultSiseWindow1280);

            renderValue = renderSiseWindow1280;
        }
        if (window.innerWidth >= 1024 && window.innerWidth < 1279) {
            setRenderSiseWindow(renderSiseWindow1024);

            setDefaultSiseWindow(defaultSiseWindow1024);

            renderValue = renderSiseWindow1024;
        }
        if (window.innerWidth < 1024 && window.innerWidth > 480) {
            setRenderSiseWindow(renderSiseWindow768);

            setDefaultSiseWindow(defaultSiseWindow768);

            renderValue = renderSiseWindow768;
        }
        if (window.innerWidth <= 480 && window.innerWidth >= 320) {
            setRenderSiseWindow(renderSiseWindow320);

            setDefaultSiseWindow(defaultSiseWindow320);

            renderValue = renderSiseWindow320;
        }
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        setButtonVisible(localMovies && (localMovies.length > renderValue));
        return { renderValue };
    }

    const updateMovies = (movies, shortFilm) => {
        const siseWindow = checkWidth();
        const moviesWithSaved = movies.map((movie) => {
            const savedItem = savedMovies.find((m) => m.movieId === movie.id);
            return savedItem ? savedItem : movie;
        });
        localStorage.setItem('movies', JSON.stringify(moviesWithSaved));
        if (shortFilm) {
            const shortFilms = moviesWithSaved.filter(checkShort);
            setMovies(shortFilms);
            setButtonVisible(shortFilms.length > siseWindow.renderValue);
        } else {
            setMovies(moviesWithSaved);
        }
    };

    const filterShortFilms = (isChecked) => {
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        if (localMovies && localMovies.length > 0) {
            setFoundMovies(true);
            updateMovies(localMovies, isChecked);
        }
        setSavedRequest(true);
    }

    const filterFilmsShortSave = (isChecked) => {
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        if (localSavedMovies && localSavedMovies.length > 0) {
            setFoundMoviesSave(true);
            if (isChecked) {
                const shortFilms = savedMovies.filter(checkShort);
                setSavedMovies(shortFilms);
            } else {
                setSavedMovies(localSavedMovies);
            }
        }
        setSavedRequestCompleted(true);
    }

    const handleToggelClick = (isChecked) => {
        if (savedRequest || savedRequestCompleted) {
            savePage ? filterFilmsShortSave(isChecked) : filterShortFilms(isChecked);
        }
    }

    const handleSearch = (value, shortFilm) => {
        savePage ? handleSearchSave(value, shortFilm) : handleSearchMovies(value, shortFilm);
    }

    console.log("isСheckIn", isСheckIn)
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">

                <Header
                    pathOne={location.pathname}
                    isСheckIn={isСheckIn}
                    isOnLanding={isMainSheet}
                    handleByClickButtonSaveMovies={handleByClickButtonSaveMovies}
                    handleClickByMovies={handleClickByMovies}
                    handleMenuOpen={openMenu}
                />
                <Switch>
                    <Route
                        exact path="/"
                    >
                        <Main />
                    </Route>
                    <ProtectedRoute
                        path="/profile"
                        component={Profile}
                        isСheckIn={isСheckIn}
                        isLoading={isLoading}
                        isBlocked={isLoading}
                        handleLogout={handleLogout}
                        handleSubmit={handleEditProfile}

                    />
                    <ProtectedRoute
                        path="/movies"
                        component={Movies}
                        isСheckIn={isСheckIn}
                        movies={movies}
                        handleSearchSubmit={handleSearch}
                        handleToggelClick={handleToggelClick}
                        saveMovie={saveMovie}
                        deleteMovie={deleteMovie}
                        isFound={foundMovies}
                        savedRequest={savedRequest}
                        renderSiseWindow={renderSiseWindow}
                        isLoading={isLoading}
                        isBlocked={isLoading}
                        handleButtonManyClick={handleButtonManyClick}
                        buttonVisible={buttonVisible}

                    />
                    <ProtectedRoute
                        path="/saved-movies"
                        component={SavedMovies}
                        isСheckIn={isСheckIn}
                        movies={savedMovies}
                        handleSearchSubmit={handleSearchSave}
                        handleToggelClick={handleToggelClick}
                        saveMovie={saveMovie}
                        deleteMovie={deleteMovie}
                        isLoading={isLoading}
                        isBlocked={isLoading}
                        isFound={foundMoviesSave}
                        savedRequest={savedRequestCompleted}

                    />

                    <Route
                        exact path="/signin">
                        <Login
                            isBlocked={isLoading}
                            onLogin={handleLogin}
                        />
                    </Route>
                    <Route
                        path="/signup"
                    >
                        <Register
                            isBlocked={isLoading}
                            onLogoClick={handleClickByLogo}
                            onRegister={handleRegister}
                        />
                    </Route>
                    <Route
                        path="*"
                    >
                        <NotFound />
                    </Route>
                </Switch>

                <Menu
                    handleMenuClose={closeAllPopups}
                    isOpen={menuOpened}
                    handleClickByMovies={handleClickByMovies}
                    onClick={handleClosingPopupClickingOverlay}
                    handleByClickButtonSaveMovies={handleByClickButtonSaveMovies}
                />
                <Popup
                    closePopup={closePopups}
                    isOpen={isPopupOpen}
                    isFail={registrationFails}
                    message={popupMessage}
                    onClick={handleClosingPopupClickingOverlay}
                />

                <Footer
                    pathOne={location.pathname}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
