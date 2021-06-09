import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesListCard.css';
import Preloader from '../Preloader/Preloader';

const moviesListCard = ({
    movieList,
    savePage,
    saveMovie,
    deleteMovie,
    isFound,
    savedRequest,
    renderSiseWindow,
    isLoading
}) => {
    console.log("movieList", movieList)

    return <>
        {isLoading && <Preloader />}
        <ul className={`movies-list-card 
${!savedRequest && 'movies-cardlist_hidden'}`}>
            {
                isFound ? movieList.slice(0, renderSiseWindow).map((movie) => {
                    // console.log("movie", movie)
                    return <MoviesCard
                        nameRU={movie.nameRU}
                        duration={movie.duration}
                        savePage={savePage}
                        saveMovie={saveMovie}
                        key={movie.nameRU}
                        movie={movie}
                        image={movie.image}
                        deleteMovie={deleteMovie} />
                }) : <li className="movies-cardlist__not-found-text">Ничего не найдено</li>
            }
        </ul>
    </>
}

export default moviesListCard;
