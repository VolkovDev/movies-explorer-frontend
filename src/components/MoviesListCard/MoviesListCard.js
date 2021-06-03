import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesListCard.css';

const moviesListCard = ({ cardList, isSavePage }) => {
    return <ul className="movies-list-card">
        {
            cardList.map((card) => {
                return <MoviesCard key={card._id} image={card.image} name={card.name} duration={card.duration}
                    isSavePage={isSavePage} />
            })
        }
    </ul>
}

export default moviesListCard;
