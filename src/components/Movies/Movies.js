import './Movies.css';
import MoviesListCard from '../MoviesListCard/MoviesListCard';
import SearchForm from '../SearchForm/SearchForm';


const Movies = ({
    movies,
    handleSearchSubmit,
    handleToggelClick,
    saveMovie,
    deleteMovie,
    isFound,
    savedRequest,
    renderSiseWindow,
    handleButtonManyClick,
    buttonVisible,
    isLoading,
    isBlocked
}) => {
    const onMoreBtnClick = () => {
        handleButtonManyClick(renderSiseWindow);
    }
    return (
        <section className="movies">
            <SearchForm
                isBlocked={isBlocked}
                handleSearchSubmit={handleSearchSubmit}
                handleToggelClick={handleToggelClick}
            />
            <MoviesListCard
                movieList={movies}
                savePage={false}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                isFound={isFound}
                savedRequest={savedRequest}
                renderSiseWindow={renderSiseWindow}
                isLoading={isLoading} />
            {buttonVisible && <button className="movies__many" type="button" onClick={onMoreBtnClick}>Ещё</button>}
        </section>
    );
};

export default Movies;
