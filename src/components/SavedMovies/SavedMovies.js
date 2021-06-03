import './SavedMovies.css';
import { selectedCards } from '../../utils/initialCards';
import MoviesListCard from '../MoviesListCard/MoviesListCard';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = () => {
    return (
        <section className="save-movies">
            <SearchForm />
            <MoviesListCard cardList={selectedCards} isSavePage={true} />
        </section>
    );
};

export default SavedMovies;
