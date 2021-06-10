import './SearchForm.css';
import { useState } from 'react';
import { Validate } from '../../utils/utils';

const SearchForm = ({
    handleSearchSubmit,
    handleToggelClick,
    isBlocked }) => {
    const { values, handleChange, errors, isValid } = Validate({});
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            handleSearchSubmit(values.movie, isChecked);
        }
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        handleToggelClick(e.target.checked, values.movie);
    }

    return (
        <div className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__block-up">
                    <input
                        className={`search__input ${errors && errors["movie"] && 'search__input_type_error'}`}
                        placeholder="Фильм"
                        required
                        onChange={handleChange}
                        name="movie"
                        type="text"
                        disabled={isBlocked} />
                    <button type="submit" className="search__button" />
                </div>
                <div className="search__block-down">
                    <label className="search__toggle">
                        <input
                            type="checkbox"
                            className="search__checkbox"
                            onChange={handleCheckboxChange}
                            disabled={isBlocked}
                            checked={isChecked} />
                        <span className="search__slider" />
                    </label>
                    <p className="search__label-text">Короткометражки</p>
                </div>

            </form>

        </div>

    );
};

export default SearchForm;
