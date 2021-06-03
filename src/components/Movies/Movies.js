import './Movies.css';
import { cards } from '../../utils/initialCards';
import MoviesListCard from '../MoviesListCard/MoviesListCard';
import SearchForm from '../SearchForm/SearchForm';


const Movies = () => {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesListCard cardList={cards} isSavePage={false} />
            <button className="movies__many" type="button">Ещё</button>
        </section>
    );
};

export default Movies;
