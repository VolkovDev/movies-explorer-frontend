import './SavedMovies.css';
import MoviesListCard from '../MoviesListCard/MoviesListCard';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({
    movies,
    handleSearchSubmit,
    handleToggelClick,
    saveMovie,
    deleteMovie,
    isFound,
    savedRequest,
    isDisabled
}) => {
    return (
        <section className="save-movies">
            <SearchForm
                handleSearchSubmit={handleSearchSubmit}
                handleToggelClick={handleToggelClick}
                isDisabled={isDisabled}
            />
            <MoviesListCard
                movieList={movies}
                savePage={true}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                isFound={isFound}
                savedRequest={savedRequest}
            />
        </section>
    );
};

export default SavedMovies;
