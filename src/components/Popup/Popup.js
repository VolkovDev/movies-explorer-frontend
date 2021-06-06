import './Popup.css';

const Popup = ({ closePopup, isOpen, isFail }) => {
    return (
        <section className={`popup ${isOpen && 'popup_opened'}`}>

            <div className="popup__container">
                <p className="popup__message">
                    {isFail ?
                        'Ошибка' :
                        'Действие выполнено успешно'
                    }
                </p>
                <button className="popup__close" type="button" onClick={closePopup} />

            </div>
        </section>
    );
}

export default Popup;
