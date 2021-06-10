import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Validate } from '../../utils/utils';
import './Profile.css';

const Profile = ({
    handleLogout,
    handleSubmit,
    isBlocked
}) => {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid } = Validate({
        name: currentUser.name,
        email: currentUser.email
    });
    const onSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            handleSubmit(values);
        }
    }
    return (
        <section className="profile">
            <form className="profile__form" method="POST" onSubmit={onSubmit} noValidate>
                <h3 className="profile__greeting">Привет, {currentUser.name}!</h3>
                <div className="profile__inputs">
                    <p className="profile__text profile__text_type_name">Имя</p>
                    <div className="profile__place profile__place_type_name">
                        <input
                            className="profile__input profile__input_type_name"
                            placeholder="Имя"
                            id="name-input"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            minLength="2"
                            maxLength="30"
                            disabled={isBlocked}
                            required />
                        <span className="profile__input-error" id="name-input-error">
                            {errors && errors["name"] !== "" && errors["name"]}
                        </span>
                    </div>
                    <div className="profile__place profile__place_email">
                        <input className="profile__input profile__input_type_email"
                            type="email"
                            placeholder="Почта"
                            id="email-input"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            disabled={isBlocked}
                            required
                            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" />
                        <span className="profile__input-error" id="email-input-error">
                            {errors && errors["email"] !== "" && errors["email"]}
                        </span>
                    </div>
                    <p className="profile__text profile__text_type_email">E-mail</p>
                </div>
                <button
                    type="submit"
                    disabled={!isValid}
                    className="profile__button">Редактировать</button>
                <NavLink
                    to="/"
                    className="profile__link"
                    onClick={handleLogout}>Выйти из аккаунта</NavLink>
            </form>
        </section>
    );
};

export default Profile;
